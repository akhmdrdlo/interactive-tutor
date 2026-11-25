/**
 * Dunia luar rumah: lewat pintu di ujung kamar, karakter keluar ke trotoar Kampung SDaya.
 * Semua digambar di koordinat dunia yang sama dengan kamar (x mulai OUT_X).
 *
 * Skala: karakter tingginya ±360 unit dan berjalan di trotoar (kaki ±y880).
 * Gedung berdiri di belakang trotoar (alas y760), jadi pintunya dibuat ±300 unit
 * — sedikit lebih pendek dari karakter karena letaknya agak jauh.
 */
import { C } from '../core/palette.js';
import { WORLD } from '../core/world.js';

export const OUT_X = 3800;
const W = WORLD.w;
const GROUND = 760; // alas gedung
const RO = `stroke="${C.cocoa}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"`;
const RO3 = `stroke="${C.cocoa}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;
const FONT = 'font-family="Fredoka, sans-serif" font-weight="700"';

/** Waktu di kampung mengikuti jam perangkat: pagi/siang, sore, atau malam. */
export function timeOfDay(hour = new Date().getHours()) {
  if (hour >= 18 || hour < 5) return 'night';
  if (hour >= 16) return 'evening';
  return 'day';
}
const SKY = {
  day: ['#BFE0F2', '#FFF1D6'],
  evening: ['#F7C5A8', '#FCE38A'],
  night: ['#4B5A86', '#9C8FB8'],
};

export function outdoorDefs(tod = timeOfDay()) {
  const [top, bottom] = SKY[tod];
  return `<linearGradient id="out-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/>
    </linearGradient>`;
}

const shadow = (cx, rx, y = GROUND + 4) => `<ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="12" fill="${C.cocoa}" opacity="0.12"/>`;

function cloud(x, y, s = 1) {
  return `<path transform="translate(${x} ${y}) scale(${s})" d="M0 0 q12 -26 40 -18 q18 -24 46 -10 q30 -4 30 22 q20 6 12 24 h-118 q-24 -2 -10 -18 z" fill="#fff" ${RO3}/>`;
}

function lamp(x, glow = false) {
  return `<g>${shadow(x, 26, 772)}${glow ? `<circle cx="${x + 32}" cy="420" r="70" fill="#FFF6C9" opacity="0.35"/><ellipse cx="${x + 32}" cy="790" rx="80" ry="16" fill="#FFF6C9" opacity="0.5"/>` : ''}
    <rect x="${x - 7}" y="400" width="14" height="370" rx="6" fill="${C.cocoa}"/>
    <rect x="${x - 16}" y="748" width="32" height="22" rx="6" fill="${C.cocoa}"/>
    <path d="M${x} 400 q0 -30 30 -30" fill="none" stroke="${C.cocoa}" stroke-width="8" stroke-linecap="round"/>
    <path d="M${x + 12} 372 h40 l-8 26 h-24 z" fill="${C.butter}" ${RO3}/>
    <circle cx="${x + 32}" cy="400" r="7" fill="#FFF6C9" ${RO3}/>
  </g>`;
}

function bush(x, w = 120) {
  return `<path d="M${x} ${GROUND} q0 -50 ${w * 0.3} -50 q${w * 0.2} -28 ${w * 0.45} -6 q${w * 0.3} -10 ${w * 0.25} 56 z" fill="#8FCB9E" ${RO3}/>
    <circle cx="${x + w * 0.35}" cy="${GROUND - 34}" r="6" fill="${C.pinkHover}"/>`;
}

/** Langit, bukit, rumput, trotoar, dan jalan — menutup dinding/lantai kamar di bagian luar. */
export function outdoorBackground(tod = timeOfDay()) {
  const w = W - OUT_X;
  const clouds = [[4060, 110, 1], [4620, 60, 1.2], [5250, 120, 0.9], [5860, 70, 1.1]].map(([x, y, s]) => cloud(x, y, s)).join('');
  const tiles = Array.from({ length: Math.ceil(w / 90) }, (_, i) => `<path d="M${OUT_X + i * 90} 790 l-14 120" stroke="#D3C2AE" stroke-width="3"/>`).join('');
  const dashes = Array.from({ length: Math.ceil(w / 160) }, (_, i) => `<rect x="${OUT_X + 40 + i * 160}" y="962" width="80" height="10" rx="5" fill="#fff" opacity="0.9"/>`).join('');
  const lamps = [4410, 4935, 5455, 5975].map((x) => lamp(x, tod === 'night')).join('');
  return `<g id="outdoor-bg" class="is-${tod}">
    <rect x="${OUT_X}" y="0" width="${w}" height="${GROUND + 20}" fill="url(#out-sky)"/>
    ${tod === 'night'
    ? `<g class="stars">${[[4000, 60], [4300, 140], [4560, 40], [4880, 170], [5120, 70], [5600, 50], [5800, 150], [6100, 90], [6300, 40]].map(([x, y]) => `<path d="M${x} ${y - 8} l3 6 l7 1 l-5 5 l1 7 l-6 -3 l-6 3 l1 -7 l-5 -5 l7 -1 z" fill="#FFF6C9"/>`).join('')}</g>
       <circle cx="${OUT_X + 1460}" cy="80" r="44" fill="#FFF6C9" ${RO3}/><circle cx="${OUT_X + 1480}" cy="70" r="40" fill="#4B5A86"/>`
    : `<circle cx="${OUT_X + 1460}" cy="${tod === 'evening' ? 200 : 80}" r="54" fill="${tod === 'evening' ? '#F29A4A' : C.butter}" ${RO3}/>`}
    ${clouds}
    <path d="M${OUT_X} 560 Q${OUT_X + 400} 400 ${OUT_X + 800} 520 T${OUT_X + 1600} 500 T${W} 480 V${GROUND} H${OUT_X} Z" fill="#A9D6B6" ${RO3}/>
    <path d="M${OUT_X} 640 Q${OUT_X + 600} 540 ${OUT_X + 1200} 620 T${W} 600 V${GROUND} H${OUT_X} Z" fill="${C.mint}" ${RO3}/>
    <rect x="${OUT_X}" y="${GROUND}" width="${w}" height="150" fill="#EFE3D5" ${RO3}/>
    ${tiles}
    <rect x="${OUT_X}" y="905" width="${w}" height="20" fill="#D8C3B4" ${RO3}/>
    <rect x="${OUT_X}" y="925" width="${w}" height="80" fill="#B9B4C4"/>
    ${dashes}
    ${bush(4395 - 160, 110)}${bush(4900, 100)}${bush(5440 - 150, 120)}${bush(5960 - 140, 100)}
    ${lamps}
  </g>`;
}

/** Dinding ujung rumah dengan pintu terbuka (perbatasan dalam–luar). */
export function frontDoor() {
  const x = OUT_X - 60;
  return `<g id="front-door">
    <rect x="${x}" y="0" width="80" height="728" fill="${C.woodLight}" ${RO}/>
    <rect x="${x + 6}" y="300" width="68" height="428" rx="10" fill="#FFF1D6" ${RO3}/>
    <path d="M${x + 6} 300 L${x - 40} 320 L${x - 40} 728 L${x + 6} 728 Z" fill="${C.peach}" ${RO}/>
    <circle cx="${x - 26}" cy="520" r="7" fill="${C.butter}" ${RO3}/>
    <rect x="${x - 10}" y="250" width="100" height="40" rx="12" fill="#fff" ${RO3}/>
    <text x="${x + 40}" y="278" text-anchor="middle" ${FONT} font-size="22" fill="${C.cocoa}">Keluar</text>
    <rect x="${x + 2}" y="728" width="120" height="32" rx="6" fill="#D8C3B4" ${RO3}/>
  </g>`;
}

/* ── Bagian gedung ── */
function windowPane(x, y, w = 70, h = 84, color = '#D8EEF7', awning = null) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${color}" ${RO3}/>
    <path d="M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}" stroke="${C.cocoa}" stroke-width="2.5"/>
    <path d="M${x + 10} ${y + 12} l12 -0" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="0.8"/>
    <rect x="${x - 6}" y="${y + h}" width="${w + 12}" height="10" rx="4" fill="${C.woodLight}" ${RO3}/>
    ${awning ? `<path d="M${x - 8} ${y - 4} h${w + 16} l-8 22 h-${w} z" fill="${awning}" ${RO3}/>` : ''}`;
}
function door(cx, color = C.woodDeep, w = 120, h = 290) {
  const x = cx - w / 2, y = GROUND - h;
  return `<rect x="${x - 12}" y="${y - 12}" width="${w + 24}" height="${h + 12}" rx="${w / 2 + 12}" fill="${C.woodLight}" ${RO3}/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w / 2}" fill="${color}" ${RO3}/>
    <path d="M${cx} ${y + 6} V${GROUND}" stroke="${C.cocoa}" stroke-width="2.5"/>
    <circle cx="${cx - 14}" cy="${GROUND - h / 2}" r="6" fill="${C.butter}" ${RO3}/><circle cx="${cx + 14}" cy="${GROUND - h / 2}" r="6" fill="${C.butter}" ${RO3}/>
    <rect x="${x - 24}" y="${GROUND - 6}" width="${w + 48}" height="18" rx="6" fill="#D8C3B4" ${RO3}/>`;
}
function sign(x, y, text, color) {
  const w = text.length * 16 + 44;
  return `<rect x="${x - w / 2}" y="${y}" width="${w}" height="50" rx="16" fill="${color}" ${RO3}/>
    <text x="${x}" y="${y + 34}" text-anchor="middle" ${FONT} font-size="27" fill="${C.cocoa}">${text}</text>`;
}
function gable(x, w, top, eave, color) {
  return `<path d="M${x - 30} ${eave} L${x + w / 2} ${top} L${x + w + 30} ${eave} Z" fill="${color}" ${RO}/>
    <path d="M${x - 10} ${eave - 14} L${x + w / 2} ${top + 20} L${x + w + 10} ${eave - 14}" fill="none" stroke="#fff" stroke-width="5" opacity="0.5" stroke-linecap="round"/>`;
}
function wall(x, w, top, color = '#FFF9F2') {
  return `<rect x="${x}" y="${top}" width="${w}" height="${GROUND - top}" rx="14" fill="${color}" ${RO}/>
    <rect x="${x}" y="${GROUND - 40}" width="${w}" height="40" rx="6" fill="#EADBC9" ${RO3}/>`;
}

