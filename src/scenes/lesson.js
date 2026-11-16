/**
 * Pemutar pelajaran: kartu cerita (Mochi & avatar) → kuis → selesai + bintang.
 * Jawaban belum tepat tidak pernah mengurangi apa pun; anak cukup mencoba lagi.
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { esc } from '../core/dom.js';
import { openSheet } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { starBurst } from '../ui/feedback.js';
import { renderAvatar, CROP } from '../character/avatar.js';
import { mochiSvg } from './room-art.js';
import { renderQuiz } from '../quiz/runner.js';

function portrait(speaker, mood) {
  if (speaker === 'student') {
    return renderAvatar(store.get().avatar, { prefix: 'story-', viewBox: CROP.hair, expression: mood ?? 'smile', label: 'Kamu' });
  }
  return `<svg viewBox="0 0 160 150" role="img" aria-label="Mochi">${mochiSvg({ eyesClosed: mood === 'happy' })}</svg>`;
}

/**
 * @param {{ subject, lessons: Array, index: number, onExit: () => void }} opts
 */
export function openLesson({ subject, lessons, index, onExit }) {
  const lesson = lessons[index];
  const steps = [
    ...lesson.cards.map((card) => ({ kind: 'card', card })),
    ...lesson.quiz.map((quiz) => ({ kind: 'quiz', quiz })),
    { kind: 'finish' },
  ];

  openSheet({
    title: lesson.title,
    color: subject.color,
    silent: true,
    render(body, close) {
      let step = 0;

      body.innerHTML = `
        <div class="lesson">
          <div class="lesson__progress" role="progressbar" aria-label="Kemajuan pelajaran"
               aria-valuemin="1" aria-valuemax="${steps.length}">
            ${steps.map((s) => `<span class="pip pip--${s.kind}"></span>`).join('')}
          </div>
          <div class="lesson__stage" data-stage></div>
        </div>`;

      const stage = body.querySelector('[data-stage]');
      const progress = body.querySelector('.lesson__progress');
      const pips = [...body.querySelectorAll('.pip')];

      function paintProgress() {
        pips.forEach((pip, i) => {
          pip.classList.toggle('is-done', i < step);
          pip.classList.toggle('is-current', i === step);
        });
        progress.setAttribute('aria-valuenow', String(step + 1));
        progress.setAttribute('aria-valuetext', `Langkah ${step + 1} dari ${steps.length}`);
      }

      function go(next) {
        step = next;
        paintProgress();
        const current = steps[step];
        stage.innerHTML = '';
        if (current.kind === 'card') renderCard(current.card);
        else if (current.kind === 'quiz') renderQuizStep(current.quiz);
        else renderFinish();
        stage.querySelector('[data-focus]')?.focus();
      }

      /* ── Kartu cerita ── */
      function renderCard(card) {
        const isStudent = card.speaker === 'student';
        stage.innerHTML = `
          <div class="lesson-step story ${isStudent ? 'story--student' : 'story--mentor'}">
            <div class="story__portrait">${portrait(card.speaker, card.mood)}</div>
            <div class="story__bubble">
              <p class="story__name">${isStudent ? 'Kamu' : 'Mochi'}</p>
              <p class="story__text">${esc(card.text)}</p>
            </div>
          </div>
          <div class="lesson__nav">
            ${step > 0 ? `<button type="button" class="btn btn--ghost" data-prev>${icon('back')}<span>Sebelumnya</span></button>` : '<span></span>'}
            <button type="button" class="btn btn--primary" data-next data-focus>Lanjut</button>
          </div>`;
        stage.querySelector('[data-next]').addEventListener('click', () => { sfx.pop(); go(step + 1); });
        stage.querySelector('[data-prev]')?.addEventListener('click', () => { sfx.pop(); go(step - 1); });
      }

      /* ── Kuis ── */
      let firstTry = 0;
      const quizCount = lesson.quiz.length;
      function renderQuizStep(quiz) {
        renderQuiz(stage, quiz, { subjectId: subject.id, onNext: () => go(step + 1), onCorrect: (first) => { if (first) firstTry += 1; } });
      }

      /* ── Selesai ── */
      function renderFinish() {
        const earned = store.completeLesson(subject.id, lesson.id, lesson.reward, firstTry / quizCount);
        const best = store.bestStars(subject.id, lesson.id, lesson.reward);
        const next = lessons[index + 1];
        sfx.success();
        stage.innerHTML = `
          <div class="lesson-step finish">
            <div class="finish__art">${renderAvatar(store.get().avatar, { prefix: 'finish-', expression: 'happy', label: 'Kamu senang sekali' })}</div>
            <h3 class="finish__title" tabindex="-1" data-focus>Pelajaran selesai!</h3>
            <p class="finish__score"><b>${firstTry}</b><span>/${quizCount} benar di percobaan pertama</span></p>
            <p class="finish__reward">${earned ? icon('star') : icon('check')}<span>${earned
              ? `Kamu dapat <b>${earned} bintang</b>.`
              : best >= lesson.reward ? 'Bintang pelajaran ini sudah penuh. Latihan lagi bikin makin jago!' : 'Belum ada bintang tambahan kali ini.'}
              ${best < lesson.reward ? ` Bintangmu ${best}/${lesson.reward} — jawab benar di percobaan pertama untuk melengkapinya.` : ''}</span></p>
          </div>
          <div class="lesson__nav">
            <button type="button" class="btn btn--ghost" data-exit>Daftar bab</button>
            ${next ? `<button type="button" class="btn btn--primary" data-continue>Pelajaran berikutnya</button>` : ''}
          </div>`;
        requestAnimationFrame(() => {
          const r = stage.querySelector('.finish__art').getBoundingClientRect();
          starBurst(r.left + r.width / 2, r.top + r.height / 3, 14);
        });
        stage.querySelector('[data-exit]').addEventListener('click', () => { sfx.pop(); onExit(); });
        stage.querySelector('[data-continue]')?.addEventListener('click', () => {
          sfx.pop();
          openLesson({ subject, lessons, index: index + 1, onExit });
        });
      }

      go(0);
    },
  });
}
