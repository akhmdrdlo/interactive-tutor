/**
 * Pilihan Ganda. Ketuk satu jawaban → langsung diperiksa.
 * Jawaban yang belum tepat diredupkan (bukan dihukum) supaya anak mencoba yang lain.
 */
import { esc } from '../core/dom.js';
import { shuffle } from './shuffle.js';

export function mountChoice(el, quiz, { onAnswer }) {
  const options = shuffle(quiz.options);
  const letters = ['A', 'B', 'C', 'D', 'E'];
  el.innerHTML = `
    <div class="choices" role="group" aria-label="Pilihan jawaban">
      ${options.map((o, i) => `
        <button type="button" class="choice" data-id="${esc(o.id)}">
          <span class="choice__letter" aria-hidden="true">${letters[i]}</span>
          <span class="choice__label">${esc(o.label)}</span>
        </button>`).join('')}
    </div>`;

  let locked = false;
  el.addEventListener('click', (event) => {
    const btn = event.target.closest('.choice');
    if (!btn || locked || btn.disabled) return;
    const correct = btn.dataset.id === quiz.answer;
    btn.classList.add(correct ? 'is-correct' : 'is-wrong');
    if (correct) {
      locked = true;
      el.querySelectorAll('.choice').forEach((b) => { b.disabled = b !== btn; });
    } else {
      btn.disabled = true;
    }
    onAnswer(correct);
  });

  return { needsCheck: false };
}
