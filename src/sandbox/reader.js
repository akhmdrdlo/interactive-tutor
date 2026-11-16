/**
 * Buku Ringkas: isi buku pelajaran yang disederhanakan per bab, dibaca per halaman.
 * Halaman terakhir berisi "Kata Penting", lalu bisa langsung latihan soal bab itu.
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { esc } from '../core/dom.js';
import { openSheet } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { toast, starBurst } from '../ui/feedback.js';
import { SUBJECTS } from '../data/subjects.js';
import { runSession } from './session.js';
import { shuffle } from '../quiz/shuffle.js';
import { speak, canSpeak, stopSpeaking } from '../core/speech.js';

const READ_KEY = 'baca';
const READ_REWARD = 2;
const readId = (subjectId, chapterId) => `${subjectId}:${chapterId}`;

async function loadBook(subject) {
  return (await subject.reading()).default;
}

/** Daftar mapel yang punya buku ringkas. */
export function openBookshelf({ onBack } = {}) {
  openSheet({
    title: 'Buku Ringkas',
    tone: 'sky',
    silent: true,
    render(body) {
      const books = SUBJECTS.filter((s) => s.reading);
      body.innerHTML = `
        <div class="game-head">
          ${onBack ? `<button type="button" class="btn btn--small btn--ghost" data-back>${icon('back')}<span>Meja belajar</span></button>` : ''}
          <p class="sheet__lead">Isi buku pelajaranmu, diceritakan ulang dengan bahasa yang mudah. Selesai membaca satu bab = +${READ_REWARD} bintang.</p>
        </div>
        <ul class="subject-grid">
          ${books.map((s) => `<li>
            <button type="button" class="subject-card" data-book="${s.id}" style="--subject:${s.color}">
              <span class="subject-card__spine" aria-hidden="true"></span>
              <span class="subject-card__icon">${icon(s.icon)}</span>
              <span class="subject-card__text"><span class="subject-card__title">${esc(s.title)}</span><span class="subject-card__book">${esc(s.book)}</span></span>
            </button></li>`).join('')}
        </ul>`;
      body.addEventListener('click', (e) => {
        if (e.target.closest('[data-back]')) { sfx.pop(); onBack?.(); return; }
        const card = e.target.closest('[data-book]');
        if (!card) return;
        sfx.pop();
        openChapters(SUBJECTS.find((s) => s.id === card.dataset.book), { onBack: () => openBookshelf({ onBack }) });
      });
    },
  });
}

export async function openChapters(subject, { onBack } = {}) {
  const book = await loadBook(subject);
  openSheet({
    title: `Buku Ringkas ${subject.title}`,
    color: subject.color,
    silent: true,
    render(body) {
      body.innerHTML = `
        <div class="game-head">
          ${onBack ? `<button type="button" class="btn btn--small btn--ghost" data-back>${icon('back')}<span>Kembali</span></button>` : ''}
          <p class="sheet__lead">Pilih bab yang mau dibaca.</p>
        </div>
        <ol class="chapter-list chapter-list--compact">
          ${book.chapters.map((c, i) => {
            const done = store.isDone(READ_KEY, readId(subject.id, c.id));
            return `<li><button type="button" class="lesson-row${done ? ' is-done' : ''}" data-chapter="${c.id}">
              <span class="lesson-row__title"><small class="chapter__label">${esc(c.label ?? `Bab ${i + 1}`)}</small><br>${esc(c.title)}</span>
              <span class="lesson-row__meta">${done ? `${icon('check')}<span>Sudah dibaca</span>` : `${icon('book')}<span>${c.pages.length} halaman</span>`}</span>
            </button></li>`;
          }).join('')}
        </ol>`;
      body.addEventListener('click', (e) => {
        if (e.target.closest('[data-back]')) { sfx.pop(); onBack?.(); return; }
        const row = e.target.closest('[data-chapter]');
        if (!row) return;
        sfx.pop();
        openReader(subject, row.dataset.chapter, { onBack: () => openChapters(subject, { onBack }) });
      });
    },
  });
}