export const BUILDINGS = [
  { id: 'library', x: 3960, w: 420, label: 'Perpustakaan', anchor: 4170, color: C.sky },
  { id: 'market', x: 4480, w: 420, label: 'Pasar', anchor: 4690, color: C.peach },
  { id: 'park', x: 4990, w: 430, label: 'Taman Sains', anchor: 5205, color: C.mint },
  { id: 'museum', x: 5510, w: 430, label: 'Museum', anchor: 5725, color: C.butter },
  { id: 'school', x: 6020, w: 360, label: 'Sekolah Kelas 6', anchor: 6200, color: C.pink },
];

const BOOKS = [C.pink, C.mint, C.butter, C.peach, C.sky, C.pinkHover];

export function buildingArt(b) {
  const { x, w } = b;
  const cx = x + w / 2;
  const art = {
    library: shadow(cx, w / 2 + 30)
      + gable(x, w, 90, 230, C.sky) + wall(x, w, 230)
      + `<circle cx="${cx}" cy="175" r="26" fill="#fff" ${RO3}/>
         <path d="M${cx - 16} 166 q16 -8 16 4 q0 -12 16 -4 v22 q-16 -8 -16 4 q0 -12 -16 -4 z" fill="${C.sky}" ${RO3}/>`
      + windowPane(x + 36, 330) + windowPane(x + w - 106, 330)
      + door(cx, C.woodDeep, 116, 280)
      // kereta buku + papan "baca yuk"
      + `<g><rect x="${x + 22}" y="${GROUND - 96}" width="84" height="66" rx="8" fill="${C.wood}" ${RO3}/>
          ${[0, 1, 2, 3].map((i) => `<rect x="${x + 30 + i * 18}" y="${GROUND - 128 + (i % 2) * 6}" width="14" height="${34 - (i % 2) * 6}" rx="3" fill="${BOOKS[i]}" ${RO3}/>`).join('')}
          <circle cx="${x + 38}" cy="${GROUND - 24}" r="12" fill="${C.cocoa}"/><circle cx="${x + 92}" cy="${GROUND - 24}" r="12" fill="${C.cocoa}"/></g>`
      + `<g><rect x="${x + w - 92}" y="${GROUND - 120}" width="8" height="110" fill="${C.woodDeep}"/>
          <rect x="${x + w - 130}" y="${GROUND - 160}" width="84" height="52" rx="10" fill="#FFF1D6" ${RO3}/>
          <text x="${x + w - 88}" y="${GROUND - 128}" text-anchor="middle" ${FONT} font-size="18" fill="${C.cocoa}">Baca yuk!</text></g>`,

    market: shadow(cx, w / 2 + 30)
      + wall(x, w, 260, '#FFF4EA')
      + `<path d="M${x - 24} 236 h${w + 48} v20 h-${w + 48} z" fill="${C.woodDeep}" ${RO3}/>`
      + Array.from({ length: 8 }, (_, i) => {
        const sx = x - 24 + i * ((w + 48) / 8), sw = (w + 48) / 8;
        return `<path d="M${sx} 256 h${sw} v54 q-${sw / 2} 26 -${sw} 0 z" fill="${i % 2 ? '#fff' : C.peach}" ${RO3}/>`;
      }).join('')
      + windowPane(x + 34, 350, 80, 80, '#FFF1D6') + windowPane(x + w - 114, 350, 80, 80, '#FFF1D6')
      // lapak buah di depan
      + `<rect x="${x + 40}" y="${GROUND - 150}" width="${w - 80}" height="26" rx="8" fill="${C.wood}" ${RO3}/>
         <rect x="${x + 56}" y="${GROUND - 124}" width="${w - 112}" height="124" rx="6" fill="${C.woodLight}" ${RO3}/>
         <path d="M${x + 56} ${GROUND - 84} h${w - 112} M${x + 56} ${GROUND - 44} h${w - 112}" stroke="${C.wood}" stroke-width="4"/>`
      + [['#F29A4A', 0], [C.pinkHover, 1], [C.butter, 2], ['#8FCB9E', 3], ['#E46A6A', 4]].map(([col, i]) => {
        const bx = x + 70 + i * ((w - 140) / 5);
        return `<path d="M${bx} ${GROUND - 150} h${(w - 160) / 5} l-8 -30 h-${(w - 160) / 5 - 16} z" fill="#E9C9A4" ${RO3}/>`
          + [0, 1, 2].map((k) => `<circle cx="${bx + 14 + k * 18}" cy="${GROUND - 186 + (k % 2) * -8}" r="12" fill="${col}" ${RO3}/>`).join('');
      }).join('')
      + `<g><rect x="${x + w / 2 - 70}" y="${GROUND - 108}" width="140" height="40" rx="10" fill="#fff" ${RO3}/>
          <text x="${cx}" y="${GROUND - 81}" text-anchor="middle" ${FONT} font-size="20" fill="${C.cocoa}">Rp3.000</text></g>`,

    park: shadow(cx, w / 2 + 20)
      + `<path d="M${x} ${GROUND} q0 -70 ${w / 2} -80 q${w / 2} 10 ${w / 2} 80 z" fill="#9FD3AE" ${RO3}/>`
      + [[x + 70, 380, 100], [x + w - 70, 340, 120]].map(([tx, ty, r]) => `${shadow(tx, 50)}
          <path d="M${tx - 16} ${GROUND} q6 -${GROUND - ty - 60} 4 -${GROUND - ty - 40} h24 q-2 ${GROUND - ty - 100} 4 ${GROUND - ty - 40} z" fill="${C.wood}" ${RO3}/>
          <circle cx="${tx}" cy="${ty}" r="${r}" fill="${C.mint}" ${RO}/>
          <circle cx="${tx - r * 0.4}" cy="${ty + r * 0.2}" r="${r * 0.55}" fill="#8FCB9E" ${RO3}/>
          <circle cx="${tx + 30}" cy="${ty - 30}" r="11" fill="${C.pinkHover}" ${RO3}/><circle cx="${tx - 40}" cy="${ty - 10}" r="9" fill="${C.butter}" ${RO3}/>`).join('')
      // gerbang + teleskop + roket
      + `<path d="M${cx - 90} ${GROUND} V500 q90 -70 180 0 V${GROUND}" fill="none" stroke="${C.cocoa}" stroke-width="16" stroke-linecap="round"/>
         <path d="M${cx - 90} ${GROUND} V500 q90 -70 180 0 V${GROUND}" fill="none" stroke="${C.mint}" stroke-width="9" stroke-linecap="round"/>
         <g><path d="M${cx - 30} ${GROUND} l30 -90 l30 90" fill="none" stroke="${C.cocoa}" stroke-width="6" stroke-linecap="round"/>
           <rect x="${cx - 46}" y="${GROUND - 140}" width="92" height="34" rx="16" transform="rotate(-24 ${cx} ${GROUND - 122})" fill="${C.sky}" ${RO3}/>
           <circle cx="${cx}" cy="${GROUND - 96}" r="9" fill="${C.butter}" ${RO3}/></g>`,

    museum: shadow(cx, w / 2 + 34)
      + `<path d="M${x - 30} 260 L${cx} 130 L${x + w + 30} 260 Z" fill="${C.butter}" ${RO}/>
         <circle cx="${cx}" cy="215" r="22" fill="#fff" ${RO3}/><path d="M${cx} 199 v16 l10 8" stroke="${C.cocoa}" stroke-width="3" fill="none" stroke-linecap="round"/>
         <rect x="${x - 20}" y="258" width="${w + 40}" height="26" rx="6" fill="${C.woodLight}" ${RO3}/>`
      + wall(x + 10, w - 20, 284, '#FFF6E2')
      + [0, 1, 4, 5].map((i) => {
        const px = x + 26 + i * ((w - 72) / 5);
        return `<rect x="${px}" y="300" width="40" height="${GROUND - 360}" rx="8" fill="#fff" ${RO3}/>
          <rect x="${px - 6}" y="292" width="52" height="16" rx="4" fill="#FFF1D6" ${RO3}/>
          <path d="M${px + 13} 316 V${GROUND - 76} M${px + 27} 316 V${GROUND - 76}" stroke="#E6D6C2" stroke-width="3"/>`;
      }).join('')
      + door(cx, '#C98F5E', 130, 280)
      + `<rect x="${x - 20}" y="${GROUND - 40}" width="${w + 40}" height="20" rx="6" fill="#EADBC9" ${RO3}/>
         <rect x="${x - 40}" y="${GROUND - 20}" width="${w + 80}" height="24" rx="6" fill="#EADBC9" ${RO3}/>`,

    school: shadow(cx, w / 2 + 30)
      + gable(x, w, 110, 250, C.pink) + wall(x, w, 250)
      + `<circle cx="${cx}" cy="200" r="26" fill="#fff" ${RO3}/><text x="${cx}" y="211" text-anchor="middle" ${FONT} font-size="28" fill="${C.cocoa}">6</text>`
      + windowPane(x + 30, 340, 70, 84, '#FFF1D6') + windowPane(x + w - 100, 340, 70, 84, '#FFF1D6')
      + door(cx, C.woodDeep, 110, 270)
      // tiang bendera merah putih + papan "Buka" (kelas sudah bisa dimasuki)
      + `<rect x="${cx - 3}" y="30" width="6" height="84" fill="${C.cocoa}"/>
         <rect x="${cx + 3}" y="34" width="54" height="20" fill="#E46A6A" ${RO3}/><rect x="${cx + 3}" y="54" width="54" height="20" fill="#fff" ${RO3}/>
         <g transform="translate(${cx} ${GROUND - 168})"><path d="M-30 -14 L0 -34 L30 -14" fill="none" stroke="${C.cocoa}" stroke-width="3" stroke-linecap="round"/>
           <rect x="-44" y="-14" width="88" height="36" rx="10" fill="${C.mint}" ${RO3}/>
           <text x="0" y="12" text-anchor="middle" ${FONT} font-size="20" fill="${C.cocoa}">Buka</text></g>`,
  }[b.id];
  const signY = { library: 250, market: 186, park: 420, museum: 300, school: 270 }[b.id];
  return `<g class="hotspot__art">${art}${sign(cx, signY, b.label, b.color)}</g>`;
}

