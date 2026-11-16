/**
 * Potongan-potongan karakter chibi (Modular Layered SVG).
 *
 * Kanvas karakter: viewBox 0 0 240 320, sumbu tengah x = 120.
 *   kepala  : y 30–160 (≈ 130 unit)  → tinggi total ≈ 2.4 kepala (chibi)
 *   badan   : y 160–245
 *   kaki    : y 245–306
 *
 * Setiap fungsi mengembalikan string SVG tanpa <svg> pembungkus, supaya bisa
 * dirakit ke dalam <g id="layer-..."> oleh avatar.js — atau disisipkan ke SVG kamar.
 */
import { C, OUTLINE } from '../core/palette.js';

const O = OUTLINE;
const O2 = `stroke="${C.cocoa}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"`;

/**
 * Anggota tubuh berbentuk kapsul dengan outline cocoa:
 * garis cocoa tebal di bawah, garis warna sedikit lebih tipis di atasnya.
 */
export function limb(x1, y1, x2, y2, width, fill) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.cocoa}" stroke-width="${width + 5.5}" stroke-linecap="round"/>`
    + `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${fill}" stroke-width="${width}" stroke-linecap="round"/>`;
}

/* ───────────────────────── BADAN ───────────────────────── */

export function body(skin) {
  return [
    limb(107, 248, 107, 292, 14, skin.base), // kaki kiri
    limb(133, 248, 133, 292, 14, skin.base), // kaki kanan
    limb(93, 182, 70, 232, 17, skin.base),   // lengan kiri (ujung bulat = tangan)
    limb(147, 182, 170, 232, 17, skin.base), // lengan kanan
    `<rect x="109" y="146" width="22" height="28" rx="9" fill="${skin.shade}" ${O}/>`, // leher
  ].join('');
}

export function head(skin) {
  return [
    `<circle cx="47" cy="114" r="13" fill="${skin.base}" ${O}/>`,
    `<circle cx="193" cy="114" r="13" fill="${skin.base}" ${O}/>`,
    `<rect x="45" y="30" width="150" height="130" rx="62" fill="${skin.base}" ${O}/>`,
  ].join('');
}

/* ───────────────────────── WAJAH ───────────────────────── */

function openEye(cx) {
  return `<ellipse cx="${cx}" cy="112" rx="12.5" ry="15" fill="${C.eye}"/>`
    + `<circle cx="${cx - 4.5}" cy="106" r="4.6" fill="#fff"/>`
    + `<circle cx="${cx + 4}" cy="118" r="2.2" fill="#fff"/>`;
}

function closedEye(cx) {
  return `<path d="M${cx - 12} 115 Q${cx} 101 ${cx + 12} 115" fill="none" stroke="${C.eye}" stroke-width="4.5" stroke-linecap="round"/>`;
}

export function eyes(expression) {
  return expression === 'happy' ? closedEye(90) + closedEye(150) : openEye(90) + openEye(150);
}

const MOUTHS = {
  smile: `<path d="M113 135 Q120 142 127 135" fill="none" ${O}/>`,
  happy: `<path d="M110 133 L130 133 Q129 147 120 147 Q111 147 110 133 Z" fill="#C9606F" ${O2}/>`
    + `<path d="M114 143 Q120 139 126 143 Q123 147 120 147 Q117 147 114 143 Z" fill="#F59AA8"/>`,
  wow: `<ellipse cx="120" cy="139" rx="6" ry="7" fill="#C9606F" ${O2}/>`,
};

export function face(expression) {
  const brows = `<path d="M81 92 Q90 87 99 91" fill="none" ${O2}/><path d="M141 91 Q150 87 159 92" fill="none" ${O2}/>`;
  const blush = `<ellipse cx="72" cy="133" rx="12" ry="7" fill="${C.blush}" opacity="0.6"/>`
    + `<ellipse cx="168" cy="133" rx="12" ry="7" fill="${C.blush}" opacity="0.6"/>`;
  return brows + blush + (MOUTHS[expression] ?? MOUTHS.smile);
}

