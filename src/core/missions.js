/**
 * Misi Harian: 3 tugas kecil per hari (dipilih tetap berdasarkan tanggal).
 * Setiap misi tuntas bisa diklaim +2 bintang; ketiganya diklaim = 1 stiker koleksi.
 */
import { store } from './store.js';
import { toast } from '../ui/feedback.js';

export const MISSION_POOL = [
  { id: 'correct', text: 'Jawab 5 soal dengan benar', target: 5 },
  { id: 'lesson', text: 'Selesaikan 1 pelajaran', target: 1 },
  { id: 'read', text: 'Buka Buku Ringkas di meja belajar atau perpustakaan', target: 1 },
  { id: 'market', text: 'Belanja di Pasar Kampung', target: 1 },
  { id: 'lab', text: 'Coba percobaan di Taman Sains', target: 1 },
  { id: 'map', text: 'Jelajahi Peta Indonesia', target: 1 },
  { id: 'visit', text: 'Bantu teman yang berkunjung', target: 1 },
  { id: 'wardrobe', text: 'Ganti gaya di Lemari Baju', target: 1 },
];

export const STICKERS = [
  { id: 'bintang', name: 'Bintang Rajin', color: '#FCE38A', shape: 'star' },
  { id: 'hati', name: 'Hati Baik', color: '#F2A6B8', shape: 'heart' },
  { id: 'daun', name: 'Daun Segar', color: '#A8D8B9', shape: 'leaf' },
  { id: 'awan', name: 'Awan Ceria', color: '#B5D8EB', shape: 'cloud' },
  { id: 'jeruk', name: 'Jeruk Manis', color: '#F29A4A', shape: 'circle' },
  { id: 'bulan', name: 'Bulan Tenang', color: '#FFF6C9', shape: 'moon' },
  { id: 'bunga', name: 'Bunga Melati', color: '#FFFFFF', shape: 'flower' },
  { id: 'pelangi', name: 'Pelangi', color: '#F7C5A8', shape: 'rainbow' },
  { id: 'buku', name: 'Kutu Buku', color: '#B5D8EB', shape: 'book' },
  { id: 'angklung', name: 'Angklung', color: '#E9C9A4', shape: 'angklung' },
];

export const MISSION_REWARD = 2;
const today = () => new Date().toISOString().slice(0, 10);

