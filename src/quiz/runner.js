/**
 * Satu langkah kuis yang bisa dipakai di mana saja (pelajaran, kuis acak, tamu, latihan).
 * Tipe: multiple-choice · drag-match · sequence · number (isi angka lewat papan angka).
 */
import { sfx } from '../core/audio.js';
import { store } from '../core/store.js';
import { esc } from '../core/dom.js';
import { starBurst } from '../ui/feedback.js';
import { mochiSvg } from '../scenes/room-art.js';
import { mountChoice } from './choice.js';
import { mountSlots } from './slots.js';
import { mountNumber } from './numpad.js';
import { markMission } from '../core/missions.js';

const PRAISE = ['Hebat!', 'Pintar sekali!', 'Tepat sekali!', 'Keren!', 'Mantap!'];
const NUDGE = ['Hampir tepat!', 'Sedikit lagi!', 'Belum pas, tapi kamu hampir sampai!'];
const HELP = {
  'multiple-choice': 'Ketuk satu jawaban yang menurutmu tepat.',
  'drag-match': 'Seret keping ke kotak yang cocok, atau ketuk keping lalu ketuk kotaknya.',
  sequence: 'Ketuk langkah sesuai urutan, atau seret ke nomor yang tepat.',
  number: 'Ketik jawabanmu dengan papan angka, lalu tekan Periksa.',
};

const pick = (list) => list[Math.floor(Math.random() * list.length)];
const mochiSmall = (happy) => `<svg viewBox="0 0 160 150" aria-hidden="true">${mochiSvg({ eyesClosed: happy })}</svg>`;

/**
 * @param {HTMLElement} stage
 * @param {object} quiz
 * @param {{ onCorrect?: (firstTry: boolean) => void, onNext: () => void, nextLabel?: string, tag?: string }} opts
 */
export function renderQuiz(stage, quiz, { onCorrect, onNext, nextLabel = 'Lanjut', tag = '', subjectId = null }) {
  let attempts = 0;
  stage.innerHTML = `
    <div class="lesson-step quiz">
      ${tag ? `<p class="quiz__tag">${esc(tag)}</p>` : ''}
      <h3 class="quiz__prompt" tabindex="-1" data-focus aria-describedby="quiz-help">${esc(quiz.prompt)}</h3>
      <p class="quiz__help" id="quiz-help">${HELP[quiz.type]}</p>
      <div class="quiz__body" data-quiz></div>
      <div class="quiz-feedback" data-feedback role="status" aria-live="polite" hidden></div>
    </div>
    <div class="lesson__nav">
      <span></span>
      <button type="button" class="btn btn--primary" data-q-check hidden disabled>Periksa</button>
      <button type="button" class="btn btn--primary" data-q-next hidden>${esc(nextLabel)}</button>
    </div>`;

  const feedback = stage.querySelector('[data-feedback]');
  const checkBtn = stage.querySelector("[data-q-check]");
  const nextBtn = stage.querySelector("[data-q-next]");

  const onAnswer = (correct) => {
    attempts += 1;
    if (subjectId && attempts === 1) (correct ? store.removeReview(quiz) : store.addReview(subjectId, quiz));
    feedback.hidden = false;
    feedback.dataset.tone = correct ? 'good' : 'try';
    if (correct) {
      sfx.success();
      feedback.innerHTML = `<span class="quiz-feedback__mochi">${mochiSmall(true)}</span><p><b>${pick(PRAISE)}</b> ${quiz.explain ? esc(quiz.explain) : 'Jawabanmu benar.'}</p>${!quiz.explain && quiz.hint ? `<p class="quiz-feedback__why"><b>Kenapa?</b> ${esc(quiz.hint)}</p>` : ''}`;
      checkBtn.hidden = true;
      nextBtn.hidden = false;
      nextBtn.focus();
      const rect = feedback.getBoundingClientRect();
      starBurst(rect.left + 40, rect.top + rect.height / 2, 8);
      markMission('correct');
      onCorrect?.(attempts === 1);
    } else {
      sfx.nudge();
      feedback.innerHTML = `<span class="quiz-feedback__mochi">${mochiSmall(false)}</span><p><b>${pick(NUDGE)}</b> ${esc(quiz.hint)}</p>`;
    }
  };

  const host = stage.querySelector('[data-quiz]');
  const ready = (ok) => { checkBtn.disabled = !ok; };
  const widget = quiz.type === 'multiple-choice' ? mountChoice(host, quiz, { onAnswer })
    : quiz.type === 'number' ? mountNumber(host, quiz, { onAnswer, onReady: ready })
      : mountSlots(host, quiz, { onAnswer, onReady: ready });

  if (widget.needsCheck) {
    checkBtn.hidden = false;
    checkBtn.addEventListener('click', () => widget.check());
  }
  nextBtn.addEventListener('click', () => { sfx.pop(); onNext(); });
  stage.querySelector('[data-focus]')?.focus();
}
