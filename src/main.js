// Font dibundel lokal (tanpa CDN) agar tetap tampil saat offline.
import '@fontsource/fredoka/latin-500.css';
import '@fontsource/fredoka/latin-600.css';
import '@fontsource/fredoka/latin-700.css';
import '@fontsource/nunito/latin-500.css';
import '@fontsource/nunito/latin-600.css';
import '@fontsource/nunito/latin-700.css';
import '@fontsource/nunito/latin-800.css';
// latin-ext: huruf transliterasi (ā, ī, ū, ṡ) di materi PAI — hanya diunduh bila dipakai.
import '@fontsource/fredoka/latin-ext-500.css';
import '@fontsource/fredoka/latin-ext-600.css';
import '@fontsource/fredoka/latin-ext-700.css';
import '@fontsource/nunito/latin-ext-500.css';
import '@fontsource/nunito/latin-ext-600.css';
import '@fontsource/nunito/latin-ext-700.css';
import '@fontsource/nunito/latin-ext-800.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/room.css';
import './styles/wardrobe.css';
import './styles/lesson.css';
import './styles/minigames.css';
import './styles/sandbox.css';
import './styles/explore.css';

import { injectCssVars } from './core/palette.js';
import { store } from './core/store.js';
import { sfx } from './core/audio.js';
import { $, onActivate, replayClass } from './core/dom.js';
import { icon } from './ui/icons.js';
import { mountRoom } from './scenes/room.js';
import { openWardrobe } from './scenes/wardrobe.js';
import { openSubjects, openSave } from './scenes/panels.js';
import { openDecor, initDecor } from './scenes/decor.js';
import { openComputer } from './minigames/hub.js';
import { openStudyDesk } from './sandbox/desk.js';
import { initVisitors } from './scenes/visitors.js';

injectCssVars();

const actions = {
  subjects: openSubjects,
  wardrobe: openWardrobe,
  decor: openDecor,
  coding: openComputer,
  study: openStudyDesk,
};

const chevron = (dir) => `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="${dir < 0 ? 'M29 12 L17 24 L29 36' : 'M19 12 L31 24 L19 36'}" fill="none" stroke="#4A352D" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const app = $('#app');
app.innerHTML = `
  <header class="hud">
    <div class="hud__group">
      <h1 class="hud__brand">SDaya</h1>
      <p class="star-pill" data-stars-pill>${icon('star')}<span data-stars></span><span class="sr-only"> bintang</span></p>
    </div>
    <div class="hud__group">
      <button type="button" class="icon-btn" data-sound></button>
      <button type="button" class="btn btn--small" data-save>${icon('save')}<span>Simpan</span></button>
    </div>
  </header>
  <main class="stage-wrap">
    <div class="stage" data-room></div>
    <div class="move-pad" role="group" aria-label="Jalan">
      <button type="button" class="move-btn" data-move="-1" aria-label="Jalan ke kiri">${chevron(-1)}</button>
      <button type="button" class="move-btn" data-move="1" aria-label="Jalan ke kanan">${chevron(1)}</button>
    </div>
  </main>
  <nav class="dock" aria-label="Menu cepat">
    <button type="button" class="dock__btn" data-go="subjects">${icon('book')}<span>Pelajaran</span></button>
    <button type="button" class="dock__btn" data-go="study">${icon('math')}<span>Belajar</span></button>
    <button type="button" class="dock__btn" data-go="wardrobe">${icon('palette')}<span>Lemari</span></button>
    <button type="button" class="dock__btn" data-go="decor">${icon('star')}<span>Dekorasi</span></button>
    <button type="button" class="dock__btn" data-go="coding">${icon('code')}<span>Koding</span></button>
  </nav>`;

const room = mountRoom($('[data-room]', app), actions);
room.bindMovePad($('.move-pad', app));
initDecor(room);
initVisitors(room);

/* ── HUD ── */
const starsEl = $('[data-stars]', app);
const starsPill = $('[data-stars-pill]', app);
const soundBtn = $('[data-sound]', app);
let lastStars = store.get().stars;

function paintHud(state) {
  starsEl.textContent = state.stars;
  if (state.stars !== lastStars) replayClass(starsPill, 'is-bumped', 500);
  lastStars = state.stars;

  const on = state.settings.sound;
  sfx.setEnabled(on);
  soundBtn.innerHTML = icon(on ? 'soundOn' : 'soundOff');
  soundBtn.setAttribute('aria-label', on ? 'Matikan suara' : 'Nyalakan suara');
  soundBtn.setAttribute('aria-pressed', String(on));
}

paintHud(store.get());
store.subscribe(paintHud);

soundBtn.addEventListener('click', () => {
  store.update((s) => { s.settings.sound = !s.settings.sound; });
  sfx.pop();
});
$('[data-save]', app).addEventListener('click', () => { sfx.pop(); openSave(); });

for (const btn of app.querySelectorAll('[data-go]')) {
  onActivate(btn, () => { sfx.pop(); actions[btn.dataset.go](); });
}
