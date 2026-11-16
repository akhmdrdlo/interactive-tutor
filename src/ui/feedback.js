/**
 * Umpan balik ringan: toast, gelembung bicara, dan taburan bintang.
 */
import { html, esc, prefersReducedMotion } from '../core/dom.js';
import { C } from '../core/palette.js';

/* ── Toast ── */
let toastRegion = null;

const MAX_TOASTS = 2;

export function toast(message, { tone = 'cream', duration = 2600 } = {}) {
  if (!toastRegion) {
    // popover → ikut "top layer", jadi tetap terlihat di atas <dialog> yang sedang terbuka.
    toastRegion = html('<div class="toast-region" popover="manual" role="status" aria-live="polite"></div>');
    document.body.append(toastRegion);
  }
  if (toastRegion.showPopover) {
    if (toastRegion.matches(':popover-open')) toastRegion.hidePopover();
    toastRegion.showPopover(); // tampil ulang = naik ke atas dialog terbaru
  }
  const el = html(`<div class="toast" data-tone="${tone}">${esc(message)}</div>`);
  toastRegion.append(el);
  // Klik beruntun tidak boleh menumpuk pesan memenuhi layar.
  while (toastRegion.children.length > MAX_TOASTS) toastRegion.firstElementChild.remove();
  setTimeout(() => {
    el.classList.add('is-leaving');
    setTimeout(() => el.remove(), 300);
  }, duration);
}

/* ── Gelembung bicara di atas sebuah elemen ── */
let bubbleEl = null;
let bubbleTimer = null;

export function speechBubble(anchor, text, { duration = 3400 } = {}) {
  if (!bubbleEl) {
    bubbleEl = html('<div class="bubble" role="status" aria-live="polite"></div>');
    document.body.append(bubbleEl);
  }
  const rect = anchor.getBoundingClientRect();
  bubbleEl.textContent = text;
  bubbleEl.classList.remove('is-visible');
  // Posisikan dulu (tak terlihat) agar lebar gelembung bisa diukur.
  bubbleEl.style.left = '0px';
  bubbleEl.style.top = '0px';
  const width = bubbleEl.offsetWidth;
  const height = bubbleEl.offsetHeight;
  const x = Math.min(Math.max(12, rect.left + rect.width / 2 - width / 2), window.innerWidth - width - 12);
  const y = Math.max(12, rect.top - height - 14);
  bubbleEl.style.left = `${x}px`;
  bubbleEl.style.top = `${y}px`;
  bubbleEl.style.setProperty('--tail-x', `${Math.min(Math.max(24, rect.left + rect.width / 2 - x), width - 24)}px`);
  requestAnimationFrame(() => bubbleEl.classList.add('is-visible'));

  clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => bubbleEl.classList.remove('is-visible'), duration);
}

/* ── Taburan bintang (konfeti versi kamar) ── */
const STAR = (fill) => `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 6 L29.5 17.5 L42 19 L32.8 27.6 L35.2 40 L24 33.8 L12.8 40 L15.2 27.6 L6 19 L18.5 17.5 Z" fill="${fill}" stroke="${C.cocoa}" stroke-width="3.5" stroke-linejoin="round"/></svg>`;

export function starBurst(x, y, count = 10) {
  if (prefersReducedMotion()) return;
  const colors = [C.butter, C.pink, C.mint, C.sky, C.peach];
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const distance = 70 + Math.random() * 60;
    const el = html(`<span class="burst-star">${STAR(colors[i % colors.length])}</span>`);
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
    el.style.setProperty('--dy', `${Math.sin(angle) * distance - 30}px`);
    el.style.setProperty('--rot', `${Math.random() * 240 - 120}deg`);
    el.style.setProperty('--size', `${18 + Math.random() * 14}px`);
    document.body.append(el);
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }
}
