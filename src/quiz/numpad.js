/**
 * Soal isi angka dengan papan angka besar (ramah sentuh, tanpa keyboard HP yang menutupi layar).
 * Jawaban bisa bilangan bulat, desimal pakai koma, atau pecahan "3/5".
 * Keyboard fisik juga bisa: angka, Backspace, Enter.
 */
import { esc } from '../core/dom.js';
import { sfx } from '../core/audio.js';

/** Menyamakan bentuk jawaban: "1.000" → "1000", "3 / 5" → "3/5". */
export function normalizeAnswer(value) {
  return String(value).replace(/\s+/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.').toLowerCase();
}

/** Format ribuan ala Indonesia untuk tampilan: 12345 → "12.345". */
const pretty = (raw) => raw.replace(/^(\d+)/, (m) => Number(m).toLocaleString('id-ID'));

export function mountNumber(el, quiz, { onAnswer, onReady }) {
  const allowSlash = String(quiz.answer).includes('/');
  let value = '';
  let locked = false;

  el.innerHTML = `
    <div class="numpad-wrap">
      <output class="numpad-display" aria-live="polite" data-display>
        <span data-value>?</span>${quiz.unit ? `<small>${esc(quiz.unit)}</small>` : ''}
      </output>
      <div class="numpad" role="group" aria-label="Papan angka">
        ${['7', '8', '9', '4', '5', '6', '1', '2', '3'].map((k) => `<button type="button" class="numpad__key" data-key="${k}">${k}</button>`).join('')}
        <button type="button" class="numpad__key numpad__key--soft" data-key="${allowSlash ? '/' : 'back'}" aria-label="${allowSlash ? 'Garis pecahan' : 'Hapus satu'}">${allowSlash ? '/' : '⌫'}</button>
        <button type="button" class="numpad__key" data-key="0">0</button>
        <button type="button" class="numpad__key numpad__key--soft" data-key="${allowSlash ? 'back' : 'clear'}" aria-label="${allowSlash ? 'Hapus satu' : 'Hapus semua'}">${allowSlash ? '⌫' : 'C'}</button>
      </div>
    </div>`;

  const display = el.querySelector('[data-value]');
  const paint = () => {
    display.textContent = value ? pretty(value) : '?';
    onReady(Boolean(value) && !locked);
  };

  function press(key) {
    if (locked) return;
    if (key === 'back') value = value.slice(0, -1);
    else if (key === 'clear') value = '';
    else if (key === '/') { if (value && !value.includes('/')) value += '/'; }
    else if (value.length < 9) value = value === '0' ? key : value + key;
    sfx.pop();
    paint();
  }

  el.addEventListener('click', (e) => {
    const k = e.target.closest('[data-key]');
    if (k) press(k.dataset.key);
  });
  const onKey = (e) => {
    if (!el.isConnected) { window.removeEventListener('keydown', onKey); return; }
    if (/^\d$/.test(e.key)) press(e.key);
    else if (e.key === 'Backspace') press('back');
    else if (e.key === '/' && allowSlash) press('/');
    else if (e.key === 'Enter' && value && !locked) { e.preventDefault(); api.check(); }
  };
  window.addEventListener('keydown', onKey);

  const api = {
    needsCheck: true,
    check() {
      if (!value || locked) return false;
      const correct = normalizeAnswer(value) === normalizeAnswer(quiz.answer);
      el.querySelector('[data-display]').dataset.state = correct ? 'good' : 'try';
      if (correct) { locked = true; paint(); }
      else { value = ''; setTimeout(paint, 500); }
      onAnswer(correct);
      return correct;
    },
  };
  paint();
  return api;
}