/* ── Kehidupan kampung: warga lewat, kucing, burung (animasi CSS, lihat room.css) ── */
function villager(skin, hair, shirt, skirt) {
  return `<g class="villager__body">
    <ellipse cx="0" cy="2" rx="40" ry="8" fill="${C.cocoa}" opacity="0.12"/>
    <rect class="leg leg--a" x="-14" y="-60" width="12" height="58" rx="6" fill="${skin}" ${RO3}/>
    <rect class="leg leg--b" x="2" y="-60" width="12" height="58" rx="6" fill="${skin}" ${RO3}/>
    <path d="M-30 -60 q30 14 60 0 l-8 -66 h-44 z" fill="${skirt}" ${RO3}/>
    <rect x="-24" y="-150" width="48" height="56" rx="18" fill="${shirt}" ${RO3}/>
    <circle cx="0" cy="-190" r="46" fill="${skin}" ${RO3}/>
    <path d="M-46 -190 q0 -50 46 -50 q46 0 46 50 q-20 -26 -46 -24 q-26 -2 -46 24 z" fill="${hair}" ${RO3}/>
    <circle cx="-15" cy="-186" r="5" fill="${C.cocoa}"/><circle cx="15" cy="-186" r="5" fill="${C.cocoa}"/>
    <ellipse cx="-26" cy="-172" rx="7" ry="4" fill="${C.pink}" opacity="0.7"/><ellipse cx="26" cy="-172" rx="7" ry="4" fill="${C.pink}" opacity="0.7"/>
    <path d="M-7 -170 q7 6 14 0" fill="none" stroke="${C.cocoa}" stroke-width="3" stroke-linecap="round"/>
  </g>`;
}

