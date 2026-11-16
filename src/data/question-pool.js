/**
 * Bank soal acak: gabungan semua kuis pelajaran + soal hitung yang dibuat otomatis.
 * Dipakai oleh Kuis Acak di meja belajar dan oleh teman yang berkunjung.
 */
import { SUBJECTS } from './subjects.js';
import { shuffle } from '../quiz/shuffle.js';
import { makeMathQuestion, MATH_TOPICS } from '../sandbox/math-gen.js';
import { store } from '../core/store.js';

let cache = null;

/** @returns {Promise<Array<{ quiz: object, subject: object, chapter: string, lesson: string }>>} */
export async function loadPool() {
  if (cache) return cache;
  const entries = await Promise.all(SUBJECTS.filter((s) => s.load).map(async (subject) => {
    const data = (await subject.load()).default;
    return data.chapters.flatMap((chapter) => chapter.lessons.flatMap((lesson) =>
      lesson.quiz.map((quiz) => ({ quiz, subject, chapter: chapter.title, lesson: lesson.title }))));
  }));
  cache = entries.flat();
  return cache;
}

/**
 * Ambil n soal acak. Kalau subjectId diisi, hanya dari mapel itu.
 * Soal matematika diselingi soal hitung buatan otomatis agar selalu baru.
 */
export async function pickQuestions(n, { subjectId = null } = {}) {
  const pool = await loadPool();
  const filtered = subjectId ? pool.filter((e) => e.subject.id === subjectId) : pool;
  const picked = shuffle(filtered).slice(0, n);
  const mathSubject = SUBJECTS.find((s) => s.id === 'matematika');
  if (!subjectId || subjectId === 'matematika') {
    // Ganti ±1/3 soal dengan soal hitung acak.
    const swaps = Math.max(1, Math.round(n / 3));
    for (let i = 0; i < swaps && i < picked.length; i += 1) {
      const topic = MATH_TOPICS[Math.floor(Math.random() * MATH_TOPICS.length)];
      picked[picked.length - 1 - i] = { quiz: makeMathQuestion(topic.id), subject: mathSubject, chapter: topic.title, lesson: 'Latihan berhitung' };
    }
  }
  // Kotak Ulang: soal yang pernah salah ikut muncul lagi supaya makin ingat.
  const review = store.get().review.filter((r) => !subjectId || r.subjectId === subjectId);
  if (review.length && picked.length) {
    const r = review[Math.floor(Math.random() * review.length)];
    picked[0] = { quiz: r.quiz, subject: SUBJECTS.find((s) => s.id === r.subjectId), chapter: 'Kotak Ulang', lesson: '' };
  }
  return shuffle(picked);
}
