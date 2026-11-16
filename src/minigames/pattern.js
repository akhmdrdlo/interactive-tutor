/**
 * Minigame "Tebak Pola" (pengenalan pola, Koding & KA Bab 1).
 * 8 ronde, pola makin sulit: AB → AAB → ABB → ABC → AABB → ABCD.
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { C } from '../core/palette.js';
import { openSheet } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { starBurst } from '../ui/feedback.js';
import { shuffle } from '../quiz/shuffle.js';

const PROGRESS_KEY = 'minigame-koding';
const GAME_ID = 'tebak-pola';
const REWARD = 6;
const ROUNDS = ['AB', 'AB', 'AAB', 'ABB', 'ABC', 'AABB', 'ABC', 'ABCD'];
const O = `stroke="${C.cocoa}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`;

const SHAPES = {
  bulat: (fill) => `<circle cx="24" cy="24" r="16" fill="${fill}" ${O}/>`,
  bintang: (fill) => `<path d="M24 6 L29.5 17.5 L42 19 L32.8 27.6 L35.2 40 L24 33.8 L12.8 40 L15.2 27.6 L6 19 L18.5 17.5 Z" fill="${fill}" ${O}/>`,
  hati: (fill) => `<path d="M24 40 C10 30 6 22 8 15 C10 8 19 7 24 14 C29 7 38 8 40 15 C42 22 38 30 24 40 Z" fill="${fill}" ${O}/>`,
  segitiga: (fill) => `<path d="M24 7 L41 39 H7 Z" fill="${fill}" ${O}/>`,
  kotak: (fill) => `<rect x="9" y="9" width="30" height="30" rx="7" fill="${fill}" ${O}/>`,
};
const COLORS = [
  { name: 'pink', fill: C.pink },
  { name: 'kuning', fill: C.butter },
  { name: 'hijau', fill: C.mint },
  { name: 'biru', fill: C.sky },
  { name: 'oranye', fill: C.peach },
];

function makeToken(shape, color) {
  return { key: `${shape}-${color.name}`, label: `${shape} ${color.name}`, svg: `<svg viewBox="0 0 48 48" aria-hidden="true">${SHAPES[shape](color.fill)}</svg>` };
}

function makeRound(template) {
  const letters = [...new Set(template)];
  const shapes = shuffle(Object.keys(SHAPES));
  const colors = shuffle(COLORS);
  const tokens = Object.fromEntries(letters.map((l, i) => [l, makeToken(shapes[i], colors[i])]));
  // Tampilkan 2 putaran pola penuh (min. 6 keping), lalu tanyakan keping berikutnya.
  const shownLength = Math.max(6, template.length * 2);
  const seq = Array.from({ length: shownLength + 1 }, (_, i) => tokens[template[i % template.length]]);
  const answer = seq.pop();
  const extra = makeToken(shapes[letters.length], colors[letters.length]);
  const options = shuffle([...new Map([...Object.values(tokens), extra].map((t) => [t.key, t])).values()]).slice(0, 3);
  if (!options.some((o) => o.key === answer.key)) options[0] = answer;
  return { seq, answer, options: shuffle(options), template };
}

export function openPatternGame({ onBack } = {}) {
  openSheet({
    title: 'Tebak Pola',
    tone: 'sky',
    silent: true,
    render(body) {
      let round = 0;
      let current = null;

      function paint() {
        current = makeRound(ROUNDS[round]);
        body.innerHTML = `
          <div class="pattern">
            <div class="game-head">
              ${onBack ? `<button type="button" class="btn btn--small btn--ghost" data-back>${icon('back')}<span>Komputer</span></button>` : ''}
              <p class="pattern__round">Ronde ${round + 1} dari ${ROUNDS.length}</p>
            </div>
            <div class="lesson__progress" aria-hidden="true">${ROUNDS.map((_, i) => `<span class="pip${i < round ? ' is-done' : i === round ? ' is-current' : ''}"></span>`).join('')}</div>
            <h3 class="quiz__prompt">Apa yang datang berikutnya?</h3>
            <ol class="pattern__seq" aria-label="Urutan: ${current.seq.map((t) => t.label).join(', ')}, lalu tanda tanya">
              ${current.seq.map((t) => `<li class="token">${t.svg}</li>`).join('')}
              <li class="token token--ask" aria-hidden="true">?</li>
            </ol>
            <div class="pattern__options" role="group" aria-label="Pilihan">
              ${current.options.map((o) => `<button type="button" class="token-btn" data-key="${o.key}" aria-label="${o.label}">${o.svg}</button>`).join('')}
            </div>
            <div class="quiz-feedback" data-feedback role="status" aria-live="polite" hidden></div>
          </div>`;
      }

      function finishGame() {
        const earned = store.completeLesson(PROGRESS_KEY, GAME_ID, REWARD);
        sfx.success();
        body.innerHTML = `
          <div class="lesson-step finish">
            <h3 class="finish__title" tabindex="-1">Kamu jago menebak pola!</h3>
            <p class="finish__reward">${earned ? `${icon('star')}<span>Kamu dapat <b>${earned} bintang</b>.</span>` : `${icon('check')}<span>Main lagi kapan saja untuk melatih otakmu!</span>`}</p>
            <div class="lesson__nav">
              ${onBack ? '<button type="button" class="btn btn--ghost" data-back>Komputer</button>' : '<span></span>'}
              <button type="button" class="btn btn--primary" data-again>Main lagi</button>
            </div>
          </div>`;
        body.querySelector('.finish__title').focus();
        const r = body.querySelector('.finish__title').getBoundingClientRect();
        starBurst(r.left + r.width / 2, r.top, 14);
      }

      body.addEventListener('click', (event) => {
        if (event.target.closest('[data-back]')) { sfx.pop(); onBack?.(); return; }
        if (event.target.closest('[data-again]')) { round = 0; sfx.pop(); paint(); return; }
        const btn = event.target.closest('.token-btn');
        if (!btn || btn.disabled) return;
        const feedback = body.querySelector('[data-feedback]');
        feedback.hidden = false;
        if (btn.dataset.key === current.answer.key) {
          btn.classList.add('is-correct');
          body.querySelectorAll('.token-btn').forEach((b) => { b.disabled = true; });
          const ask = body.querySelector('.token--ask');
          ask.innerHTML = current.answer.svg;
          ask.classList.add('is-filled');
          feedback.dataset.tone = 'good';
          feedback.innerHTML = `<p><b>Tepat!</b> Polanya <b>${current.template}</b> diulang terus.</p>`;
          sfx.success();
          setTimeout(() => {
            round += 1;
            if (round >= ROUNDS.length) finishGame();
            else paint();
          }, 1100);
        } else {
          btn.disabled = true;
          btn.classList.add('is-wrong');
          feedback.dataset.tone = 'try';
          feedback.innerHTML = `<p><b>Hampir!</b> Cari bagian yang berulang. Pola ini punya ${current.template.length} keping sebelum mengulang.</p>`;
          sfx.nudge();
        }
      });

      paint();
    },
  });
}
