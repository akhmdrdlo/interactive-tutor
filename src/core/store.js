/**
 * Penyimpanan progres — 100% di browser (localStorage) + ekspor/impor file .json.
 * Tidak ada server atau database.
 */
import { WARDROBE, SKIN_TONES, HAIR_COLORS, DEFAULT_AVATAR, findItem } from '../data/wardrobe.js';
import { DECOR, ZONES, findDecor } from '../data/decor.js';

import { WORLD } from './world.js';

const WORLD_W = WORLD.w;

const KEY = 'kamar-belajar/v1';
const SAVE_VERSION = 1;
const STARTING_STARS = 50;

const freeItems = (category) => WARDROBE[category].filter((i) => i.price === 0).map((i) => i.id);

function defaults() {
  return {
    version: SAVE_VERSION,
    stars: STARTING_STARS,
    avatar: structuredClone(DEFAULT_AVATAR),
    owned: {
      hair: freeItems('hair'),
      outfit: freeItems('outfit'),
      accessory: freeItems('accessory'),
    },
    progress: {},          // { [subjectId]: { [lessonId]: { done: true, at: ISODate } } }
    decor: {
      owned: DECOR.filter((d) => d.price === 0).map((d) => d.id),
      placed: [{ id: 'bantal', x: 1060, y: 900 }], // { id, x, y } dalam koordinat dunia kamar
    },
    settings: { sound: true },
    daily: { date: '', practice: 0, visits: 0 }, // batas bintang harian dari latihan & tamu
    review: [],            // Kotak Ulang: soal yang pernah salah di percobaan pertama { subjectId, quiz }
    savedAt: null,
  };
}

/**
 * Menerima data dari mana saja (localStorage lama, file impor) dan
 * mengembalikan state yang pasti valid. Nilai asing dibuang, nilai hilang diisi default.
 */
function sanitize(raw) {
  const base = defaults();
  if (!raw || typeof raw !== 'object') return base;

  const stars = Number.isFinite(raw.stars) ? Math.max(0, Math.floor(raw.stars)) : base.stars;

  const owned = {};
  for (const category of Object.keys(base.owned)) {
    const list = Array.isArray(raw.owned?.[category]) ? raw.owned[category] : [];
    owned[category] = [...new Set([...base.owned[category], ...list.filter((id) => findItem(category, id))])];
  }

  const a = raw.avatar ?? {};
  const avatar = {
    hair: owned.hair.includes(a.hair) ? a.hair : base.avatar.hair,
    outfit: owned.outfit.includes(a.outfit) ? a.outfit : base.avatar.outfit,
    color: Number.isInteger(a.color) && a.color >= 0 && a.color < HAIR_COLORS.length ? a.color : base.avatar.color,
    skin: Number.isInteger(a.skin) && a.skin >= 0 && a.skin < SKIN_TONES.length ? a.skin : base.avatar.skin,
    accessories: Array.isArray(a.accessories) ? a.accessories.filter((id) => owned.accessory.includes(id)) : [],
  };

  const decorOwned = [...new Set([...base.decor.owned, ...(Array.isArray(raw.decor?.owned) ? raw.decor.owned : []).filter(findDecor)])];
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, Number(v)));
  const placedRaw = Array.isArray(raw.decor?.placed) ? raw.decor.placed : base.decor.placed;
  const seenDecor = new Set();
  const decorPlaced = placedRaw
    .filter((p) => p && decorOwned.includes(p.id) && Number.isFinite(Number(p.x)) && Number.isFinite(Number(p.y)) && !seenDecor.has(p.id) && seenDecor.add(p.id))
    .map((p) => {
      const zone = ZONES[findDecor(p.id).zone];
      return { id: p.id, x: Math.round(clamp(p.x, 60, WORLD_W - 60)), y: Math.round(clamp(p.y, zone.minY, zone.maxY)) };
    });

  return {
    ...base,
    stars,
    decor: { owned: decorOwned, placed: decorPlaced },
    owned,
    avatar,
    progress: raw.progress && typeof raw.progress === 'object' ? raw.progress : {},
    settings: { sound: raw.settings?.sound !== false },
    review: Array.isArray(raw.review)
      ? raw.review.filter((r) => r && typeof r.subjectId === 'string' && r.quiz?.type && typeof r.quiz.prompt === 'string').slice(-25)
      : [],
    daily: {
      date: typeof raw.daily?.date === 'string' ? raw.daily.date : '',
      practice: Math.max(0, Math.floor(Number(raw.daily?.practice) || 0)),
      visits: Math.max(0, Math.floor(Number(raw.daily?.visits) || 0)),
    },
    savedAt: typeof raw.savedAt === 'string' ? raw.savedAt : null,
  };
}

