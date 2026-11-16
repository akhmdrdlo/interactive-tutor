/**
 * Gambar dekorasi (inline SVG). Benda lantai digambar dengan titik (0,0) di tengah-bawah,
 * benda dinding dengan (0,0) di tengah — supaya mudah diletakkan & diseret.
 * Barang koleksi memakai bingkai putih tipis ala stiker die-cut (BRANDKIT).
 */
import { C } from '../core/palette.js';
import { findDecor } from '../data/decor.js';

const O = `stroke="${C.cocoa}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"`;
const O3 = `stroke="${C.cocoa}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;

const ART = {
  bantal: () => `
    <ellipse cx="0" cy="-34" rx="70" ry="32" fill="${C.pink}" ${O}/>
    <path d="M-50 -40 Q0 -58 50 -40" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="0.7"/>
    <circle cx="0" cy="-34" r="7" fill="${C.pinkHover}" ${O3}/>
    <path d="M-70 -34 L-82 -40 M-70 -34 L-82 -28 M70 -34 L82 -40 M70 -34 L82 -28" ${O3}/>`,

  tanaman: () => `
    <path d="M0 -80 C-40 -110 -56 -160 -40 -210 C-6 -190 8 -140 0 -80 Z" fill="${C.mint}" ${O3}/>
    <path d="M0 -80 C30 -130 60 -150 62 -196 C30 -186 6 -140 0 -80 Z" fill="#8FC9A4" ${O3}/>
    <path d="M0 -80 C-30 -100 -64 -100 -60 -132 C-30 -134 -10 -110 0 -80 Z" fill="#8FC9A4" ${O3}/>
    <path d="M-44 -82 H44 L34 0 H-34 Z" fill="${C.peach}" ${O}/>
    <rect x="-52" y="-96" width="104" height="20" rx="8" fill="${C.wood}" ${O3}/>
    <path d="M-20 -50 Q0 -42 20 -50" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="0.7"/>`,

  'lampu-bintang': () => `
    <circle cx="0" cy="-140" r="52" fill="${C.butter}" opacity="0.3"/>
    <ellipse cx="0" cy="-8" rx="38" ry="10" fill="${C.woodLight}" ${O3}/>
    <rect x="-6" y="-104" width="12" height="96" rx="6" fill="${C.woodDeep}" ${O3}/>
    <path d="M0 -180 L11 -156 L37 -153 L18 -136 L23 -110 L0 -123 L-23 -110 L-18 -136 L-37 -153 L-11 -156 Z" fill="${C.butter}" ${O}/>
    <circle cx="-8" cy="-148" r="4" fill="#fff"/>`,

  kelinci: () => `
    <ellipse cx="-16" cy="-140" rx="12" ry="34" fill="#fff" ${O3}/><ellipse cx="-16" cy="-140" rx="5" ry="22" fill="${C.pink}"/>
    <ellipse cx="16" cy="-140" rx="12" ry="34" fill="#fff" ${O3}/><ellipse cx="16" cy="-140" rx="5" ry="22" fill="${C.pink}"/>
    <ellipse cx="0" cy="-40" rx="44" ry="40" fill="#fff" ${O}/>
    <circle cx="0" cy="-96" r="34" fill="#fff" ${O}/>
    <circle cx="-12" cy="-98" r="4" fill="${C.eye}"/><circle cx="12" cy="-98" r="4" fill="${C.eye}"/>
    <ellipse cx="-20" cy="-86" rx="6" ry="4" fill="${C.blush}" opacity="0.6"/><ellipse cx="20" cy="-86" rx="6" ry="4" fill="${C.blush}" opacity="0.6"/>
    <path d="M-5 -88 Q0 -84 5 -88" fill="none" ${O3}/>
    <ellipse cx="-26" cy="-6" rx="16" ry="10" fill="#fff" ${O3}/><ellipse cx="26" cy="-6" rx="16" ry="10" fill="#fff" ${O3}/>
    <path d="M-12 -64 L0 -58 L12 -64 L12 -52 L0 -58 L-12 -52 Z" fill="${C.sky}" ${O3}/>`,

  akuarium: () => `
    <rect x="-84" y="-60" width="168" height="60" rx="10" fill="${C.wood}" ${O}/>
    <rect x="-80" y="-190" width="160" height="128" rx="18" fill="#D8EEF7" ${O}/>
    <path d="M-80 -160 Q-40 -170 0 -160 T80 -160 V-80 Q80 -62 62 -62 H-62 Q-80 -62 -80 -80 Z" fill="${C.sky}" opacity="0.8"/>
    <path d="M-50 -64 C-56 -90 -40 -110 -44 -130 M-36 -64 C-30 -86 -42 -100 -34 -118" fill="none" stroke="#7FBF95" stroke-width="6" stroke-linecap="round"/>
    <path d="M10 -120 C20 -134 44 -134 52 -120 C44 -106 20 -106 10 -120 Z" fill="${C.peach}" ${O3}/><path d="M52 -120 L64 -130 L64 -110 Z" fill="${C.peach}" ${O3}/>
    <circle cx="22" cy="-122" r="2.5" fill="${C.cocoa}"/>
    <circle cx="-4" cy="-146" r="5" fill="none" stroke="#fff" stroke-width="3"/><circle cx="4" cy="-166" r="4" fill="none" stroke="#fff" stroke-width="3"/>`,

  'poster-pelangi': () => `
    <rect x="-86" y="-100" width="172" height="200" rx="14" fill="#fff" ${O}/>
    <rect x="-72" y="-86" width="144" height="172" rx="8" fill="${C.card}" ${O3}/>
    ${[[56, C.pink], [44, C.peach], [32, C.butter], [20, C.mint], [8, C.sky]].map(([r, fill]) => `<path d="M${-r - 4} 30 A${r + 4} ${r + 4} 0 0 1 ${r + 4} 30" fill="none" stroke="${fill}" stroke-width="10"/>`).join('')}
    <path d="M-64 40 Q-60 26 -44 30 Q-38 18 -24 24 Q-10 24 -12 38 Q-2 44 -12 50 H-58 Q-70 48 -64 40 Z" fill="#fff" ${O3}/>
    <path d="M30 44 Q34 32 48 36 Q56 26 66 34 Q72 44 62 50 H36 Q26 50 30 44 Z" fill="#fff" ${O3}/>`,

  jam: () => `
    <circle cx="0" cy="0" r="62" fill="${C.sky}" ${O}/>
    <circle cx="0" cy="0" r="48" fill="#fff" ${O3}/>
    ${Array.from({ length: 12 }, (_, i) => { const a = (i * Math.PI) / 6; return `<circle cx="${(Math.sin(a) * 38).toFixed(1)}" cy="${(-Math.cos(a) * 38).toFixed(1)}" r="${i % 3 === 0 ? 4 : 2.5}" fill="${C.cocoa}"/>`; }).join('')}
    <path d="M0 0 L0 -28" ${O}/><path class="clock-hand" d="M0 0 L20 10" ${O}/>
    <circle cx="0" cy="0" r="5" fill="${C.pink}" ${O3}/>`,

  'papan-stiker': () => `
    <rect x="-108" y="-82" width="216" height="164" rx="16" fill="${C.wood}" ${O}/>
    <rect x="-94" y="-68" width="188" height="136" rx="8" fill="#E7C9A2" ${O3}/>
    <rect x="-80" y="-56" width="60" height="44" rx="6" fill="#fff" ${O3} transform="rotate(-6 -50 -34)"/>
    <path d="M30 -40 L36 -27 L50 -26 L39 -17 L43 -3 L30 -11 L17 -3 L21 -17 L10 -26 L24 -27 Z" fill="${C.butter}" stroke="#fff" stroke-width="6" stroke-linejoin="round"/>
    <path d="M30 -40 L36 -27 L50 -26 L39 -17 L43 -3 L30 -11 L17 -3 L21 -17 L10 -26 L24 -27 Z" fill="${C.butter}" ${O3}/>
    <circle cx="-48" cy="30" r="20" fill="${C.pink}" stroke="#fff" stroke-width="6"/><circle cx="-48" cy="30" r="20" fill="none" ${O3}/>
    <path d="M40 22 C30 12 30 4 36 2 C40 1 42 4 42 6 C42 4 44 1 48 2 C54 4 54 12 44 22 Z" transform="translate(4 14)" fill="${C.mint}" ${O3}/>
    <circle cx="-50" cy="-62" r="5" fill="${C.pinkHover}" ${O3}/><circle cx="30" cy="-58" r="5" fill="${C.sky}" ${O3}/>`,

  'lampu-tali': () => {
    const bulbs = [C.pink, C.butter, C.mint, C.sky, C.peach, C.pink, C.butter, C.mint, C.sky];
    const pt = (t) => { const x = -210 + 420 * t; const y = -30 + 70 * Math.sin(Math.PI * t); return [x, y]; };
    return `<path d="M-210 -30 Q0 110 210 -30" fill="none" stroke="${C.cocoa}" stroke-width="3.5" stroke-linecap="round"/>
      ${bulbs.map((fill, i) => { const [x, y] = pt((i + 0.5) / bulbs.length); return `<g class="bulb" style="animation-delay:${i * 0.2}s"><circle cx="${x.toFixed(1)}" cy="${(y + 14).toFixed(1)}" r="16" fill="${fill}" opacity="0.35"/><rect x="${(x - 5).toFixed(1)}" y="${(y - 4).toFixed(1)}" width="10" height="8" rx="2" fill="${C.cocoa}"/><ellipse cx="${x.toFixed(1)}" cy="${(y + 14).toFixed(1)}" rx="9" ry="12" fill="${fill}" ${O3}/></g>`; }).join('')}`;
  },

  angklung: () => `
    <rect x="-80" y="-100" width="160" height="200" rx="16" fill="${C.card}" ${O}/>
    <rect x="-56" y="-62" width="112" height="12" rx="6" fill="${C.wood}" ${O3}/>
    <rect x="-56" y="54" width="112" height="12" rx="6" fill="${C.wood}" ${O3}/>
    <rect x="-46" y="-48" width="22" height="100" rx="11" fill="#E9D59A" ${O3}/>
    <rect x="-12" y="-36" width="22" height="88" rx="11" fill="#E9D59A" ${O3}/>
    <rect x="22" y="-24" width="22" height="76" rx="11" fill="#E9D59A" ${O3}/>
    <path d="M-60 -62 V66 M60 -62 V66" ${O3}/>
    <path d="M-40 -80 Q0 -96 40 -80" fill="none" stroke="${C.pink}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="0" cy="-86" r="6" fill="${C.pinkHover}" ${O3}/>`,
};

