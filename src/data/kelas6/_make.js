/**
 * Penulis ringkas untuk materi Kelas 6 — hasilnya tetap mengikuti skema seragam
 * (lihat ../subjects/_schema.js), jadi mesin pelajaran & kuis Kelas 5 bisa dipakai apa adanya.
 *
 * Kartu: string biasa = Mochi (mentor). Awali dengan "S:" untuk ucapan siswa,
 * "!" untuk Mochi yang gembira, "?" untuk siswa yang penasaran.
 * Pilihan ganda: jawaban benar selalu ditulis PERTAMA — urutannya diacak saat tampil.
 */
export const card = (raw) => {
  if (raw.startsWith('S:')) return { speaker: 'student', text: raw.slice(2).trim() };
  if (raw.startsWith('?')) return { speaker: 'student', mood: 'wow', text: raw.slice(1).trim() };
  if (raw.startsWith('!')) return { speaker: 'mentor', mood: 'happy', text: raw.slice(1).trim() };
  return { speaker: 'mentor', text: raw };
};

export const pg = (prompt, [answer, ...wrong], hint, explain) => ({
  type: 'multiple-choice',
  prompt,
  options: [answer, ...wrong].map((label, i) => ({ id: 'abcde'[i], label })),
  answer: 'a',
  hint,
  ...(explain ? { explain } : {}),
});

export const jodoh = (prompt, pairs, hint) => ({
  type: 'drag-match',
  prompt,
  pairs: pairs.map(([left, right]) => ({ left, right })),
  hint,
});

export const urut = (prompt, steps, hint) => ({ type: 'sequence', prompt, steps, hint });

export const lesson = (id, title, cards, quiz, reward = 10) => ({ id, title, reward, cards: cards.map(card), quiz });
export const bab = (id, title, lessons) => ({ id, title, lessons });
