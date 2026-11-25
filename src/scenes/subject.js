/**
 * Halaman satu mapel: daftar bab beserta pelajarannya.
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { esc } from '../core/dom.js';
import { openSheet } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { toast } from '../ui/feedback.js';
import { openLesson } from './lesson.js';
import { openReader } from '../sandbox/reader.js';
import { loadBank } from '../data/questions/index.js';
import { runSession } from '../sandbox/session.js';
import { shuffle } from '../quiz/shuffle.js';

const cache = new Map();

export async function loadSubject(subject) {
  if (!cache.has(subject.id)) cache.set(subject.id, subject.load().then((m) => m.default));
  return cache.get(subject.id);
}

export async function openSubject(subject, { onBack } = {}) {
  let data;
  try {
    data = await loadSubject(subject);
  } catch {
    sfx.nudge();
    toast('Bukunya belum bisa dibuka. Coba muat ulang halaman, ya.');
    return;
  }

  openSheet({
    title: subject.title,
    color: subject.color,
    silent: true,
    render(body) {
      const lessonsFlat = data.chapters.flatMap((c) => c.lessons.map((l) => ({ ...l, chapter: c })));
      const doneCount = lessonsFlat.filter((l) => store.isDone(subject.id, l.id)).length;

      body.innerHTML = `
        <div class="subject-head">
          <button type="button" class="btn btn--small btn--ghost" data-back>${icon('back')}<span>Rak buku</span></button>
          <p class="subject-head__book">${esc(subject.book)}</p>
          <p class="subject-head__count"><b>${doneCount}</b> dari ${lessonsFlat.length} pelajaran selesai</p>
        </div>
        <ol class="chapter-list">
          ${data.chapters.map((chapter, ci) => `
            <li class="chapter">
              <p class="chapter__label">${esc(chapter.label ?? `Bab ${ci + 1}`)}</p>
              <div class="chapter__head">
                <h3 class="chapter__title">${esc(chapter.title)}</h3>
                <span class="chapter__actions">
                  ${subject.reading ? `<button type="button" class="btn btn--small btn--ghost" data-read="${esc(chapter.id)}">${icon('book')}<span>Baca</span></button>` : ''}
                  <button type="button" class="btn btn--small btn--ghost" data-drill="${esc(chapter.id)}">${icon('star')}<span>Latihan bab</span></button>
                </span>
              </div>
              <ul class="chapter__lessons">
                ${chapter.lessons.map((lesson) => {
                  const done = store.isDone(subject.id, lesson.id);
                  return `<li>
                    <button type="button" class="lesson-row${done ? ' is-done' : ''}" data-lesson="${esc(lesson.id)}">
                      <span class="lesson-row__title">${esc(lesson.title)}</span>
                      <span class="lesson-row__meta">${done
                        ? `${icon('check')}<span>Selesai — main lagi?</span>`
                        : `${icon('star')}<span>+${lesson.reward} bintang</span>`}</span>
                    </button>
                  </li>`;
                }).join('')}
              </ul>
            </li>`).join('')}
        </ol>
        <p class="subject-source">Sumber: ${esc(data.source)}</p>`;

      async function chapterDrill(cid) {
        const chapter = data.chapters.find((c) => c.id === cid);
        const bank = (await loadBank(subject.id))[cid] ?? [];
        const pool = [...chapter.lessons.flatMap((l) => l.quiz), ...bank];
        runSession(body, {
          questions: shuffle(pool).slice(0, 10).map((quiz) => ({ quiz, subjectId: subject.id, tag: chapter.title })),
          onFinish: (first, total) => {
            const earned = store.awardDaily('practice', Math.floor(first / 3), 10);
            return {
              title: first === total ? 'Bab ini sudah kamu kuasai!' : 'Latihan bab selesai!',
              message: earned ? `Bonus latihan <b>${earned} bintang</b>.` : 'Soal yang salah masuk Kotak Ulang di meja belajar.',
              earned,
            };
          },
          actions: '<button type="button" class="btn btn--ghost" data-action="list">Daftar bab</button><button type="button" class="btn btn--primary" data-action="again">Latihan lagi</button>',
          onAction: (a) => (a === 'again' ? chapterDrill(cid) : openSubject(subject, { onBack })),
        });
      }

      body.addEventListener('click', (event) => {
        if (event.target.closest('[data-back]')) { sfx.pop(); onBack?.(); return; }
        const drill = event.target.closest('[data-drill]');
        if (drill) { sfx.pop(); chapterDrill(drill.dataset.drill); return; }
        const read = event.target.closest('[data-read]');
        if (read) { sfx.pop(); openReader(subject, read.dataset.read, { onBack: () => openSubject(subject, { onBack }) }); return; }
        const row = event.target.closest('[data-lesson]');
        if (!row) return;
        const index = lessonsFlat.findIndex((l) => l.id === row.dataset.lesson);
        sfx.pop();
        openLesson({
          subject,
          lessons: lessonsFlat,
          index,
          onExit: () => openSubject(subject, { onBack }),
        });
      });
    },
  });
}
