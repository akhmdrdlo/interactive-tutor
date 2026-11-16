/**
 * Sesi latihan berisi beberapa soal berturut-turut + ringkasan di akhir.
 * Dipakai Latihan Berhitung, Kuis Acak, latihan per bab, dan tamu.
 */
import { esc } from '../core/dom.js';
import { icon } from '../ui/icons.js';
import { starBurst } from '../ui/feedback.js';
import { sfx } from '../core/audio.js';
import { renderQuiz } from '../quiz/runner.js';

/**
 * @param {HTMLElement} host
 * @param {{ questions: Array<{quiz:object, tag?:string}>, onFinish: (firstTry:number,total:number) => {title:string, message:string, earned:number}, actions?: string, onAction?: (name:string) => void }} opts
 */
export function runSession(host, { questions, onFinish, actions = '', onAction }) {
  let index = 0;
  let firstTry = 0;
  host.innerHTML = `
    <div class="lesson">
      <div class="lesson__progress" role="progressbar" aria-label="Kemajuan latihan" aria-valuemin="1" aria-valuemax="${questions.length}">
        ${questions.map(() => '<span class="pip pip--quiz"></span>').join('')}
      </div>
      <div class="lesson__stage" data-stage></div>
    </div>`;
  const stage = host.querySelector('[data-stage]');
  const pips = [...host.querySelectorAll('.pip')];

  function show() {
    pips.forEach((p, i) => { p.classList.toggle('is-done', i < index); p.classList.toggle('is-current', i === index); });
    host.querySelector('.lesson__progress').setAttribute('aria-valuenow', String(index + 1));
    const { quiz, tag, subjectId } = questions[index];
    renderQuiz(stage, quiz, {
      tag,
      subjectId,
      nextLabel: index === questions.length - 1 ? 'Lihat hasil' : 'Soal berikutnya',
      onCorrect: (first) => { if (first) firstTry += 1; },
      onNext: () => { index += 1; if (index < questions.length) show(); else finish(); },
    });
  }

  function finish() {
    pips.forEach((p) => { p.classList.add('is-done'); p.classList.remove('is-current'); });
    const { title, message, earned } = onFinish(firstTry, questions.length);
    sfx.success();
    stage.innerHTML = `
      <div class="lesson-step finish">
        <p class="finish__score"><b>${firstTry}</b><span>/${questions.length}</span></p>
        <h3 class="finish__title" tabindex="-1">${esc(title)}</h3>
        <p class="finish__reward">${earned ? icon('star') : icon('check')}<span>${message}</span></p>
      </div>
      <div class="lesson__nav">${actions}</div>`;
    stage.querySelector('.finish__title').focus();
    if (earned) {
      const r = stage.querySelector('.finish__score').getBoundingClientRect();
      starBurst(r.left + r.width / 2, r.top + r.height / 2, 12);
    }
    stage.querySelector('.lesson__nav').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (btn) { sfx.pop(); onAction?.(btn.dataset.action); }
    });
  }

  show();
}