export function villageLife() {
  const bird = (d) => `<path d="M0 0 q12 -12 24 0 q12 -12 24 0" fill="none" stroke="${C.cocoa}" stroke-width="4" stroke-linecap="round" style="animation-delay:${d}s"/>`;
  return `<g id="village-life" pointer-events="none" aria-hidden="true">
    <g class="birds">${bird(0)}<g transform="translate(60 26)">${bird(0.3)}</g><g transform="translate(-50 34)">${bird(0.6)}</g></g>
    <g class="villager villager--a" style="--y:820px">${villager('#F3CFB3', '#5B3A2E', C.sky, C.woodDeep)}</g>
    <g class="villager villager--b" style="--y:828px">${villager('#D9A57E', '#2F2422', C.mint, '#B37FA0')}</g>
    <g class="stray-cat"><g transform="scale(0.55)">
      <ellipse cx="0" cy="0" rx="50" ry="8" fill="${C.cocoa}" opacity="0.12"/>
      <path d="M-50 -20 q0 -40 50 -40 q46 0 48 40 z" fill="#F29A4A" ${RO3}/>
      <circle cx="56" cy="-60" r="30" fill="#F29A4A" ${RO3}/>
      <path d="M36 -82 l4 -24 l16 16 z M64 -88 l12 -18 l6 22 z" fill="#F29A4A" ${RO3}/>
      <circle cx="66" cy="-62" r="4" fill="${C.cocoa}"/>
      <path d="M-50 -30 q-40 -10 -36 -50" fill="none" stroke="${C.cocoa}" stroke-width="13" stroke-linecap="round"/>
      <path d="M-50 -30 q-40 -10 -36 -50" fill="none" stroke="#F29A4A" stroke-width="7" stroke-linecap="round"/>
      <rect x="-40" y="-22" width="10" height="22" rx="4" fill="#F29A4A" ${RO3}/><rect x="20" y="-22" width="10" height="22" rx="4" fill="#F29A4A" ${RO3}/>
    </g></g>
  </g>`;
}