/* ───────────────────────── RAMBUT ─────────────────────────
 * Tiap gaya punya `back` (di belakang badan) dan `front` (di depan wajah).
 */

const shine = (d) => `<path d="${d}" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="0.55"/>`;

export const HAIR = {
  bob: (c) => ({
    back: `<path d="M28 112 C28 44 70 10 120 10 C170 10 212 44 212 112 L213 160 Q213 176 197 176 L43 176 Q27 176 27 160 Z" fill="${c.shade}" ${O}/>`,
    front: `<path d="M120 16 C168 16 206 46 206 100 L206 158 Q206 168 196 168 Q186 168 184 158 L182 102
      C180 90 176 82 170 77 Q158 92 146 76 Q133 92 120 76 Q107 92 94 76 Q82 92 70 77
      C64 82 60 90 58 102 L56 158 Q54 168 44 168 Q34 168 34 158 L34 100 C34 46 72 16 120 16 Z" fill="${c.base}" ${O}/>`
      + shine('M80 38 Q98 27 116 27'),
  }),

  kuncir: (c) => ({
    back: `<path d="M32 122 C32 44 70 12 120 12 C170 12 208 44 208 122 Z" fill="${c.shade}" ${O}/>`
      + `<path d="M46 96 C10 104 2 152 14 198 C20 218 42 214 40 194 C36 162 44 132 60 114 Z" fill="${c.base}" ${O}/>`
      + `<path d="M194 96 C230 104 238 152 226 198 C220 218 198 214 200 194 C204 162 196 132 180 114 Z" fill="${c.base}" ${O}/>`,
    front: `<path d="M120 16 C168 16 206 46 206 104 L206 120 Q200 126 194 116 C190 98 184 84 174 76
      C150 98 108 92 84 70 Q76 84 64 88 C58 98 54 108 50 120 Q42 126 34 120 L34 104 C34 46 72 16 120 16 Z" fill="${c.base}" ${O}/>`
      + `<circle cx="37" cy="104" r="9" fill="${C.pink}" ${O}/>`
      + `<circle cx="203" cy="104" r="9" fill="${C.pink}" ${O}/>`
      + shine('M128 28 Q150 30 166 42'),
  }),

  panjang: (c) => ({
    back: `<path d="M28 112 C28 44 70 10 120 10 C170 10 212 44 212 112 L216 220 Q224 236 212 246 Q202 256 190 246
      Q178 258 166 246 L74 246 Q62 258 50 246 Q38 256 28 246 Q16 236 24 220 Z" fill="${c.shade}" ${O}/>`,
    front: `<path d="M120 16 C168 16 206 46 206 104 L208 186 Q202 198 192 190 Q186 180 188 168 L186 112
      C182 90 168 70 142 60 Q130 56 120 44 Q110 56 98 60 C72 70 58 90 54 112 L52 168 Q54 180 48 190
      Q38 198 32 186 L34 104 C34 46 72 16 120 16 Z" fill="${c.base}" ${O}/>`
      + shine('M70 44 Q84 32 102 28'),
  }),

  ekorKuda: (c) => ({
    back: `<path d="M32 122 C32 44 70 12 120 12 C170 12 208 44 208 122 Z" fill="${c.shade}" ${O}/>`
      + `<path d="M172 40 C214 32 238 72 230 124 C224 164 206 180 210 204 C188 190 194 152 198 122 C202 88 194 66 174 60 Z" fill="${c.base}" ${O}/>`,
    front: `<path d="M120 16 C168 16 206 46 206 104 L206 120 Q200 126 194 116 C190 98 184 84 174 76
      C150 98 108 92 84 70 Q76 84 64 88 C58 98 54 108 50 120 Q42 126 34 120 L34 104 C34 46 72 16 120 16 Z" fill="${c.base}" ${O}/>`
      + `<ellipse cx="180" cy="42" rx="10" ry="12" fill="${C.sky}" ${O} transform="rotate(-25 180 42)"/>`
      + shine('M70 40 Q86 28 104 26'),
  }),

  sanggul: (c) => ({
    back: `<circle cx="64" cy="30" r="24" fill="${c.base}" ${O}/><circle cx="176" cy="30" r="24" fill="${c.base}" ${O}/>`
      + `<path d="M32 122 C32 44 70 12 120 12 C170 12 208 44 208 122 Z" fill="${c.shade}" ${O}/>`,
    front: `<path d="M120 16 C168 16 206 46 206 104 L206 126 Q198 130 192 120 L188 96 C184 86 178 80 170 79
      Q145 84 120 79 Q95 84 70 79 C62 80 56 86 52 96 L48 120 Q42 130 34 126 L34 104 C34 46 72 16 120 16 Z" fill="${c.base}" ${O}/>`
      + `<path d="M52 38 Q64 46 78 40 M162 40 Q176 46 188 38" fill="none" stroke="${C.pink}" stroke-width="5" stroke-linecap="round"/>`
      + shine('M84 32 Q100 24 118 24'),
  }),

  pendek: (c) => ({
    back: `<path d="M34 118 C34 46 72 14 120 14 C168 14 206 46 206 118 Z" fill="${c.shade}" ${O}/>`,
    front: `<path d="M120 14 C170 14 208 48 206 104 L204 122 Q196 126 192 116 C190 100 184 88 176 82
      Q160 92 148 80 Q136 94 122 80 Q106 94 92 80 Q80 92 64 82 C56 88 50 100 48 116 Q44 126 36 122 L34 104 C32 48 70 14 120 14 Z" fill="${c.base}" ${O}/>`
      + `<path d="M118 16 C112 4 124 -2 132 6" fill="none" stroke="${C.cocoa}" stroke-width="5" stroke-linecap="round"/>`
      + `<path d="M118 16 C112 4 124 -2 132 6" fill="none" stroke="${c.base}" stroke-width="2.5" stroke-linecap="round"/>`
      + shine('M76 36 Q94 26 112 26'),
  }),

  kepang: (c) => ({
    back: `<path d="M32 122 C32 44 70 12 120 12 C170 12 208 44 208 122 Z" fill="${c.shade}" ${O}/>`,
    front: `<path d="M120 16 C168 16 206 46 206 104 L206 120 Q200 126 194 116 C190 98 184 84 174 76
      C150 98 108 92 84 70 Q76 84 64 88 C58 98 54 108 50 120 Q42 126 34 120 L34 104 C34 46 72 16 120 16 Z" fill="${c.base}" ${O}/>`
      + [0, 1, 2, 3, 4].map((k) => `<ellipse cx="${186 + (k % 2 ? 4 : -2)}" cy="${126 + k * 22}" rx="15" ry="14" fill="${k % 2 ? c.shade : c.base}" ${O}/>`).join('')
      + `<circle cx="188" cy="238" r="8" fill="${C.mint}" ${O}/>`
      + `<path d="M182 246 Q188 262 196 248" fill="${c.base}" ${O}/>`
      + shine('M70 40 Q86 28 104 26'),
  }),

  /** Kerudung: lubang wajah dibuat dengan fill-rule evenodd. */
  kerudung: (c) => ({
    back: `<path d="M34 150 Q22 214 46 232 L194 232 Q218 214 206 150 Z" fill="${c.shade}" ${O}/>`,
    front: `<path fill-rule="evenodd" d="M120 10 C172 10 212 46 212 112 C212 150 206 176 216 202 Q120 236 24 202
      C34 176 28 150 28 112 C28 46 68 10 120 10 Z
      M120 46 C158 46 184 74 184 110 C184 142 160 164 120 164 C80 164 56 142 56 110 C56 74 82 46 120 46 Z"
      fill="${c.base}" ${O}/>`
      + `<path d="M62 96 C68 66 92 52 120 52 C148 52 172 66 178 96" fill="none" stroke="${C.card}" stroke-width="6" stroke-linecap="round"/>`
      + `<path d="M98 196 Q120 206 142 196" fill="none" stroke="${c.shade}" stroke-width="3" stroke-linecap="round"/>`
      + shine('M64 52 Q82 30 108 24'),
  }),
};

