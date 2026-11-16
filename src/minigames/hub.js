/**
 * Layar komputer di meja: menu minigame.
 * Minigame baru cukup ditambahkan ke daftar GAMES.
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { esc } from '../core/dom.js';
import { openSheet } from '../ui/sheet.js';
import { openCodingGame, arrowSvg } from './coding.js';
import { openPatternGame } from './pattern.js';
import { CODING_LEVELS } from '../data/coding-levels.js';

const GAMES = [
  {
    id: 'coding',
    title: 'Jalan Pulang Mochi',
    blurb: 'Susun blok perintah supaya Mochi sampai ke ikan. Belajar algoritma & perulangan.',
    art: `<span class="game-card__arrows">${arrowSvg('right')}${arrowSvg('down')}${arrowSvg('right')}</span>`,
    status: () => {
      const done = CODING_LEVELS.filter((lv) => store.isDone('minigame-koding', lv.id)).length;
      return `${done}/${CODING_LEVELS.length} level`;
    },
    open: openCodingGame,
  },
  {
    id: 'pattern',
    title: 'Tebak Pola',
    blurb: 'Temukan bentuk yang datang berikutnya. Melatih pengenalan pola.',
    art: '<span class="game-card__shapes"><i></i><i></i><i></i><b>?</b></span>',
    status: () => (store.isDone('minigame-koding', 'tebak-pola') ? 'Sudah tamat' : '8 ronde'),
    open: openPatternGame,
  },
];

export function openComputer() {
  openSheet({
    title: 'Komputer Koding',
    tone: 'mint',
    render(body) {
      body.innerHTML = `
        <p class="sheet__lead">Pilih permainan. Semuanya melatih cara berpikir komputasional, persis seperti di buku Koding &amp; KA.</p>
        <ul class="game-list">
          ${GAMES.map((g) => `<li>
            <button type="button" class="game-card" data-game="${g.id}">
              <span class="game-card__art" aria-hidden="true">${g.art}</span>
              <span class="game-card__text">
                <span class="game-card__title">${esc(g.title)}</span>
                <span class="game-card__blurb">${esc(g.blurb)}</span>
              </span>
              <span class="game-card__status">${g.status()}</span>
            </button>
          </li>`).join('')}
        </ul>`;
      body.addEventListener('click', (event) => {
        const card = event.target.closest('[data-game]');
        if (!card) return;
        sfx.pop();
        GAMES.find((g) => g.id === card.dataset.game).open({ onBack: openComputer });
      });
    },
  });
}
