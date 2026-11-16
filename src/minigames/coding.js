/**
 * Minigame "Jalan Pulang Mochi": susun blok panah (algoritma), pakai "Ulangi ×n"
 * (perulangan) untuk membawa Mochi ke ikan. Salah langkah = coba lagi, tanpa hukuman.
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { esc } from '../core/dom.js';
import { C } from '../core/palette.js';
import { openSheet } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { starBurst, toast } from '../ui/feedback.js';
import { mochiSvg } from '../scenes/room-art.js';
import { CODING_LEVELS, DIRS, parseMap, simulate } from '../data/coding-levels.js';

const PROGRESS_KEY = 'minigame-koding';
const STEP_MS = 380;
const O = `stroke="${C.cocoa}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;

const ARROW_ROT = { up: 0, right: 90, down: 180, left: 270 };
export const arrowSvg = (dir) => `<svg class="arrow" viewBox="0 0 48 48" aria-hidden="true">
  <g transform="rotate(${ARROW_ROT[dir]} 24 24)"><path d="M24 9 L37 24 H29 V39 H19 V24 H11 Z" fill="#fff" ${O}/></g></svg>`;

const FISH = `<svg viewBox="0 0 64 48" aria-hidden="true"><path d="M8 24 C18 8 40 8 50 24 C40 40 18 40 8 24 Z" fill="${C.peach}" ${O}/>
  <path d="M48 24 L62 12 L60 36 Z" fill="${C.peach}" ${O}/><circle cx="20" cy="21" r="3.2" fill="${C.cocoa}"/>
  <path d="M30 16 Q34 24 30 32" fill="none" stroke="${C.cocoa}" stroke-width="2.5" stroke-linecap="round"/></svg>`;
const POT = `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 34 H50 L45 58 H19 Z" fill="${C.peach}" ${O}/>
  <rect x="11" y="28" width="42" height="9" rx="4" fill="${C.wood}" ${O}/>
  <path d="M32 28 C22 22 18 12 22 4 C30 8 34 18 32 28 Z M32 28 C40 18 50 16 56 20 C52 28 42 30 32 28 Z" fill="${C.mint}" ${O}/></svg>`;

const isUnlocked = (index) => index === 0 || store.isDone(PROGRESS_KEY, CODING_LEVELS[index - 1].id);

export function openCodingGame({ onBack } = {}) {
  openSheet({
    title: 'Jalan Pulang Mochi',
    tone: 'mint',
    silent: true,
    render(body) {
      let timers = [];
      const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };

      /* ── Daftar level ── */
      function showLevels() {
        clearTimers();
        body.innerHTML = `
          <div class="game-head">
            ${onBack ? `<button type="button" class="btn btn--small btn--ghost" data-back>${icon('back')}<span>Komputer</span></button>` : ''}
            <p class="sheet__lead">Susun perintah supaya Mochi sampai ke ikan. Setiap level baru terbuka setelah level sebelumnya selesai.</p>
          </div>
          <ol class="level-grid">
            ${CODING_LEVELS.map((lv, i) => {
              const done = store.isDone(PROGRESS_KEY, lv.id);
              const open = isUnlocked(i);
              return `<li><button type="button" class="level-card${done ? ' is-done' : ''}" data-level="${i}" ${open ? '' : 'disabled'}
                  aria-label="Level ${i + 1}: ${esc(lv.title)}${done ? ', selesai' : open ? '' : ', terkunci'}">
                <span class="level-card__num">${i + 1}</span>
                <span class="level-card__title">${esc(lv.title)}</span>
                <span class="level-card__state">${done ? icon('check') : open ? `${icon('star')}<b>+${lv.reward}</b>` : icon('lock')}</span>
              </button></li>`;
            }).join('')}
          </ol>`;
      }

      /* ── Satu level ── */
      function showLevel(index) {
        clearTimers();
        const level = CODING_LEVELS[index];
        const { start, goal, rows, cols } = parseMap(level.map);
        const program = []; // [{ dir, count }]
        let repeat = 1;
        let running = false;

        body.innerHTML = `
          <div class="coding">
            <div class="coding__top">
              <button type="button" class="btn btn--small btn--ghost" data-levels>${icon('back')}<span>Level</span></button>
              <p class="coding__level">Level ${index + 1} · ${esc(level.title)}</p>
            </div>
            <div class="coding__intro">
              <span class="coding__mochi-face"><svg viewBox="0 0 160 150" aria-hidden="true">${mochiSvg()}</svg></span>
              <p data-say>${esc(level.intro)}</p>
            </div>
            <div class="coding__layout">
              <div class="board" style="--cols:${cols};--rows:${rows}" role="img"
                   aria-label="Papan ${cols} kali ${rows}. Mochi di baris ${start.r + 1} kolom ${start.c + 1}, ikan di baris ${goal.r + 1} kolom ${goal.c + 1}.">
                ${level.map.map((row) => [...row].map((ch) => `<div class="cell${ch === '#' ? ' cell--wall' : ''}">${ch === '#' ? POT : ch === 'G' ? `<span class="fish">${FISH}</span>` : ''}</div>`).join('')).join('')}
                <div class="board__mochi" data-mochi><svg viewBox="0 0 160 150" aria-hidden="true">${mochiSvg()}</svg></div>
              </div>
              <div class="coder">
                <p class="coder__label">Perintah</p>
                <div class="palette" role="group" aria-label="Tambah perintah">
                  ${['up', 'left', 'right', 'down'].map((d) => `<button type="button" class="arrow-btn arrow-btn--${d}" data-add="${d}" aria-label="Tambah langkah ${DIRS[d].label}">${arrowSvg(d)}</button>`).join('')}
                </div>
                ${level.allowRepeat ? `
                  <p class="coder__label" id="repeat-label">Ulangi</p>
                  <div class="repeat" role="radiogroup" aria-labelledby="repeat-label">
                    ${[1, 2, 3, 4, 5, 6].map((n) => `<button type="button" role="radio" class="repeat__opt" data-repeat="${n}" aria-checked="${n === 1}">×${n}</button>`).join('')}
                  </div>` : ''}
                <p class="coder__label">Programku <span class="coder__count" data-count></span></p>
                <ol class="program" data-program aria-label="Urutan perintah. Ketuk perintah untuk menghapusnya."></ol>
                <div class="coder__actions">
                  <button type="button" class="btn btn--ghost" data-clear>Hapus semua</button>
                  <button type="button" class="btn btn--primary" data-run>Jalankan</button>
                </div>
              </div>
            </div>
          </div>`;

        const mochi = body.querySelector('[data-mochi]');
        const say = body.querySelector('[data-say]');
        const programEl = body.querySelector('[data-program]');
        const countEl = body.querySelector('[data-count]');
        const runBtn = body.querySelector('[data-run]');

        const placeMochi = (r, c, dir) => {
          mochi.style.setProperty('--r', r);
          mochi.style.setProperty('--c', c);
          if (dir === 'left') mochi.classList.add('is-left');
          if (dir === 'right') mochi.classList.remove('is-left');
        };
        placeMochi(start.r, start.c);

        const blocksUsed = () => program.length;
        function paintProgram(activeIndex = -1) {
          programEl.innerHTML = program.length
            ? program.map((b, i) => `<li><button type="button" class="chip${i === activeIndex ? ' is-active' : ''}" data-remove="${i}" ${running ? 'disabled' : ''}
                aria-label="${DIRS[b.dir].label}${b.count > 1 ? ` ${b.count} kali` : ''}, ketuk untuk menghapus">${arrowSvg(b.dir)}${b.count > 1 ? `<b>×${b.count}</b>` : ''}</button></li>`).join('')
            : '<li class="program__empty">Belum ada perintah. Ketuk panah di atas.</li>';
          countEl.textContent = level.maxBlocks ? `${blocksUsed()}/${level.maxBlocks} blok` : `${blocksUsed()} blok`;
          countEl.classList.toggle('is-full', Boolean(level.maxBlocks) && blocksUsed() >= level.maxBlocks);
          runBtn.disabled = running || !program.length;
        }
        paintProgram();

        function setRunning(value) {
          running = value;
          body.querySelectorAll('[data-add], [data-repeat], [data-clear]').forEach((b) => { b.disabled = value; });
          paintProgram();
        }

        function run() {
          if (running || !program.length) return;
          clearTimers();
          placeMochi(start.r, start.c, 'right');
          mochi.classList.remove('is-bump', 'is-happy');
          const flat = program.map((b) => [b.dir, b.count]);
          const { steps, result } = simulate(level.map, flat);
          // Peta langkah → indeks blok untuk menyorot blok yang sedang jalan.
          const owner = program.flatMap((b, i) => Array(b.count).fill(i));
          setRunning(true);
          sfx.pop();
          say.textContent = 'Ayo jalan!';

          steps.forEach((st, i) => {
            timers.push(setTimeout(() => {
              paintProgram(owner[i]);
              if (st.bump) {
                mochi.classList.add('is-bump');
                if (st.dir === 'left') mochi.classList.add('is-left');
                if (st.dir === 'right') mochi.classList.remove('is-left');
                sfx.nudge();
              } else {
                placeMochi(st.r, st.c, st.dir);
                sfx.select();
              }
            }, (i + 1) * STEP_MS));
          });

          timers.push(setTimeout(() => finish(result), (steps.length + 1) * STEP_MS));
        }

        function finish(result) {
          setRunning(false);
          if (result === 'goal') {
            mochi.classList.add('is-happy');
            const earned = store.completeLesson(PROGRESS_KEY, level.id, level.reward);
            sfx.meow();
            sfx.success();
            const r = mochi.getBoundingClientRect();
            starBurst(r.left + r.width / 2, r.top + r.height / 2, 12);
            const next = CODING_LEVELS[index + 1];
            say.innerHTML = `<b>Nyam, ikannya dapat!</b> ${earned ? `Kamu dapat ${earned} bintang.` : 'Hebat, kamu menyelesaikannya lagi!'}`;
            const actions = body.querySelector('.coder__actions');
            actions.innerHTML = next
              ? `<button type="button" class="btn btn--ghost" data-retry>Main lagi</button><button type="button" class="btn btn--primary" data-next>Level berikutnya</button>`
              : `<button type="button" class="btn btn--ghost" data-retry>Main lagi</button><button type="button" class="btn btn--primary" data-levels>Semua level selesai!</button>`;
            actions.querySelector('[data-next], [data-levels]')?.focus();
          } else if (result === 'bump') {
            say.innerHTML = '<b>Ups, Mochi menabrak!</b> Coba ubah perintahnya, lalu jalankan lagi.';
          } else {
            say.innerHTML = '<b>Hampir sampai!</b> Mochi belum tiba di ikan. Tambah atau ubah perintahnya, yuk.';
          }
        }

        body.querySelector('.coding').addEventListener('click', (event) => {
          const t = event.target;
          if (t.closest('[data-levels]')) { sfx.pop(); showLevels(); return; }
          if (t.closest('[data-next]')) { sfx.pop(); showLevel(index + 1); return; }
          if (t.closest('[data-retry]')) { sfx.pop(); showLevel(index); return; }
          const add = t.closest('[data-add]');
          if (add && !running) {
            if (level.maxBlocks && blocksUsed() >= level.maxBlocks) {
              sfx.nudge();
              say.innerHTML = `Blokmu sudah ${level.maxBlocks}. ${level.allowRepeat ? 'Coba pakai <b>Ulangi</b> supaya satu blok bisa jalan beberapa langkah!' : 'Hapus satu blok dulu, ya.'}`;
              return;
            }
            program.push({ dir: add.dataset.add, count: level.allowRepeat ? repeat : 1 });
            sfx.select();
            paintProgram();
            return;
          }
          const rep = t.closest('[data-repeat]');
          if (rep && !running) {
            repeat = Number(rep.dataset.repeat);
            body.querySelectorAll('[data-repeat]').forEach((b) => b.setAttribute('aria-checked', String(b === rep)));
            sfx.pop();
            return;
          }
          const remove = t.closest('[data-remove]');
          if (remove && !running) {
            program.splice(Number(remove.dataset.remove), 1);
            sfx.pop();
            paintProgram();
            placeMochi(start.r, start.c, 'right');
            mochi.classList.remove('is-bump', 'is-happy');
            return;
          }
          if (t.closest('[data-clear]') && !running) {
            program.length = 0;
            sfx.pop();
            paintProgram();
            placeMochi(start.r, start.c, 'right');
            mochi.classList.remove('is-bump', 'is-happy');
            say.textContent = level.intro;
            return;
          }
          if (t.closest('[data-run]')) run();
        });
      }

      body.addEventListener('click', (event) => {
        if (event.target.closest('[data-back]')) { sfx.pop(); onBack?.(); return; }
        const card = event.target.closest('[data-level]');
        if (!card) return;
        const index = Number(card.dataset.level);
        if (!isUnlocked(index)) { toast('Selesaikan level sebelumnya dulu, ya!'); return; }
        sfx.pop();
        showLevel(index);
      });

      showLevels();
      return clearTimers;
    },
  });
}
