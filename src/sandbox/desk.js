/**
 * Meja Belajar — mode sandbox untuk mengulang pelajaran:
 * Buku Ringkas · Latihan Berhitung · Kartu Kosakata · Kuis Acak.
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { esc } from '../core/dom.js';
import { openSheet } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { SUBJECTS } from '../data/subjects.js';
import { pickQuestions } from '../data/question-pool.js';
import { MATH_TOPICS, makeMathQuestion } from './math-gen.js';
import { openBookshelf } from './reader.js';
import { openFlashcards } from './flashcards.js';
import { runSession } from './session.js';
import { openStories } from './stories.js';
import { openLabs } from './labs.js';
import { openMap, openTimeline } from './explore.js';
import { openBadges } from './badges.js';

export const PRACTICE_CAP = 10; // batas bonus latihan per hari

function practiceLeft() {
  const { daily } = store.get();
  const today = new Date().toISOString().slice(0, 10);
  return PRACTICE_CAP - (daily.date === today ? daily.practice : 0);
}

const MODE_GROUPS = [
  { title: 'Membaca & Mendengar', modes: [
    { id: 'story', title: 'Buku Cerita', blurb: 'Ngobrol dengan tokoh tentang materi sulit.', icon: 'chat', color: 'var(--pink)' },
    { id: 'read', title: 'Buku Ringkas', blurb: 'Isi buku pelajaran dengan bahasa mudah.', icon: 'book', color: 'var(--sky)' },
  ] },
  { title: 'Mencoba & Menjelajah', modes: [
    { id: 'lab', title: 'Lab Mini', blurb: 'Bunyi, bayangan, warna, dan pecahan.', icon: 'leaf', color: 'var(--mint)' },
    { id: 'map', title: 'Peta Indonesia', blurb: 'Ketuk pulau, kenali budayanya.', icon: 'shield', color: 'var(--sky)' },
    { id: 'timeline', title: 'Garis Waktu', blurb: 'Dari praaksara sampai merdeka.', icon: 'moon', color: 'var(--peach)' },
  ] },
  { title: 'Berlatih & Mengulang', modes: [
    { id: 'math', title: 'Latihan Berhitung', blurb: 'Soal hitung yang selalu baru.', icon: 'math', color: 'var(--butter)' },
    { id: 'vocab', title: 'Kartu Kosakata', blurb: 'Inggris, Sunda, Indonesia — bisa didengar.', icon: 'chat', color: 'var(--peach)' },
    { id: 'quiz', title: 'Kuis Acak', blurb: 'Soal acak dari semua pelajaran.', icon: 'star', color: 'var(--mint)' },
    { id: 'review', title: 'Kotak Ulang', blurb: 'Soal yang pernah salah, dicoba lagi.', icon: 'check', color: 'var(--pink)' },
    { id: 'badges', title: 'Koleksi Lencana', blurb: 'Stiker untuk setiap bab yang tuntas.', icon: 'star', color: 'var(--butter)' },
  ] },
];

export function openStudyDesk() {
  openSheet({
    title: 'Meja Belajar',
    tone: 'sky',
    render(body) {
      const left = practiceLeft();
      const reviewCount = store.get().review.length;
      body.innerHTML = `
        <p class="sheet__lead">Bebas mengulang pelajaran. Bonus bintang latihan hari ini masih <b>${Math.max(0, left)}</b> lagi.</p>
        ${MODE_GROUPS.map((g) => `
          <h3 class="set-group">${esc(g.title)}</h3>
          <ul class="desk-grid">${g.modes.map((m) => `<li><button type="button" class="desk-card" data-mode="${m.id}">
            <span class="desk-card__icon" style="background:${m.color}" aria-hidden="true">${icon(m.icon)}</span>
            <span class="desk-card__title">${esc(m.title)}${m.id === 'review' && reviewCount ? ` <b class="desk-card__count">${reviewCount}</b>` : ''}</span>
            <span class="desk-card__blurb">${esc(m.blurb)}</span>
          </button></li>`).join('')}</ul>`).join('')}`;
      body.addEventListener('click', (e) => {
        const card = e.target.closest('[data-mode]');
        if (!card) return;
        sfx.pop();
        const back = { onBack: openStudyDesk };
        ({
          story: () => openStories(back),
          read: () => openBookshelf(back),
          lab: () => openLabs(back),
          map: () => openMap(back),
          timeline: () => openTimeline(back),
          math: () => openMathDrill(back),
          vocab: () => openFlashcards(back),
          quiz: () => openRandomQuiz(back),
          review: () => openReview(back),
          badges: () => openBadges(back),
        })[card.dataset.mode]();
      });
    },
  });
}

/* ── Kotak Ulang ── */
export function openReview({ onBack } = {}) {
  openSheet({
    title: 'Kotak Ulang',
    tone: 'pink',
    silent: true,
    render(body) {
      const items = shuffleArr(store.get().review).slice(0, 6);
      if (!items.length) {
        body.innerHTML = `
          <div class="game-head">${onBack ? `<button type="button" class="btn btn--small btn--ghost" data-back>${icon('back')}<span>Meja belajar</span></button>` : ''}</div>
          <div class="soon"><p class="soon__msg">Kotak Ulang kosong! Soal yang salah di percobaan pertama akan masuk ke sini supaya bisa kamu coba lagi.</p></div>`;
      } else {
        runSession(body, {
          questions: items.map((r) => ({ quiz: r.quiz, subjectId: r.subjectId, tag: `${SUBJECTS.find((x) => x.id === r.subjectId)?.title ?? ''} · Kotak Ulang` })),
          onFinish: (first, total) => {
            const earned = store.awardDaily('practice', Math.floor(first / 2), PRACTICE_CAP);
            return {
              title: first === total ? 'Kotak Ulang beres!' : 'Makin ingat!',
              message: `${first} soal sekarang kamu jawab benar langsung dan keluar dari Kotak Ulang.${earned ? ` Bonus <b>${earned} bintang</b>.` : ''}`,
              earned,
            };
          },
          actions: '<button type="button" class="btn btn--primary" data-action="back">Meja belajar</button>',
          onAction: () => onBack?.(),
        });
      }
      body.addEventListener('click', (e) => { if (e.target.closest('[data-back]')) { sfx.pop(); onBack?.(); } });
    },
  });
}