Object.assign(ART, {
  beanbag: () => `
    <path d="M-80 0 C-90 -60 -50 -110 0 -110 C50 -110 90 -60 80 0 Z" fill="${C.sky}" ${O}/>
    <path d="M-40 -70 Q0 -90 40 -70" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity="0.7"/>
    <path d="M-60 -20 Q0 -40 60 -20" fill="none" stroke="#93BED6" stroke-width="5" stroke-linecap="round"/>`,

  'rumah-kucing': () => `
    <path d="M-76 0 V-90 L0 -150 L76 -90 V0 Z" fill="${C.peach}" ${O}/>
    <path d="M-86 -86 L0 -158 L86 -86" fill="none" stroke="${C.wood}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-86 -86 L0 -158 L86 -86" fill="none" ${O}/>
    <path d="M-34 0 V-50 Q0 -86 34 -50 V0 Z" fill="${C.woodDeep}" ${O3}/>
    <ellipse cx="0" cy="-6" rx="30" ry="8" fill="${C.pink}" opacity="0.8"/>
    <path d="M-12 -112 C-20 -122 -14 -132 -6 -128 C-2 -126 0 -122 0 -120 C0 -122 2 -126 6 -128 C14 -132 20 -122 12 -112 L0 -100 Z" fill="${C.pink}" ${O3}/>`,

  'karpet-bintang': () => `
    <ellipse cx="0" cy="-28" rx="158" ry="32" fill="#D9C8EC" ${O}/>
    <ellipse cx="0" cy="-28" rx="130" ry="22" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="2 16" stroke-linecap="round"/>
    ${[[-80, -30], [0, -38], [80, -28], [-36, -18], [40, -18]].map(([x, y]) => `<path d="M${x} ${y - 8} L${x + 2.5} ${y - 2.5} L${x + 8} ${y - 2} L${x + 4} ${y + 2} L${x + 5} ${y + 8} L${x} ${y + 5} L${x - 5} ${y + 8} L${x - 4} ${y + 2} L${x - 8} ${y - 2} L${x - 2.5} ${y - 2.5} Z" fill="${C.butter}" ${O3}/>`).join('')}`,

  'rak-dinding': () => `
    <rect x="-110" y="20" width="220" height="16" rx="6" fill="${C.wood}" ${O}/>
    <path d="M-80 36 L-70 56 M80 36 L70 56" ${O}/>
    <rect x="-96" y="-34" width="18" height="54" rx="4" fill="${C.pink}" ${O3}/>
    <rect x="-76" y="-26" width="18" height="46" rx="4" fill="${C.mint}" ${O3}/>
    <rect x="-56" y="-38" width="18" height="58" rx="4" fill="${C.sky}" ${O3}/>
    <path d="M10 20 L14 -4 H46 L50 20 Z" fill="${C.peach}" ${O3}/>
    <path d="M30 -4 C18 -18 18 -34 26 -44 C36 -32 38 -18 30 -4 Z" fill="${C.mint}" ${O3}/>
    <circle cx="84" cy="2" r="16" fill="${C.butter}" ${O3}/>
    <path d="M78 -2 L84 6 L92 -4" fill="none" ${O3}/>`,

  'bingkai-foto': () => `
    <rect x="-78" y="-68" width="156" height="136" rx="14" fill="${C.wood}" ${O}/>
    <rect x="-64" y="-54" width="128" height="108" rx="6" fill="#FFF1D6" ${O3}/>
    <circle cx="-30" cy="-6" r="18" fill="${C.peach}" ${O3}/><path d="M-50 40 Q-30 14 -10 40 Z" fill="${C.sky}" ${O3}/>
    <circle cx="26" cy="-10" r="20" fill="#F4C095" ${O3}/><path d="M4 40 Q26 10 48 40 Z" fill="${C.pink}" ${O3}/>
    <circle cx="0" cy="14" r="12" fill="#FFD7BA" ${O3}/><path d="M-12 42 Q0 26 12 42 Z" fill="${C.mint}" ${O3}/>`,
});

/** Gambar dekorasi tanpa pembungkus (untuk disisipkan ke <g> di kamar). */
export function decorArt(id) {
  return ART[id]?.() ?? '';
}

/** Thumbnail SVG mandiri untuk toko dekorasi. */
export function decorThumb(id) {
  const item = findDecor(id);
  const pad = 12;
  const vb = item.zone === 'floor'
    ? `${-item.w / 2 - pad} ${-item.h - pad} ${item.w + pad * 2} ${item.h + pad * 2}`
    : `${-item.w / 2 - pad} ${-item.h / 2 - pad} ${item.w + pad * 2} ${item.h + pad * 2}`;
  return `<svg viewBox="${vb}" aria-hidden="true">${decorArt(id)}</svg>`;
}