/* ───────────────────────── BAJU ───────────────────────── */

const shoe = (x, fill) => `<rect x="${x}" y="289" width="25" height="17" rx="8" fill="${fill}" ${O}/>`;
const shoes = (fill) => shoe(95, fill) + shoe(121, fill);
const socks = limb(107, 280, 107, 290, 14, '#fff') + limb(133, 280, 133, 290, 14, '#fff');
const TOP = 'M90 166 Q120 158 150 166 L160 234 Q120 242 80 234 Z';

export const OUTFIT = {
  /** Seragam SD merah-putih */
  seragam: () => [
    limb(93, 180, 85, 196, 24, '#FFFDF8'),
    limb(147, 180, 155, 196, 24, '#FFFDF8'),
    `<path d="M82 226 L158 226 L170 266 Q120 276 70 266 Z" fill="#E98A8F" ${O}/>`,
    `<path d="M102 234 L96 266 M120 234 L120 270 M138 234 L144 266" stroke="#C96F76" stroke-width="2.5" stroke-linecap="round"/>`,
    `<path d="${TOP}" fill="#FFFDF8" ${O}/>`,
    `<path d="M116 182 L124 182 L127 202 L120 209 L113 202 Z" fill="#E98A8F" ${O2}/>`,
    `<path d="M106 162 Q111 176 120 181 Q108 188 97 178 Z" fill="#FFFDF8" ${O2}/>`,
    `<path d="M134 162 Q129 176 120 181 Q132 188 143 178 Z" fill="#FFFDF8" ${O2}/>`,
    `<rect x="133" y="198" width="16" height="14" rx="3" fill="none" ${O2}/>`,
    `<circle cx="141" cy="193" r="4" fill="${C.butter}" ${O2}/>`,
    socks,
    shoes('#5E453D'),
  ].join(''),

  /** Kaus kuning + overall biru */
  overall: () => [
    limb(93, 180, 85, 196, 24, C.butter),
    limb(147, 180, 155, 196, 24, C.butter),
    `<path d="${TOP}" fill="${C.butter}" ${O}/>`,
    `<path d="M80 222 L160 222 L164 256 L126 258 L120 246 L114 258 L76 256 Z" fill="${C.sky}" ${O}/>`,
    limb(103, 194, 97, 170, 6, C.sky),
    limb(137, 194, 143, 170, 6, C.sky),
    `<rect x="99" y="190" width="42" height="40" rx="9" fill="${C.sky}" ${O}/>`,
    `<path d="M120 216 C112 208 110 202 115 200 C118 199 120 202 120 203 C120 202 122 199 125 200 C130 202 128 208 120 216 Z" fill="${C.pink}" ${O2}/>`,
    `<circle cx="104" cy="196" r="3.5" fill="${C.butter}" ${O2}/>`,
    `<circle cx="136" cy="196" r="3.5" fill="${C.butter}" ${O2}/>`,
    shoes(C.pink),
    `<path d="M98 300 L117 300 M124 300 L143 300" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
  ].join(''),

  /** Gaun pink berbintik dengan kerah bulat */
  gaun: () => [
    `<ellipse cx="88" cy="184" rx="15" ry="13" fill="${C.pink}" ${O}/>`,
    `<ellipse cx="152" cy="184" rx="15" ry="13" fill="${C.pink}" ${O}/>`,
    `<path d="M92 166 Q120 158 148 166 L154 214 Q176 250 174 266 Q120 280 66 266 Q64 250 86 214 Z" fill="${C.pink}" ${O}/>`,
    ...[[90, 246], [110, 258], [132, 250], [152, 260], [100, 232], [144, 236], [122, 268]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#fff" opacity="0.85"/>`),
    `<rect x="86" y="208" width="68" height="10" rx="5" fill="${C.card}" ${O2}/>`,
    `<path d="M120 213 L108 205 L108 221 Z M120 213 L132 205 L132 221 Z" fill="${C.card}" ${O2}/>`,
    `<circle cx="120" cy="213" r="3.5" fill="${C.pinkHover}" ${O2}/>`,
    `<path d="M120 170 Q106 164 98 172 Q102 186 120 180 Z" fill="#fff" ${O2}/>`,
    `<path d="M120 170 Q134 164 142 172 Q138 186 120 180 Z" fill="#fff" ${O2}/>`,
    socks,
    shoes('#A0675A'),
    `<path d="M97 293 L118 293 M123 293 L144 293" stroke="${C.cocoa}" stroke-width="2.5" stroke-linecap="round"/>`,
  ].join(''),
};