function shuffleArr(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/* ── Latihan Berhitung ── */
export function openMathDrill({ onBack, topic = null, title = 'Latihan Berhitung' } = {}) {
  openSheet({
    title,
    tone: 'peach',
    silent: true,
    render(body) {
      function topics() {
        body.innerHTML = `
          <div class="game-head">
            ${onBack ? `<button type="button" class="btn btn--small btn--ghost" data-back>${icon('back')}<span>Meja belajar</span></button>` : ''}
            <p class="sheet__lead">Pilih jenis soal. Setiap sesi berisi 8 soal baru yang dibuat acak.</p>
          </div>
          <ul class="set-grid">
            ${MATH_TOPICS.map((t) => `<li><button type="button" class="set-card" data-topic="${t.id}" style="--subject:var(--butter)">
              <span class="set-card__title">${esc(t.title)}</span><span class="set-card__count">${esc(t.blurb)}</span>
            </button></li>`).join('')}
            <li><button type="button" class="set-card" data-topic="campur" style="--subject:var(--pink)">
              <span class="set-card__title">Campur Semua</span><span class="set-card__count">Soal acak dari semua jenis</span>
            </button></li>
          </ul>`;
      }

      function session(topicId) {
        const questions = Array.from({ length: 8 }, () => {
          const t = topicId === 'campur' ? MATH_TOPICS[Math.floor(Math.random() * MATH_TOPICS.length)] : MATH_TOPICS.find((x) => x.id === topicId);
          return { quiz: makeMathQuestion(t.id), tag: t.title };
        });
        runSession(body, {
          questions,
          onFinish: (first, total) => {
            const earned = store.awardDaily('practice', Math.floor(first / 2), PRACTICE_CAP);
            return {
              title: first === total ? 'Hitunganmu sempurna!' : 'Latihan selesai!',
              message: earned ? `Benar di percobaan pertama: ${first} soal. Bonus <b>${earned} bintang</b>!` : `Benar di percobaan pertama: ${first} soal. Latihan terus bikin makin cepat!`,
              earned,
            };
          },
          actions: '<button type="button" class="btn btn--ghost" data-action="topics">Ganti jenis soal</button><button type="button" class="btn btn--primary" data-action="again">Sesi baru</button>',
          onAction: (a) => (a === 'again' ? session(topicId) : topics()),
        });
      }

      body.addEventListener('click', (e) => {
        if (e.target.closest('[data-back]')) { sfx.pop(); onBack?.(); return; }
        const t = e.target.closest('[data-topic]');
        if (t) { sfx.pop(); session(t.dataset.topic); }
      });
      if (topic) session(topic); else topics();
    },
  });
}

/* ── Kuis Acak ── */
export function openRandomQuiz({ onBack } = {}) {
  openSheet({
    title: 'Kuis Acak',
    tone: 'mint',
    silent: true,
    render(body) {
      const subjects = SUBJECTS.filter((s) => s.load);
      function pickSubject() {
        body.innerHTML = `
          <div class="game-head">
            ${onBack ? `<button type="button" class="btn btn--small btn--ghost" data-back>${icon('back')}<span>Meja belajar</span></button>` : ''}
            <p class="sheet__lead">Pilih mapel, atau campur semuanya. Soalnya diambil acak setiap kali main.</p>
          </div>
          <ul class="set-grid">
            <li><button type="button" class="set-card" data-subject="" style="--subject:var(--pink)"><span class="set-card__title">Campur Semua</span><span class="set-card__count">8 soal dari semua mapel</span></button></li>
            ${subjects.map((s) => `<li><button type="button" class="set-card" data-subject="${s.id}" style="--subject:${s.color}"><span class="set-card__title">${esc(s.title)}</span><span class="set-card__count">8 soal acak</span></button></li>`).join('')}
          </ul>`;
      }

      async function session(subjectId) {
        const picked = await pickQuestions(8, { subjectId: subjectId || null });
        runSession(body, {
          questions: picked.map((p) => ({ quiz: p.quiz, subjectId: p.subject?.id, tag: `${p.subject?.title ?? ''} · ${p.chapter}` })),
          onFinish: (first, total) => {
            const earned = store.awardDaily('practice', Math.floor(first / 2), PRACTICE_CAP);
            return {
              title: first === total ? 'Luar biasa, semua benar!' : 'Kuis acak selesai!',
              message: earned ? `Bonus latihan <b>${earned} bintang</b>!` : 'Soal yang tadi salah bisa kamu pelajari lagi di Buku Ringkas.',
              earned,
            };
          },
          actions: '<button type="button" class="btn btn--ghost" data-action="pick">Ganti mapel</button><button type="button" class="btn btn--primary" data-action="again">Soal acak lagi</button>',
          onAction: (a) => (a === 'again' ? session(subjectId) : pickSubject()),
        });
      }

      body.addEventListener('click', (e) => {
        if (e.target.closest('[data-back]')) { sfx.pop(); onBack?.(); return; }
        const s = e.target.closest('[data-subject]');
        if (s) { sfx.pop(); session(s.dataset.subject); }
      });
      pickSubject();
    },
  });
}
