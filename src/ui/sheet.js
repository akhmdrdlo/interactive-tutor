/**
 * Panel "kertas" yang muncul di atas kamar. Memakai <dialog> bawaan browser
 * agar fokus keyboard, tombol Esc, dan latar inert sudah ditangani.
 */
import { html, esc } from '../core/dom.js';
import { icon } from './icons.js';
import { sfx } from '../core/audio.js';

let current = null;

/**
 * @param {{ title: string, tone?: string, size?: 'wide'|'narrow', render: (body: HTMLElement, close: () => void) => (void | (() => void)) }} opts
 *   render boleh mengembalikan fungsi pembersih (dipanggil saat panel ditutup).
 */
export function openSheet({ title, tone = 'pink', color = '', size = 'wide', render, silent = false }) {
  if (current) current.close({ silent: true });

  const dialog = html(`
    <dialog class="sheet sheet--${size}" data-tone="${tone}" ${color ? `style="--tone:${color}"` : ''} aria-labelledby="sheet-title">
      <header class="sheet__head">
        <h2 class="sheet__title" id="sheet-title">${esc(title)}</h2>
        <button type="button" class="icon-btn sheet__close" aria-label="Kembali ke kamar">${icon('close')}</button>
      </header>
      <div class="sheet__body"></div>
    </dialog>`);

  document.body.append(dialog);
  const body = dialog.querySelector('.sheet__body');
  let cleanup = null;

  const close = ({ silent: quiet = false } = {}) => {
    if (!dialog.open) return;
    if (!quiet) sfx.close();
    dialog.classList.add('is-closing');
    const finish = () => {
      dialog.close();
      dialog.remove();
      cleanup?.();
      if (current === api) current = null;
    };
    dialog.addEventListener('animationend', finish, { once: true });
    setTimeout(finish, 320); // jaga-jaga bila animasi dimatikan
  };

  const api = { close, dialog, body };
  current = api;

  dialog.querySelector('.sheet__close').addEventListener('click', () => close());
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); close(); });
  // Klik di luar kertas (area backdrop) juga menutup.
  dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });

  cleanup = render(body, close) || null;
  dialog.showModal();
  if (!silent) sfx.open();
  return api;
}

/** Konfirmasi kecil — mengembalikan Promise<boolean>. */
export function confirmDialog({ title, message, yes = 'Iya', no = 'Nanti saja', art = '' }) {
  return new Promise((resolve) => {
    const dialog = html(`
      <dialog class="sheet sheet--narrow confirm" aria-labelledby="confirm-title">
        <div class="confirm__art">${art}</div>
        <h2 class="sheet__title" id="confirm-title">${esc(title)}</h2>
        <p class="confirm__msg">${esc(message)}</p>
        <div class="confirm__actions">
          <button type="button" class="btn btn--ghost" data-answer="no">${esc(no)}</button>
          <button type="button" class="btn btn--primary" data-answer="yes">${esc(yes)}</button>
        </div>
      </dialog>`);
    document.body.append(dialog);
    const done = (answer) => { dialog.close(); dialog.remove(); resolve(answer); };
    dialog.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-answer]');
      if (btn) done(btn.dataset.answer === 'yes');
      else if (event.target === dialog) done(false);
    });
    dialog.addEventListener('cancel', (event) => { event.preventDefault(); done(false); });
    dialog.showModal();
    dialog.querySelector('[data-answer="yes"]').focus();
  });
}