/** Lengan panjang: kapsul dari bahu hampir ke pergelangan, ujung tangan tetap terlihat. */
const longSleeves = (fill) => limb(93, 180, 76, 220, 24, fill) + limb(147, 180, 164, 220, 24, fill);
const longPants = (fill) => limb(107, 246, 107, 282, 18, fill) + limb(133, 246, 133, 282, 18, fill);

Object.assign(OUTFIT, {
  /** Hoodie biru langit + celana jin */
  hoodie: () => [
    longSleeves(C.sky),
    longPants('#8FB3D9'),
    `<path d="M88 166 Q120 156 152 166 L162 240 Q120 250 78 240 Z" fill="${C.sky}" ${O}/>`,
    `<path d="M100 164 Q120 186 140 164" fill="none" ${O}/>`,
    `<path d="M98 210 H142 L136 236 H104 Z" fill="#9FCBE3" ${O2}/>`,
    `<path d="M112 172 V194 M128 172 V194" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>`,
    `<circle cx="112" cy="196" r="3" fill="#fff" ${O2}/><circle cx="128" cy="196" r="3" fill="#fff" ${O2}/>`,
    `<path d="M106 226 Q120 222 134 226" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.8"/>`,
    shoes('#FFFDF8'),
    `<path d="M98 300 L117 300 M124 300 L143 300" stroke="${C.sky}" stroke-width="3" stroke-linecap="round"/>`,
  ].join(''),

  /** Piyama bintang (atas & celana panjang) + sandal */
  piyama: () => {
    const fill = '#C9DDF2';
    const stars = [[104, 186], [138, 200], [110, 224], [146, 228]]
      .map(([x, y]) => `<path d="M${x} ${y - 6} L${x + 2} ${y - 2} L${x + 6} ${y - 1} L${x + 3} ${y + 2} L${x + 4} ${y + 6} L${x} ${y + 4} L${x - 4} ${y + 6} L${x - 3} ${y + 2} L${x - 6} ${y - 1} L${x - 2} ${y - 2} Z" fill="${C.butter}" stroke="${C.cocoa}" stroke-width="1.6" stroke-linejoin="round"/>`);
    return [
      longSleeves(fill),
      longPants(fill),
      `<path d="M90 166 Q120 158 150 166 L160 238 Q120 246 80 238 Z" fill="${fill}" ${O}/>`,
      `<path d="M120 168 V240" stroke="${C.cocoa}" stroke-width="2.5" stroke-linecap="round"/>`,
      ...[184, 204, 224].map((y) => `<circle cx="126" cy="${y}" r="3" fill="#fff" ${O2}/>`),
      `<path d="M104 164 L120 176 L136 164" fill="none" ${O2}/>`,
      ...stars,
      `<ellipse cx="105" cy="300" rx="14" ry="7" fill="${C.pink}" ${O}/><ellipse cx="135" cy="300" rx="14" ry="7" fill="${C.pink}" ${O}/>`,
    ].join('');
  },

  /** Gaun batik bermotif kawung sederhana */
  batik: () => {
    const base = '#E7B48A';
    const motif = '#9C5F3F';
    const kawung = [[96, 238], [120, 250], [144, 238], [108, 262], [132, 262], [104, 186], [136, 186]]
      .map(([x, y]) => `<g fill="${motif}" opacity="0.85"><ellipse cx="${x}" cy="${y - 5}" rx="3" ry="5"/><ellipse cx="${x}" cy="${y + 5}" rx="3" ry="5"/><ellipse cx="${x - 5}" cy="${y}" rx="5" ry="3"/><ellipse cx="${x + 5}" cy="${y}" rx="5" ry="3"/></g>`);
    return [
      limb(93, 180, 86, 198, 24, base),
      limb(147, 180, 154, 198, 24, base),
      `<path d="M92 166 Q120 158 148 166 L154 214 Q176 250 174 268 Q120 282 66 268 Q64 250 86 214 Z" fill="${base}" ${O}/>`,
      ...kawung,
      `<path d="M86 212 Q120 220 154 212" fill="none" stroke="${C.cocoa}" stroke-width="5" stroke-linecap="round"/>`,
      `<path d="M86 212 Q120 220 154 212" fill="none" stroke="${C.butter}" stroke-width="2.5" stroke-linecap="round"/>`,
      `<path d="M106 164 Q120 176 134 164" fill="none" ${O2}/>`,
      socks,
      shoes('#7D635B'),
    ].join('');
  },
});

