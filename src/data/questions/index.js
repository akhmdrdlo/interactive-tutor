/**
 * Bank Soal per bab (tambahan di luar kuis pelajaran), ditulis ringkas lalu dibentangkan ke skema kuis.
 *
 * Format ringkas:
 *   ['pg', 'Soal?', ['Benar', 'Salah 1', 'Salah 2'], 'Petunjuk']   — pilihan ganda, opsi PERTAMA selalu benar (diacak saat tampil)
 *   ['jodoh', 'Soal', [['kiri', 'kanan'], …], 'Petunjuk']          — pasangkan
 *   ['urut', 'Soal', ['langkah 1', 'langkah 2', …], 'Petunjuk']     — urutkan
 *   ['isi', 'Soal', 'jawaban', 'Petunjuk', 'satuan?']               — isi angka
 */
export function expand([kind, prompt, a, hint, unit]) {
  if (kind === 'pg') return { type: 'multiple-choice', prompt, options: a.map((label, i) => ({ id: String(i), label })), answer: '0', hint };
  if (kind === 'jodoh') return { type: 'drag-match', prompt, pairs: a.map(([left, right]) => ({ left, right })), hint };
  if (kind === 'urut') return { type: 'sequence', prompt, steps: a, hint };
  if (kind === 'isi') return { type: 'number', prompt, answer: a, hint, ...(unit ? { unit } : {}) };
  throw new Error(`Jenis soal tidak dikenal: ${kind}`);
}

export const BANK_LOADERS = {
  ipas: () => import('./ipas.js'),
  matematika: () => import('./matematika.js'),
  'bahasa-indonesia': () => import('./bahasa-indonesia.js'),
  'bahasa-inggris': () => import('./bahasa-inggris.js'),
  pai: () => import('./pai.js'),
  pancasila: () => import('./pancasila.js'),
  'basa-sunda': () => import('./basa-sunda.js'),
  koding: () => import('./koding.js'),
};

const cache = new Map();
/** @returns {Promise<Record<string, object[]>>} soal terbentang per id bab */
export async function loadBank(subjectId) {
  if (!BANK_LOADERS[subjectId]) return {};
  if (!cache.has(subjectId)) {
    cache.set(subjectId, BANK_LOADERS[subjectId]().then((m) => Object.fromEntries(
      Object.entries(m.default).map(([cid, list]) => [cid, list.map(expand)]),
    )));
  }
  return cache.get(subjectId);
}
