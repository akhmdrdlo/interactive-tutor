/**
 * Ikon inline SVG bergaya stiker (outline cocoa, ujung membulat).
 * Semua ikon memakai viewBox 0 0 48 48.
 */
import { C } from '../core/palette.js';

const O = `stroke="${C.cocoa}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;
const wrap = (inner, label = '') =>
  `<svg class="icon" viewBox="0 0 48 48" aria-hidden="${label ? 'false' : 'true'}" ${label ? `role="img" aria-label="${label}"` : ''}>${inner}</svg>`;

const PATHS = {
  star: `<path d="M24 6 L29.5 17.5 L42 19 L32.8 27.6 L35.2 40 L24 33.8 L12.8 40 L15.2 27.6 L6 19 L18.5 17.5 Z" fill="${C.butter}" ${O}/><path d="M17 21 L20 20.6" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
  close: `<circle cx="24" cy="24" r="18" fill="${C.card}" ${O}/><path d="M17 17 L31 31 M31 17 L17 31" fill="none" ${O}/>`,
  back: `<circle cx="24" cy="24" r="18" fill="${C.card}" ${O}/><path d="M27 15 L18 24 L27 33" fill="none" ${O}/>`,
  soundOn: `<path d="M9 19 H16 L25 11 V37 L16 29 H9 Z" fill="${C.sky}" ${O}/><path d="M31 18 Q35 24 31 30 M36 13 Q43 24 36 35" fill="none" ${O}/>`,
  soundOff: `<path d="M9 19 H16 L25 11 V37 L16 29 H9 Z" fill="${C.linen}" ${O}/><path d="M32 19 L41 28 M41 19 L32 28" fill="none" ${O}/>`,
  save: `<rect x="8" y="8" width="32" height="32" rx="7" fill="${C.mint}" ${O}/><rect x="15" y="8" width="18" height="11" rx="2" fill="#fff" ${O}/><rect x="14" y="26" width="20" height="14" rx="3" fill="${C.card}" ${O}/>`,
  download: `<path d="M24 8 V28 M15 20 L24 29 L33 20" fill="none" ${O}/><path d="M9 32 V38 Q9 40 11 40 H37 Q39 40 39 38 V32" fill="none" ${O}/>`,
  upload: `<path d="M24 30 V10 M15 18 L24 9 L33 18" fill="none" ${O}/><path d="M9 32 V38 Q9 40 11 40 H37 Q39 40 39 38 V32" fill="none" ${O}/>`,
  check: `<circle cx="24" cy="24" r="17" fill="${C.mint}" ${O}/><path d="M16 24 L22 30 L32 18" fill="none" stroke="${C.mintInk}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
  lock: `<rect x="12" y="21" width="24" height="19" rx="6" fill="${C.butter}" ${O}/><path d="M17 21 V16 Q17 9 24 9 Q31 9 31 16 V21" fill="none" ${O}/><circle cx="24" cy="30" r="2.5" fill="${C.cocoa}"/>`,

  // Ikon mata pelajaran
  leaf: `<path d="M10 38 C10 18 22 8 40 8 C40 28 30 38 10 38 Z" fill="#fff" ${O}/><path d="M12 36 L30 18" fill="none" ${O}/>`,
  math: `<rect x="7" y="7" width="15" height="15" rx="4" fill="#fff" ${O}/><rect x="26" y="7" width="15" height="15" rx="4" fill="#fff" ${O}/><rect x="7" y="26" width="15" height="15" rx="4" fill="#fff" ${O}/><rect x="26" y="26" width="15" height="15" rx="4" fill="#fff" ${O}/><path d="M14.5 11 V18 M11 14.5 H18 M30 14.5 H37 M11 30 L18 37 M18 30 L11 37 M30 31 H37 M30 36 H37" fill="none" stroke="${C.cocoa}" stroke-width="2.5" stroke-linecap="round"/>`,
  book: `<path d="M24 13 Q16 8 7 10 V37 Q16 35 24 40 Q32 35 41 37 V10 Q32 8 24 13 Z" fill="#fff" ${O}/><path d="M24 13 V40" fill="none" ${O}/><path d="M12 18 Q16 17 19 18.5 M12 24 Q16 23 19 24.5 M29 18.5 Q32 17 36 18 M29 24.5 Q32 23 36 24" fill="none" stroke="${C.cocoa}" stroke-width="2.5" stroke-linecap="round"/>`,
  chat: `<path d="M8 12 Q8 8 12 8 H36 Q40 8 40 12 V28 Q40 32 36 32 H20 L12 40 V32 Q8 32 8 28 Z" fill="#fff" ${O}/><text x="24" y="25" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="12" fill="${C.cocoa}">ABC</text>`,
  moon: `<path d="M30 8 A17 17 0 1 0 40 34 A13 13 0 1 1 30 8 Z" fill="#fff" ${O}/><path d="M36 13 L37.5 17 L41.5 17.5 L38.5 20 L39.5 24 L36 22 L32.5 24 L33.5 20 L30.5 17.5 L34.5 17 Z" fill="${C.butter}" stroke="${C.cocoa}" stroke-width="2" stroke-linejoin="round"/>`,
  shield: `<path d="M24 6 L40 11 V23 C40 33 33 39 24 42 C15 39 8 33 8 23 V11 Z" fill="#fff" ${O}/><path d="M24 14 L26.8 19.8 L33 20.5 L28.4 24.8 L29.6 31 L24 27.9 L18.4 31 L19.6 24.8 L15 20.5 L21.2 19.8 Z" fill="${C.butter}" stroke="${C.cocoa}" stroke-width="2.2" stroke-linejoin="round"/>`,
  angklung: `<rect x="8" y="10" width="32" height="5" rx="2.5" fill="#fff" ${O}/><rect x="8" y="35" width="32" height="5" rx="2.5" fill="#fff" ${O}/><rect x="12" y="16" width="7" height="22" rx="3.5" fill="#fff" ${O}/><rect x="21" y="13" width="7" height="25" rx="3.5" fill="#fff" ${O}/><rect x="30" y="18" width="7" height="20" rx="3.5" fill="#fff" ${O}/>`,
  palette: `<path d="M24 7 C13 7 6 15 6 24 C6 34 14 41 23 41 C27 41 27 37 25 35 C23 33 24 29 28 29 H33 C38 29 42 26 42 21 C42 13 34 7 24 7 Z" fill="#fff" ${O}/><circle cx="16" cy="20" r="3.2" fill="${C.pink}" stroke="${C.cocoa}" stroke-width="2"/><circle cx="24" cy="14" r="3.2" fill="${C.butter}" stroke="${C.cocoa}" stroke-width="2"/><circle cx="33" cy="17" r="3.2" fill="${C.sky}" stroke="${C.cocoa}" stroke-width="2"/><circle cx="15" cy="30" r="3.2" fill="${C.mint}" stroke="${C.cocoa}" stroke-width="2"/>`,
  code: `<rect x="6" y="9" width="36" height="30" rx="7" fill="#fff" ${O}/><path d="M18 19 L13 24 L18 29 M30 19 L35 24 L30 29 M26 17 L22 31" fill="none" ${O}/>`,
};
export const icon = (name, label) => wrap(PATHS[name] ?? '', label);