export async function openReader(subject, chapterId, { onBack } = {}) {
  const book = await loadBook(subject);
  const chapter = book.chapters.find((c) => c.id === chapterId);
  if (!chapter) { toast('Bab ini belum ada ringkasannya.'); return; }
  const pages = [...chapter.pages, { glossary: true }];

  openSheet({
    title: chapter.title,
    color: subject.color,
    silent: true,
    render(body) {
      let page = 0;
      const openedAt = Date.now();
      const MIN_SECONDS_PER_PAGE = 6; // batas: membaca terlalu cepat tidak dapat bintang

      function paint() {
        const p = pages[page];
        const last = page === pages.length - 1;
        body.innerHTML = `
          <article class="reader" lang="${subject.lang === 'en' ? 'id' : subject.lang}">
            <div class="reader__top">
              ${onBack ? `<button type="button" class="btn btn--small btn--ghost" data-back>${icon('back')}<span>Daftar bab</span></button>` : ''}
              ${canSpeak() ? `<button type="button" class="btn btn--small btn--ghost" data-listen>${icon('soundOn')}<span>Dengarkan</span></button>` : ''}
              <p class="reader__count">Halaman ${page + 1} dari ${pages.length}</p>
            </div>
            <div class="reader__page lesson-step">
              ${p.glossary ? `
                <h3 class="reader__heading">Kata Penting</h3>
                <dl class="glossary">
                  ${chapter.words.map((w) => `<div class="glossary__item"><dt>${esc(w.term)}</dt><dd>${esc(w.meaning)}</dd></div>`).join('')}
                </dl>` : `
                <h3 class="reader__heading">${esc(p.heading)}</h3>
                ${p.text.map((t) => `<p>${esc(t)}</p>`).join('')}
                ${p.points?.length ? `<ul class="reader__points">${p.points.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
                ${p.note ? `<p class="reader__note"><b>Ingat!</b> ${esc(p.note)}</p>` : ''}`}
            </div>
            <div class="lesson__nav">
              ${page > 0 ? `<button type="button" class="btn btn--ghost" data-prev>${icon('back')}<span>Sebelumnya</span></button>` : '<span></span>'}
              ${last
                ? '<button type="button" class="btn btn--primary" data-finish>Selesai membaca</button>'
                : '<button type="button" class="btn btn--primary" data-next>Halaman berikutnya</button>'}
            </div>
          </article>`;
        body.querySelector('.reader__heading')?.setAttribute('tabindex', '-1');
        body.querySelector('.reader__heading')?.focus();
        body.scrollTop = 0;
      }

      function finishReading() {
        const readSeconds = (Date.now() - openedAt) / 1000;
        const tooFast = readSeconds < chapter.pages.length * MIN_SECONDS_PER_PAGE && !store.isDone(READ_KEY, readId(subject.id, chapter.id));
        const earned = tooFast ? 0 : store.completeLesson(READ_KEY, readId(subject.id, chapter.id), READ_REWARD);
        sfx.success();
        body.innerHTML = `
          <div class="lesson-step finish">
            <h3 class="finish__title" tabindex="-1">Bab selesai dibaca!</h3>
            <p class="finish__reward">${earned ? `${icon('star')}<span>Kamu dapat <b>${earned} bintang</b>. Mau cek pemahamanmu?</span>` : tooFast ? `${icon('book')}<span>Wah, cepat sekali! Bintang membaca diberikan kalau kamu membaca pelan-pelan tiap halaman. Coba baca ulang, ya.</span>` : `${icon('check')}<span>Membaca ulang bikin ingatan makin kuat. Mau latihan soal?</span>`}</p>
            <div class="lesson__nav">
              <button type="button" class="btn btn--ghost" data-back>Daftar bab</button>
              <button type="button" class="btn btn--primary" data-practice>Latihan soal bab ini</button>
            </div>
          </div>`;
        body.querySelector('.finish__title').focus();
        if (earned) {
          const r = body.querySelector('.finish__title').getBoundingClientRect();
          starBurst(r.left + r.width / 2, r.top, 10);
        }
      }

      async function practice() {
        const lessons = (await subject.load()).default.chapters.find((c) => c.id === chapter.id)?.lessons ?? [];
        const questions = shuffle(lessons.flatMap((l) => l.quiz)).slice(0, 5).map((quiz) => ({ quiz }));
        if (!questions.length) { toast('Soal untuk bab ini belum ada.'); return; }
        runSession(body, {
          questions,
          onFinish: (first, total) => {
            const earned = store.awardDaily('practice', Math.floor(first / 2), 10);
            return {
              title: first === total ? 'Sempurna!' : 'Latihan selesai!',
              message: earned ? `Bonus latihan: <b>${earned} bintang</b>.` : 'Terus berlatih, ya! (Bonus latihan hari ini sudah penuh atau belum cukup jawaban benar di percobaan pertama.)',
              earned,
            };
          },
          actions: '<button type="button" class="btn btn--ghost" data-action="back">Daftar bab</button><button type="button" class="btn btn--primary" data-action="again">Latihan lagi</button>',
          onAction: (a) => (a === 'again' ? practice() : onBack?.()),
        });
      }

      body.addEventListener('click', (e) => {
        if (e.target.closest('[data-back]')) { sfx.pop(); onBack?.(); return; }
        if (e.target.closest('[data-listen]')) { const pg = pages[page]; speak(pg.glossary ? chapter.words.map((w) => `${w.term}: ${w.meaning}`).join('. ') : [pg.heading, ...pg.text, ...(pg.points ?? []), pg.note ?? ''].join('. '), subject.lang === 'su' ? 'su' : 'id'); return; }
        if (e.target.closest('[data-next]')) { stopSpeaking(); page += 1; sfx.pop(); paint(); return; }
        if (e.target.closest('[data-prev]')) { page -= 1; sfx.pop(); paint(); return; }
        if (e.target.closest('[data-finish]')) { finishReading(); return; }
        if (e.target.closest('[data-practice]')) { sfx.pop(); practice(); }
      });

      paint();
    },
  });
}
