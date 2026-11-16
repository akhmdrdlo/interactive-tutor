/** Utilitas DOM kecil — sengaja tanpa framework. */

export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (value) => String(value).replace(/[&<>"']/g, (ch) => ESC[ch]);

/** Membuat elemen dari string HTML (elemen pertama). */
export function html(markup) {
  const template = document.createElement('template');
  template.innerHTML = markup.trim();
  return template.content.firstElementChild;
}

/** Membuat elemen SVG/klik "tombol" bisa dipakai keyboard (Enter / Spasi). */
export function onActivate(el, handler) {
  el.addEventListener('click', handler);
  el.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handler(event);
    }
  });
}

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Memutar ulang animasi CSS satu-kali pada elemen. */
export function replayClass(el, className, duration = 600) {
  el.classList.remove(className);
  void el.getBoundingClientRect(); // paksa reflow agar animasi bisa diulang
  el.classList.add(className);
  setTimeout(() => el.classList.remove(className), duration);
}