Object.assign(OUTFIT, {
  /** Baju olahraga sekolah: kaus bergaris + celana training */
  olahraga: () => [
    longPants('#7E9FD3'),
    `<path d="M106 248 V282 M134 248 V282" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
    limb(93, 180, 85, 196, 24, '#BFE0F0'),
    limb(147, 180, 155, 196, 24, '#BFE0F0'),
    `<path d="${TOP}" fill="#BFE0F0" ${O}/>`,
    `<path d="M84 206 L156 206 M82 218 L158 218" stroke="#7E9FD3" stroke-width="5" stroke-linecap="round"/>`,
    `<path d="M106 162 Q120 176 134 162" fill="none" ${O2}/>`,
    `<circle cx="138" cy="190" r="6" fill="${C.butter}" ${O2}/>`,
    shoes('#FFFDF8'),
    `<path d="M98 300 L117 300 M124 300 L143 300" stroke="${C.pink}" stroke-width="3" stroke-linecap="round"/>`,
  ].join(''),

  /** Kebaya merah muda + kain batik panjang */
  kebaya: () => {
    const kain = '#B9805C';
    const motif = [[100, 252], [124, 262], [146, 250], [112, 276], [136, 278]]
      .map(([x, y]) => `<path d="M${x} ${y - 5} L${x + 5} ${y} L${x} ${y + 5} L${x - 5} ${y} Z" fill="${C.butter}" opacity="0.9"/>`);
    return [
      `<path d="M84 224 L156 224 L160 290 Q120 296 80 290 Z" fill="${kain}" ${O}/>`,
      ...motif,
      `<path d="M150 226 L140 290" stroke="${C.cocoa}" stroke-width="2.5" opacity="0.6"/>`,
      longSleeves('#F7B6C6'),
      `<path d="M90 166 Q120 158 150 166 L158 230 Q120 238 82 230 Z" fill="#F7B6C6" ${O}/>`,
      `<path d="M108 164 L120 200 L132 164" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`,
      ...[96, 108, 132, 144].map((x) => `<circle cx="${x}" cy="228" r="2.5" fill="#fff"/>`),
      `<circle cx="120" cy="204" r="6" fill="${C.butter}" ${O2}/>`,
      `<ellipse cx="105" cy="298" rx="13" ry="6" fill="${C.wood}" ${O}/><ellipse cx="135" cy="298" rx="13" ry="6" fill="${C.wood}" ${O}/>`,
    ].join('');
  },
});

/* ───────────────────────── AKSESORIS ───────────────────────── */

export const ACCESSORY = {
  kacamata: () => [
    `<circle cx="90" cy="112" r="18" fill="#fff" fill-opacity="0.22" ${O}/>`,
    `<circle cx="150" cy="112" r="18" fill="#fff" fill-opacity="0.22" ${O}/>`,
    `<path d="M108 110 Q120 103 132 110" fill="none" ${O}/>`,
    `<path d="M80 104 Q84 99 90 98 M140 104 Q144 99 150 98" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.9"/>`,
  ].join(''),

  jepit: () => `<path d="M72 34 L77 45 L89 46 L80 54 L83 66 L72 60 L61 66 L64 54 L55 46 L67 45 Z" fill="${C.butter}" ${O}/>`
    + `<circle cx="69" cy="48" r="2" fill="#fff"/>`,

  bando: () => {
    const flower = (x, y, petal) => [0, 72, 144, 216, 288]
      .map((a) => `<ellipse cx="${x}" cy="${y - 7}" rx="5" ry="7" fill="${petal}" ${O2} transform="rotate(${a} ${x} ${y})"/>`).join('')
      + `<circle cx="${x}" cy="${y}" r="4.5" fill="${C.butter}" ${O2}/>`;
    return `<path d="M46 86 C52 30 188 30 194 86" fill="none" stroke="${C.cocoa}" stroke-width="11" stroke-linecap="round"/>`
      + `<path d="M46 86 C52 30 188 30 194 86" fill="none" stroke="${C.mint}" stroke-width="6" stroke-linecap="round"/>`
      + flower(84, 44, C.pink) + flower(120, 34, '#fff') + flower(156, 44, C.pink);
  },

  syal: () => [
    `<path d="M92 162 Q120 178 148 162 L152 176 Q120 194 88 176 Z" fill="${C.pinkHover}" ${O}/>`,
    `<path d="M132 178 L140 218 L126 222 L120 184 Z" fill="${C.pinkHover}" ${O}/>`,
    `<path d="M128 206 L139 204 M130 214 L140 212" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
    `<path d="M100 172 Q120 182 140 172" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.7"/>`,
  ].join(''),

  headphone: () => [
    `<path d="M44 110 C36 18 204 18 196 110" fill="none" stroke="${C.cocoa}" stroke-width="13" stroke-linecap="round"/>`,
    `<path d="M44 110 C36 18 204 18 196 110" fill="none" stroke="#D9C8EC" stroke-width="8" stroke-linecap="round"/>`,
    `<rect x="28" y="94" width="26" height="40" rx="12" fill="${C.pink}" ${O}/>`,
    `<rect x="186" y="94" width="26" height="40" rx="12" fill="${C.pink}" ${O}/>`,
    `<path d="M34 104 V124 M206 104 V124" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.7"/>`,
  ].join(''),

  topi: () => [
    `<path d="M50 70 C54 26 186 26 190 70 Z" fill="${C.butter}" ${O}/>`,
    `<path d="M30 74 Q120 52 210 74 Q214 86 200 88 Q120 72 40 88 Q26 86 30 74 Z" fill="${C.butter}" ${O}/>`,
    `<path d="M56 62 Q120 50 184 62" fill="none" stroke="${C.pink}" stroke-width="7" stroke-linecap="round"/>`,
  ].join(''),

  stikerPipi: () => `<path d="M172 142 L175 149 L183 150 L177 155 L179 163 L172 159 L165 163 L167 155 L161 150 L169 149 Z" fill="${C.butter}" ${O2}/>`
    + `<circle cx="64" cy="150" r="4" fill="${C.pink}" ${O2}/>`,

  pita: () => [
    `<path d="M160 40 C148 24 132 30 136 44 C132 58 148 62 160 46 Z" fill="${C.pink}" ${O}/>`,
    `<path d="M160 40 C172 24 188 30 184 44 C188 58 172 62 160 46 Z" fill="${C.pink}" ${O}/>`,
    `<circle cx="160" cy="43" r="6" fill="${C.pinkHover}" ${O}/>`,
  ].join(''),
};