function hash(str) {
  let h = 2166136261;
  for (const ch of str) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

/** Tiga misi hari ini: "Jawab 5 soal" selalu ada + dua lainnya bergiliran per tanggal. */
export function todaysMissions(date = today()) {
  const rest = MISSION_POOL.slice(1);
  let h = hash(date);
  const picked = [];
  while (picked.length < 2) {
    const m = rest[h % rest.length];
    if (!picked.includes(m)) picked.push(m);
    h = (Math.imul(h, 1103515245) + 12345) >>> 0;
  }
  return [MISSION_POOL[0], ...picked];
}

function fresh(s) {
  if (s.missions.date !== today()) s.missions = { date: today(), counts: {}, claimed: [] };
}

/** Catat kemajuan misi. Aman dipanggil dari mana saja; bintang baru diberi saat diklaim. */
export function markMission(kind, amount = 1) {
  const m = todaysMissions().find((x) => x.id === kind);
  if (!m) return;
  const st = store.get().missions;
  const before = st.date === today() ? st.counts[kind] ?? 0 : 0;
  if (before >= m.target) return;
  store.update((s) => { fresh(s); s.missions.counts[kind] = Math.min(m.target, before + amount); });
  if (before + amount >= m.target) toast(`Misi tuntas: ${m.text}! Ambil hadiahnya di tombol Misi.`, { tone: 'mint' });
}

export function missionState() {
  const st = store.get().missions;
  const same = st.date === today();
  return todaysMissions().map((m) => {
    const count = same ? st.counts[m.id] ?? 0 : 0;
    return { ...m, count, done: count >= m.target, claimed: same && st.claimed.includes(m.id) };
  });
}

/** Jumlah misi yang tuntas tapi hadiahnya belum diambil (untuk titik di tombol Misi). */
export const unclaimedCount = () => missionState().filter((m) => m.done && !m.claimed).length;

/** Klaim hadiah satu misi. @returns {{ stars: number, sticker: object|null }} */
export function claimMission(id) {
  const list = missionState();
  const m = list.find((x) => x.id === id);
  if (!m || !m.done || m.claimed) return { stars: 0, sticker: null };
  const allAfter = list.every((x) => x.claimed || x.id === id);
  const owned = store.get().stickers;
  const next = allAfter ? STICKERS.find((x) => !owned.includes(x.id)) ?? null : null;
  store.update((s) => {
    fresh(s);
    s.missions.claimed.push(id);
    s.stars += MISSION_REWARD;
    if (next) s.stickers.push(next.id);
  });
  return { stars: MISSION_REWARD, sticker: next };
}

export function stickerSvg(st, size = 72) {
  const c = st.color;
  const o = 'stroke="#4A352D" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
  const shape = {
    star: `<path d="M36 10 L43 26 L60 28 L47 39 L51 56 L36 47 L21 56 L25 39 L12 28 L29 26 Z" fill="${c}" ${o}/>`,
    heart: `<path d="M36 58 C14 44 10 30 18 22 C26 14 34 20 36 26 C38 20 46 14 54 22 C62 30 58 44 36 58 Z" fill="${c}" ${o}/>`,
    leaf: `<path d="M14 58 C14 30 30 14 58 14 C58 42 42 58 14 58 Z" fill="${c}" ${o}/><path d="M18 54 L46 26" fill="none" ${o}/>`,
    cloud: `<path d="M16 50 q-8 -14 8 -18 q2 -14 16 -12 q12 -8 20 6 q14 2 8 24 z" fill="${c}" ${o}/>`,
    circle: `<circle cx="36" cy="38" r="20" fill="${c}" ${o}/><path d="M40 16 q8 -2 10 4 q-8 2 -10 -4z" fill="#A8D8B9" ${o}/>`,
    moon: `<path d="M44 12 A24 24 0 1 0 60 44 A18 18 0 1 1 44 12 Z" fill="${c}" ${o}/>`,
    flower: [0, 72, 144, 216, 288].map((a) => `<ellipse cx="36" cy="22" rx="9" ry="13" transform="rotate(${a} 36 36)" fill="${c}" ${o}/>`).join('') + `<circle cx="36" cy="36" r="8" fill="#FCE38A" ${o}/>`,
    rainbow: `<path d="M10 52 A26 26 0 0 1 62 52" fill="none" stroke="#4A352D" stroke-width="16"/><path d="M10 52 A26 26 0 0 1 62 52" fill="none" stroke="#F2A6B8" stroke-width="10"/><path d="M20 52 A16 16 0 0 1 52 52" fill="none" stroke="#FCE38A" stroke-width="8"/><path d="M27 52 A9 9 0 0 1 45 52" fill="none" stroke="#B5D8EB" stroke-width="6"/>`,
    book: `<path d="M36 22 Q26 16 14 18 V54 Q26 52 36 58 Q46 52 58 54 V18 Q46 16 36 22 Z" fill="${c}" ${o}/><path d="M36 22 V58" fill="none" ${o}/>`,
    angklung: `<rect x="14" y="14" width="44" height="6" rx="3" fill="${c}" ${o}/><rect x="14" y="52" width="44" height="6" rx="3" fill="${c}" ${o}/>${[20, 32, 44].map((x, i) => `<rect x="${x}" y="${22 + i * 3}" width="9" height="${30 - i * 3}" rx="4" fill="${c}" ${o}/>`).join('')}`,
  }[st.shape];
  return `<svg viewBox="0 0 72 72" width="${size}" height="${size}" aria-hidden="true"><circle cx="36" cy="36" r="34" fill="#fff" stroke="#D8C3B4" stroke-width="3" stroke-dasharray="4 5"/>${shape}</svg>`;
}
