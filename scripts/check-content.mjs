/**
 * Memeriksa semua file materi di src/data/subjects/ terhadap skema (_schema.js).
 * Jalankan: npm run check:content
 */
import { readdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const dir = path.resolve('src/data/subjects');
const files = (await readdir(dir)).filter((f) => f.endsWith('.js') && !f.startsWith('_'));
const problems = [];
const seenLessonIds = new Map();
let lessonCount = 0;
let quizCount = 0;

const QUIZ_TYPES = new Set(['multiple-choice', 'drag-match', 'sequence']);

for (const file of files) {
  const { default: subject } = await import(pathToFileURL(path.join(dir, file)).href);
  const where = (...parts) => [file, ...parts].join(' › ');
  if (!subject?.id || !Array.isArray(subject.chapters) || !subject.source) {
    problems.push(`${file}: butuh id, source, dan chapters`);
    continue;
  }
  for (const chapter of subject.chapters) {
    if (!chapter.title || !chapter.lessons?.length) problems.push(where(chapter.id, 'bab tanpa judul/pelajaran'));
    for (const lesson of chapter.lessons ?? []) {
      lessonCount += 1;
      const at = (...p) => where(chapter.id, lesson.id, ...p);
      if (seenLessonIds.has(lesson.id)) problems.push(at(`id ganda (juga di ${seenLessonIds.get(lesson.id)})`));
      seenLessonIds.set(lesson.id, file);
      if (!lesson.title || !Number.isFinite(lesson.reward)) problems.push(at('butuh title & reward'));
      if (!lesson.cards?.length) problems.push(at('tanpa kartu cerita'));
      for (const card of lesson.cards ?? []) {
        if (!['mentor', 'student'].includes(card.speaker) || !card.text) problems.push(at('kartu tidak valid'));
      }
      for (const [i, quiz] of (lesson.quiz ?? []).entries()) {
        quizCount += 1;
        const q = (msg) => problems.push(at(`kuis ${i + 1}`, msg));
        if (!QUIZ_TYPES.has(quiz.type)) q(`tipe tidak dikenal: ${quiz.type}`);
        if (!quiz.prompt || !quiz.hint) q('butuh prompt & hint');
        if (quiz.type === 'multiple-choice') {
          const ids = quiz.options?.map((o) => o.id) ?? [];
          if (ids.length < 2) q('opsi kurang dari 2');
          if (new Set(ids).size !== ids.length) q('id opsi ganda');
          if (!ids.includes(quiz.answer)) q(`jawaban "${quiz.answer}" tidak ada di opsi`);
        }
        if (quiz.type === 'drag-match') {
          const lefts = quiz.pairs?.map((p) => p.left) ?? [];
          if (lefts.length < 2) q('pasangan kurang dari 2');
          if (new Set(lefts).size !== lefts.length) q('sisi kiri ganda');
          if (quiz.pairs?.some((p) => !p.right?.trim())) q('sisi kanan kosong');
        }
        if (quiz.type === 'sequence') {
          const steps = quiz.steps ?? [];
          if (steps.length < 2) q('langkah kurang dari 2');
          if (new Set(steps).size !== steps.length) q('langkah ganda (urutan jadi ambigu)');
        }
      }
      if (!lesson.quiz?.length) problems.push(at('tanpa kuis'));
    }
  }
}

/* ── Level minigame koding: setiap level harus punya solusi yang benar-benar sampai ── */
const { CODING_LEVELS, simulate, parseMap } = await import(pathToFileURL(path.resolve('src/data/coding-levels.js')).href);
for (const lv of CODING_LEVELS) {
  const { start, goal } = parseMap(lv.map);
  if (!start || !goal) { problems.push(`coding ${lv.id}: peta butuh S dan G`); continue; }
  if (new Set(lv.map.map((r) => r.length)).size !== 1) problems.push(`coding ${lv.id}: panjang baris peta tidak sama`);
  const { result } = simulate(lv.map, lv.solution);
  if (result !== 'goal') problems.push(`coding ${lv.id}: solusi tidak sampai ke ikan (${result})`);
  if (lv.maxBlocks && lv.solution.length > lv.maxBlocks) problems.push(`coding ${lv.id}: solusi butuh ${lv.solution.length} blok > batas ${lv.maxBlocks}`);
  if (!lv.allowRepeat && lv.solution.some(([, n]) => n !== 1)) problems.push(`coding ${lv.id}: solusi memakai Ulangi padahal tidak diizinkan`);
  if (lv.solution.some(([, n]) => n > 6)) problems.push(`coding ${lv.id}: Ulangi maksimal ×6`);
}

/* ── Buku Ringkas: id bab harus cocok dengan materi, setiap bab punya halaman & kata penting ── */
let bookChapters = 0;
for (const file of files) {
  const subjectId = file.replace(/\.js$/, '');
  const bookPath = path.resolve('src/data/books', file);
  let book;
  try { ({ default: book } = await import(pathToFileURL(bookPath).href)); } catch { problems.push(`buku ${subjectId}: file tidak ada`); continue; }
  const { default: subject } = await import(pathToFileURL(path.join(dir, file)).href);
  const ids = new Set(subject.chapters.map((c) => c.id));
  for (const ch of book.chapters) {
    bookChapters += 1;
    if (!ids.has(ch.id)) problems.push(`buku ${subjectId} › ${ch.id}: tidak ada bab dengan id ini di materi`);
    if (!ch.pages?.length || ch.pages.some((p) => !p.heading || !p.text?.length)) problems.push(`buku ${subjectId} › ${ch.id}: halaman butuh heading & text`);
    if (!ch.words?.length) problems.push(`buku ${subjectId} › ${ch.id}: belum ada kata penting`);
  }
  for (const id of ids) if (!book.chapters.some((c) => c.id === id)) problems.push(`buku ${subjectId}: bab ${id} belum diringkas`);
}

/* ── Kartu kosakata: minimal 3 kartu (kuis butuh 3 pilihan), tanpa kata ganda ── */
const { VOCAB_SETS } = await import(pathToFileURL(path.resolve('src/data/vocab.js')).href);
for (const set of VOCAB_SETS) {
  if (set.cards.length < 3) problems.push(`kosakata ${set.id}: minimal 3 kartu`);
  if (new Set(set.cards.map((c) => c.front)).size !== set.cards.length) problems.push(`kosakata ${set.id}: kata ganda`);
  if (new Set(set.cards.map((c) => c.back)).size !== set.cards.length) problems.push(`kosakata ${set.id}: arti ganda (kuis jadi ambigu)`);
}

if (problems.length) {
  console.error(`✗ ${problems.length} masalah ditemukan:\n` + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log(`✓ ${files.length} mapel, ${lessonCount} pelajaran, ${quizCount} soal, ${CODING_LEVELS.length} level koding, ${bookChapters} bab buku ringkas, ${VOCAB_SETS.length} set kosakata — semua valid.`);