function readLocal() {
  try {
    const text = localStorage.getItem(KEY);
    return text ? JSON.parse(text) : null;
  } catch {
    return null; // mode privat / storage diblokir — tetap jalan tanpa simpan
  }
}

let state = sanitize(readLocal());
const listeners = new Set();
let saveTimer = null;

function persist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    state.savedAt = new Date().toISOString();
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage penuh/diblokir — progres tetap ada selama tab terbuka */
    }
  }, 250);
}

export const store = {
  get: () => state,

  /** update(draft => { draft.stars += 5 }) — draft adalah salinan, aman diubah. */
  update(mutator) {
    const draft = structuredClone(state);
    mutator(draft);
    state = sanitize(draft);
    persist();
    listeners.forEach((fn) => fn(state));
  },

  /**
   * Menandai pelajaran selesai. Bintang hanya diberikan pada penyelesaian pertama
   * (mengulang tetap boleh, tapi tidak "menambang" bintang).
   * @returns {number} bintang yang baru didapat
   */
  completeLesson(subjectId, lessonId, reward, score = 1) {
    // Batas bintang: bintang penuh hanya kalau ≥ 2/3 soal benar di percobaan pertama.
    // Sisa bintang bisa dikejar saat mengulang (yang dicatat skor terbaik), tidak bisa ditimbun.
    const share = score >= 2 / 3 ? 1 : score >= 1 / 3 ? 0.6 : 0.3;
    const target = Math.max(1, Math.round(reward * share));
    const prev = state.progress[subjectId]?.[lessonId];
    const best = prev?.done ? (Number.isFinite(prev.best) ? prev.best : reward) : 0;
    const earned = Math.max(0, target - best);
    store.update((s) => {
      s.progress[subjectId] ??= {};
      s.progress[subjectId][lessonId] = { done: true, at: new Date().toISOString(), best: best + earned };
      s.stars += earned;
    });
    return earned;
  },

  /** Bintang terbaik yang sudah didapat dari satu pelajaran. */
  bestStars(subjectId, lessonId, reward) {
    const p = state.progress[subjectId]?.[lessonId];
    if (!p?.done) return 0;
    return Number.isFinite(p.best) ? p.best : reward;
  },


  /**
   * Bintang dari latihan bebas & tamu dibatasi per hari supaya tetap adil.
   * @param {'practice'|'visits'} kind
   * @returns {number} bintang yang benar-benar diberikan (bisa 0 bila batas tercapai)
   */
  awardDaily(kind, amount, cap) {
    const today = new Date().toISOString().slice(0, 10);
    const used = state.daily.date === today ? state.daily[kind] : 0;
    const give = Math.max(0, Math.min(amount, cap - used));
    store.update((s) => {
      if (s.daily.date !== today) s.daily = { date: today, practice: 0, visits: 0 };
      s.daily[kind] += give;
      s.stars += give;
    });
    return give;
  },

  /** Kotak Ulang: simpan soal yang salah di percobaan pertama; hapus setelah dijawab benar langsung. */
  addReview(subjectId, quiz) {
    if (!subjectId || !quiz?.prompt) return;
    store.update((s) => {
      s.review = s.review.filter((r) => r.quiz.prompt !== quiz.prompt);
      s.review.push({ subjectId, quiz });
      s.review = s.review.slice(-25);
    });
  },
  removeReview(quiz) {
    if (!state.review.some((r) => r.quiz.prompt === quiz?.prompt)) return;
    store.update((s) => { s.review = s.review.filter((r) => r.quiz.prompt !== quiz.prompt); });
  },

  isDone: (subjectId, lessonId) => Boolean(state.progress[subjectId]?.[lessonId]?.done),

  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  /** Mengunduh progres sebagai file .json. */
  exportFile() {
    const snapshot = { ...state, savedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = snapshot.savedAt.slice(0, 10);
    a.href = url;
    a.download = `sdaya-${date}.json`;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },

  /** Memuat file .json. Melempar Error berbahasa ramah anak kalau file tidak cocok. */
  async importFile(file) {
    let raw;
    try {
      raw = JSON.parse(await file.text());
    } catch {
      throw new Error('File ini bukan file simpanan SDaya.');
    }
    if (!raw || typeof raw !== 'object' || !('avatar' in raw) || !('stars' in raw)) {
      throw new Error('File ini bukan file simpanan SDaya.');
    }
    state = sanitize(raw);
    persist();
    listeners.forEach((fn) => fn(state));
  },
};
