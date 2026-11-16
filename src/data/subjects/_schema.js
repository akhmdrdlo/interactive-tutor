/**
 * Skema materi per mata pelajaran — semua file di folder ini mengikuti bentuk yang sama.
 * (Ditulis sebagai JSDoc agar editor bisa memberi petunjuk tanpa perlu TypeScript.)
 *
 * @typedef {Object} Subject
 * @property {string} id                  — sama dengan id di src/data/subjects.js
 * @property {string} source              — buku sumber (judul + halaman), untuk dicek guru
 * @property {Chapter[]} chapters
 *
 * @typedef {Object} Chapter
 * @property {string} id
 * @property {string} title
 * @property {Lesson[]} lessons
 *
 * @typedef {Object} Lesson
 * @property {string} id
 * @property {string} title
 * @property {number} reward              — bintang yang didapat saat pelajaran selesai
 * @property {StoryCard[]} cards          — kartu cerita singkat (micro-learning)
 * @property {Quiz[]} quiz
 *
 * @typedef {Object} StoryCard
 * @property {'mentor'|'student'} speaker — mentor = Mochi si kucing, student = avatar siswa
 * @property {string} text
 * @property {'smile'|'happy'|'wow'} [mood]
 *
 * @typedef {MultipleChoice|DragMatch|Sequence} Quiz
 *
 * @typedef {Object} MultipleChoice
 * @property {'multiple-choice'} type
 * @property {string} prompt
 * @property {{id:string, label:string, icon?:string}[]} options
 * @property {string} answer              — id opsi yang benar
 * @property {string} hint                — ditampilkan saat jawaban belum tepat (tanpa hukuman)
 *
 * @typedef {Object} DragMatch
 * @property {'drag-match'} type
 * @property {string} prompt
 * @property {{left:string, right:string}[]} pairs
 * @property {string} hint
 *
 * @typedef {Object} Sequence
 * @property {'sequence'} type
 * @property {string} prompt
 * @property {string[]} steps             — urutan yang benar; diacak saat ditampilkan
 * @property {string} hint
 */
export {};
