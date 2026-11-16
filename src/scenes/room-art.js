/**
 * Ilustrasi kamar (inline SVG). Kanvas: viewBox 0 0 WORLD.w × 1000 (lebih lebar dari layar → digeser), garis lantai y = 728.
 * Setiap benda adalah fungsi kecil yang mengembalikan string SVG agar mudah
 * dipindah, diganti, atau dijadikan hotspot.
 */
import { C } from '../core/palette.js';
import { SUBJECTS } from '../data/subjects.js';
import { limb } from '../character/parts.js';

/** Outline versi kamar: sedikit lebih tebal karena kanvasnya diperkecil di layar. */
const RO = `stroke="${C.cocoa}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"`;
const RO3 = `stroke="${C.cocoa}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;
import { WORLD } from '../core/world.js';

export { WORLD };
const FLOOR_Y = WORLD.floorY;
const W = WORLD.w;

export function defs() {
  return `<defs>
    <pattern id="wall-dots" width="64" height="64" patternUnits="userSpaceOnUse">
      <circle cx="16" cy="16" r="3.5" fill="${C.linen}"/><circle cx="48" cy="48" r="3.5" fill="${C.linen}"/>
    </pattern>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#C9E4F3"/><stop offset="1" stop-color="#FFF1D6"/>
    </linearGradient>
    <linearGradient id="beam" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#FFF4D2" stop-opacity="0.75"/><stop offset="1" stop-color="#FFF4D2" stop-opacity="0.05"/>
    </linearGradient>
    <radialGradient id="glow" gradientUnits="userSpaceOnUse" cx="230" cy="280" r="1500">
      <stop offset="0" stop-color="rgb(255,236,195)" stop-opacity="0.45"/><stop offset="1" stop-color="rgb(255,236,195)" stop-opacity="0"/>
    </radialGradient>
  </defs>`;
}

export function background() {
  const panels = Array.from({ length: Math.ceil(W / 200) }, (_, i) => `<rect x="${30 + i * 200}" y="556" width="160" height="128" rx="16" fill="none" stroke="#DCC8B7" stroke-width="4"/>`).join('');
  const seams = Array.from({ length: Math.ceil(W / 220) * 2 }, (_, i) => {
    const row = i % 2;
    const x = 180 + Math.floor(i / 2) * 440 + row * 220;
    const [y1, y2] = row ? [880, 960] : [800, 880];
    return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${C.floorLine}" stroke-width="4" stroke-linecap="round"/>`;
  }).join('');
  return `<g id="room-background">
    <rect width="${W}" height="${FLOOR_Y}" fill="${C.wall}"/>
    <rect width="${W}" height="520" fill="url(#wall-dots)"/>
    <rect y="520" width="${W}" height="${FLOOR_Y - 520}" fill="${C.molding}"/>
    ${panels}
    <rect x="-10" y="506" width="${W + 20}" height="18" rx="8" fill="${C.woodLight}" ${RO}/>
    <rect y="${FLOOR_Y}" width="${W}" height="${1000 - FLOOR_Y}" fill="${C.floor}"/>
    <path d="M0 800 H${W} M0 880 H${W} M0 960 H${W}" stroke="${C.floorLine}" stroke-width="4"/>
    ${seams}
    <rect x="-10" y="702" width="${W + 20}" height="28" rx="8" fill="${C.woodLight}" ${RO}/>
  </g>`;
}

export function bunting() {
  const p0 = [690, 70], p1 = [900, 160], p2 = [1110, 70];
  const at = (t) => [0, 1].map((k) => (1 - t) ** 2 * p0[k] + 2 * (1 - t) * t * p1[k] + t ** 2 * p2[k]);
  const colors = [C.pink, C.butter, C.mint, C.sky, C.peach];
  const flags = Array.from({ length: 6 }, (_, i) => {
    const t = 0.1 + i * 0.16;
    const [x, y] = at(t);
    return `<path d="M${x - 24} ${y} L${x + 24} ${y} L${x} ${y + 50} Z" fill="${colors[i % colors.length]}" ${RO3}/>`;
  }).join('');
  return `<g id="room-bunting" class="sway">
    <path d="M${p0} Q${p1} ${p2}" fill="none" stroke="${C.cocoa}" stroke-width="3.5" stroke-linecap="round"/>
    ${flags}
  </g>`;
}

export function windowArt() {
  return `<g id="room-window">
    <rect x="40" y="96" width="370" height="14" rx="7" fill="${C.wood}" ${RO3}/>
    <rect x="80" y="122" width="290" height="330" rx="20" fill="${C.woodLight}" ${RO}/>
    <rect x="100" y="142" width="250" height="290" rx="10" fill="url(#sky)" ${RO3}/>
    <circle cx="168" cy="204" r="30" fill="${C.butter}" ${RO3}/>
    <path d="M250 262 Q252 240 274 242 Q284 224 306 232 Q326 230 328 250 Q342 254 338 268 L256 270 Q244 270 250 262 Z" fill="#fff" ${RO3}/>
    <path d="M100 380 Q170 340 230 372 Q290 338 350 368 V432 H100 Z" fill="${C.mint}" ${RO3}/>
    <rect x="219" y="142" width="12" height="290" fill="${C.woodLight}" ${RO3}/>
    <rect x="100" y="281" width="250" height="12" fill="${C.woodLight}" ${RO3}/>
    <rect x="62" y="444" width="326" height="24" rx="10" fill="${C.wood}" ${RO}/>
    <!-- pot kecil di ambang jendela -->
    <path d="M298 444 L304 410 H342 L348 444 Z" fill="${C.peach}" ${RO3}/>
    <path d="M323 410 C310 392 300 386 296 372 C310 372 320 382 323 396 C324 380 332 366 346 360 C346 378 338 392 323 410 Z" fill="${C.mint}" ${RO3}/>
    <!-- gorden -->
    <path d="M44 104 C60 104 92 106 104 106 C100 220 120 300 138 360 C120 380 100 382 84 372 C74 470 70 520 66 540 Q50 548 40 540 Z" fill="${C.pink}" ${RO}/>
    <path d="M406 104 C390 104 358 106 346 106 C350 220 330 300 312 360 C330 380 350 382 366 372 C376 470 380 520 384 540 Q400 548 410 540 Z" fill="${C.pink}" ${RO}/>
    <rect x="72" y="358" width="54" height="16" rx="8" fill="${C.butter}" ${RO3}/>
    <rect x="324" y="358" width="54" height="16" rx="8" fill="${C.butter}" ${RO3}/>
  </g>`;
}

/** Bingkai kebun teh & gunung — sentuhan Jawa Barat. */
export function frameArt() {
  return `<g id="room-frame">
    <line x1="900" y1="196" x2="864" y2="226" stroke="${C.cocoa}" stroke-width="3"/><line x1="900" y1="196" x2="936" y2="226" stroke="${C.cocoa}" stroke-width="3"/>
    <circle cx="900" cy="196" r="6" fill="${C.butterDeep}" ${RO3}/>
    <rect x="788" y="226" width="224" height="160" rx="14" fill="${C.wood}" ${RO}/>
    <rect x="806" y="244" width="188" height="124" rx="6" fill="#FFF1D6" ${RO3}/>
    <circle cx="950" cy="276" r="14" fill="${C.peach}"/>
    <path d="M806 336 Q840 296 872 292 L934 290 Q962 304 994 330 V368 H806 Z" fill="#9CCBB0" ${RO3}/>
    <path d="M806 350 Q850 334 900 348 T994 344 V368 H806 Z" fill="${C.mint}" ${RO3}/>
    <path d="M816 360 Q850 350 884 360 M904 358 Q940 348 984 358" fill="none" stroke="#86BE9B" stroke-width="3" stroke-linecap="round"/>
  </g>`;
}

/** Bayangan kontak datar (tanpa blur) agar benda "menapak" lantai. */
export function contactShadows() {
  return `<g id="room-shadows" fill="${C.cocoa}" opacity="0.08">
    <ellipse cx="530" cy="724" rx="140" ry="14"/>
    <ellipse cx="1245" cy="724" rx="150" ry="14"/>
    <ellipse cx="1440" cy="722" rx="56" ry="10"/>
    <ellipse cx="1640" cy="726" rx="160" ry="14"/>
    <ellipse cx="2225" cy="726" rx="250" ry="14"/>
    <ellipse cx="2540" cy="724" rx="70" ry="10"/>
    <ellipse cx="2920" cy="724" rx="70" ry="10"/>
    <ellipse cx="3350" cy="726" rx="250" ry="14"/>
  </g>`;
}

export function bookshelf() {
  const rows = [
    { base: 340, items: [0, 1, 2, 3], widths: [28, 24, 32, 26], heights: [88, 76, 94, 72] },
    { base: 456, items: [4, 5, 6], widths: [30, 26, 28], heights: [84, 92, 78] },
    { base: 572, items: [7, 8], widths: [30, 28], heights: [90, 80] },
  ];
  const spines = rows.map((row) => {
    let x = 442;
    return row.items.map((subjectIndex, i) => {
      const w = row.widths[i];
      const h = row.heights[i];
      const color = SUBJECTS[subjectIndex].color;
      const s = `<rect x="${x}" y="${row.base - h}" width="${w}" height="${h}" rx="5" fill="${color}" ${RO3}/>`
        + `<line x1="${x + 6}" y1="${row.base - h + 14}" x2="${x + w - 6}" y2="${row.base - h + 14}" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>`;
      x += w + 4;
      return s;
    }).join('');
  }).join('');

  return `<g class="hotspot__art">
    <rect x="410" y="214" width="240" height="500" rx="18" fill="${C.wood}" ${RO}/>
    <rect x="430" y="236" width="200" height="458" rx="10" fill="${C.woodDeep}" ${RO3}/>
    ${spines}
    <!-- buku miring & pernik -->
    <rect x="566" y="270" width="26" height="70" rx="5" fill="${C.linen}" ${RO3} transform="rotate(14 566 340)"/>
    <path d="M574 456 L578 420 H614 L618 456 Z" fill="${C.peach}" ${RO3}/>
    <path d="M596 420 C588 404 590 392 596 384 C602 392 604 404 596 420 Z M586 418 C578 410 576 402 578 396 C586 400 590 408 590 418 Z" fill="${C.mint}" ${RO3}/>
    <rect x="530" y="534" width="80" height="16" rx="5" fill="${C.sky}" ${RO3}/>
    <rect x="536" y="518" width="70" height="16" rx="5" fill="${C.pink}" ${RO3}/>
    <rect x="542" y="502" width="60" height="16" rx="5" fill="${C.butter}" ${RO3}/>
    <!-- keranjang anyaman di rak bawah -->
    <rect x="446" y="610" width="168" height="72" rx="14" fill="${C.woodLight}" ${RO3}/>
    <path d="M460 628 H600 M460 646 H600 M460 664 H600" stroke="${C.wood}" stroke-width="4" stroke-linecap="round"/>
    ${[340, 456, 572].map((y) => `<rect x="422" y="${y}" width="216" height="14" rx="6" fill="${C.woodLight}" ${RO3}/>`).join('')}
    <rect x="424" y="708" width="26" height="16" rx="5" fill="${C.woodDeep}" ${RO3}/>
    <rect x="610" y="708" width="26" height="16" rx="5" fill="${C.woodDeep}" ${RO3}/>
    <!-- di atas rak -->
    <rect x="432" y="196" width="76" height="18" rx="5" fill="${C.sky}" ${RO3}/>
    <rect x="440" y="178" width="62" height="18" rx="5" fill="${C.peach}" ${RO3}/>
    <path d="M582 214 L588 180 H630 L636 214 Z" fill="${C.pink}" ${RO3}/>
    <path d="M609 180 C590 160 584 140 590 124 C606 134 612 156 609 180 Z M609 180 C620 154 636 142 652 142 C648 162 632 176 609 180 Z" fill="${C.mint}" ${RO3}/>
  </g>`;
}

export function wardrobe() {
  const tinyClothes = [
    [1258, C.pink], [1286, C.sky], [1314, C.mint],
  ].map(([x, color]) => `<path d="M${x} 290 L${x - 4} 300" stroke="${C.cocoa}" stroke-width="3" stroke-linecap="round"/>`
    + `<path d="M${x - 14} 304 Q${x} 296 ${x + 14} 304 L${x + 16} 380 Q${x} 388 ${x - 16} 380 Z" fill="${color}" ${RO3}/>`).join('');

  return `<g class="hotspot__art">
    <rect x="1120" y="232" width="230" height="482" rx="16" fill="${C.woodLight}" ${RO}/>
    <rect x="1110" y="210" width="250" height="30" rx="12" fill="${C.wood}" ${RO}/>
    <!-- pintu kiri -->
    <rect x="1136" y="252" width="96" height="430" rx="12" fill="${C.peach}" ${RO}/>
    <path d="M1184 352 C1166 336 1160 320 1172 314 C1178 311 1184 316 1184 320 C1184 316 1190 311 1196 314 C1208 320 1202 336 1184 352 Z" fill="${C.pink}" ${RO3}/>
    <rect x="1152" y="420" width="64" height="200" rx="10" fill="none" stroke="#E9AE8E" stroke-width="4"/>
    <circle cx="1220" cy="470" r="8" fill="${C.butter}" ${RO3}/>
    <!-- isi lemari yang terbuka -->
    <rect x="1238" y="252" width="96" height="430" rx="10" fill="#CDA68A" ${RO}/>
    <line x1="1244" y1="292" x2="1328" y2="292" stroke="${C.cocoa}" stroke-width="4.5" stroke-linecap="round"/>
    ${tinyClothes}
    <rect x="1246" y="540" width="80" height="14" rx="5" fill="${C.woodLight}" ${RO3}/>
    <rect x="1252" y="512" width="30" height="28" rx="6" fill="${C.sky}" ${RO3}/>
    <rect x="1288" y="518" width="30" height="22" rx="6" fill="${C.butter}" ${RO3}/>
    <path d="M1252 668 Q1252 650 1268 650 L1276 650 Q1282 660 1282 668 Z M1290 668 Q1290 650 1306 650 L1314 650 Q1320 660 1320 668 Z" fill="${C.pink}" ${RO3}/>
    <!-- pintu kanan terbuka -->
    <path d="M1334 252 L1386 236 L1386 698 L1334 682 Z" fill="${C.peach}" ${RO}/>
    <circle cx="1372" cy="470" r="7" fill="${C.butter}" ${RO3}/>
    <rect x="1132" y="708" width="26" height="16" rx="5" fill="${C.wood}" ${RO3}/>
    <rect x="1312" y="708" width="26" height="16" rx="5" fill="${C.wood}" ${RO3}/>
    <!-- manekin -->
    <ellipse cx="1440" cy="716" rx="42" ry="10" fill="${C.woodLight}" ${RO3}/>
    ${limb(1440, 598, 1440, 710, 6, C.woodDeep)}
    <rect x="1430" y="420" width="20" height="24" rx="6" fill="${C.woodLight}" ${RO3}/>
    <path d="M1404 452 Q1440 436 1476 452 Q1484 500 1468 530 Q1490 570 1478 604 Q1440 616 1402 604 Q1390 570 1412 530 Q1396 500 1404 452 Z" fill="${C.linen}" ${RO}/>
    <path d="M1408 456 Q1440 446 1474 456 L1470 478 Q1440 470 1410 478 Z" fill="${C.pink}" ${RO3}/>
    <path d="M1420 474 Q1416 520 1430 560" fill="none" stroke="${C.butterDeep}" stroke-width="5" stroke-dasharray="2 9" stroke-linecap="round"/>
    <circle cx="1440" cy="416" r="9" fill="${C.wood}" ${RO3}/>
  </g>`;
}

export function desk() {
  return `<g class="hotspot__art">
    <rect x="1514" y="582" width="20" height="138" rx="6" fill="${C.woodDeep}" ${RO3}/>
    <rect x="1660" y="582" width="108" height="138" rx="10" fill="${C.woodLight}" ${RO}/>
    <rect x="1672" y="596" width="84" height="52" rx="8" fill="${C.woodLight}" ${RO3}/>
    <rect x="1672" y="656" width="84" height="52" rx="8" fill="${C.woodLight}" ${RO3}/>
    <circle cx="1714" cy="622" r="6" fill="${C.pink}" ${RO3}/><circle cx="1714" cy="682" r="6" fill="${C.pink}" ${RO3}/>
    <rect x="1500" y="560" width="282" height="26" rx="10" fill="${C.wood}" ${RO}/>
    <!-- komputer -->
    <rect x="1598" y="516" width="24" height="36" fill="${C.woodLight}" ${RO3}/>
    <rect x="1570" y="546" width="80" height="16" rx="8" fill="${C.woodLight}" ${RO3}/>
    <rect x="1520" y="376" width="180" height="144" rx="18" fill="${C.card}" ${RO}/>
    <rect x="1536" y="392" width="148" height="106" rx="10" fill="${C.sky}" ${RO3}/>
    <rect x="1550" y="406" width="60" height="15" rx="7.5" fill="${C.pink}" ${RO3}/>
    <rect x="1566" y="428" width="82" height="15" rx="7.5" fill="${C.butter}" ${RO3}/>
    <rect x="1566" y="450" width="56" height="15" rx="7.5" fill="${C.mint}" ${RO3}/>
    <rect x="1550" y="472" width="40" height="15" rx="7.5" fill="${C.peach}" ${RO3}/>
    <rect class="cursor-blink" x="1598" y="472" width="6" height="15" rx="3" fill="${C.cocoa}"/>
    <circle cx="1610" cy="509" r="3.5" fill="${C.mint}" stroke="${C.cocoa}" stroke-width="2"/>
    <!-- gelas pensil -->
    <path d="M1508 520 L1514 512 L1520 520 M1524 516 L1528 506 L1534 516" fill="${C.butter}" ${RO3}/>
    <rect x="1504" y="518" width="34" height="42" rx="8" fill="${C.pink}" ${RO3}/>
    <!-- lampu meja -->
    <ellipse cx="1752" cy="556" rx="24" ry="8" fill="${C.woodLight}" ${RO3}/>
    ${limb(1752, 552, 1736, 488, 5, C.woodLight)}
    ${limb(1736, 488, 1756, 446, 5, C.woodLight)}
    <path d="M1736 432 Q1756 412 1782 434 L1772 468 Q1748 462 1730 456 Z" fill="${C.butter}" ${RO}/>
    <!-- kursi -->
    ${limb(1630, 694, 1630, 728, 8, C.woodDeep)}
    <path d="M1590 742 L1630 728 L1670 742" fill="none" stroke="${C.cocoa}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="1578" y="598" width="104" height="86" rx="26" fill="${C.pink}" ${RO}/>
    <path d="M1604 624 H1656" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="0.7"/>
    <rect x="1566" y="672" width="128" height="26" rx="13" fill="${C.pinkHover}" ${RO}/>
  </g>`;
}

export function rugBase() {
  return `<g id="room-rug">
    <ellipse cx="900" cy="878" rx="340" ry="84" fill="${C.peach}" ${RO}/>
    <ellipse cx="900" cy="878" rx="292" ry="64" fill="none" stroke="${C.card}" stroke-width="7" stroke-dasharray="1 20" stroke-linecap="round"/>
    <ellipse cx="900" cy="878" rx="220" ry="42" fill="#F9D6C1"/>
  </g>`;
}

export function teddy() {
  return `<g class="hotspot__art">
    <!-- boneka beruang -->
    <g id="decor-teddy">
      <ellipse cx="652" cy="858" rx="38" ry="32" fill="${C.wood}" ${RO3}/>
      <circle cx="628" cy="886" r="13" fill="${C.wood}" ${RO3}/><circle cx="676" cy="886" r="13" fill="${C.wood}" ${RO3}/>
      <circle cx="630" cy="790" r="12" fill="${C.wood}" ${RO3}/><circle cx="674" cy="790" r="12" fill="${C.wood}" ${RO3}/>
      <circle cx="652" cy="814" r="30" fill="${C.wood}" ${RO3}/>
      <ellipse cx="652" cy="824" rx="12" ry="9" fill="${C.woodLight}" ${RO3}/>
      <circle cx="652" cy="820" r="3.5" fill="${C.cocoa}"/>
      <circle cx="641" cy="808" r="3.5" fill="${C.cocoa}"/><circle cx="663" cy="808" r="3.5" fill="${C.cocoa}"/>
      <path d="M652 846 L640 838 L640 854 Z M652 846 L664 838 L664 854 Z" fill="${C.sky}" ${RO3}/>
    </g>
  </g>`;
}

/** Mochi si kucing mentor. viewBox lokal 0 0 160 150. */
export function mochiSvg({ eyesClosed = false } = {}) {
  const cream = '#FFF6EA';
  const eye = (x) => eyesClosed
    ? `<path d="M${x - 7} 64 Q${x} 56 ${x + 7} 64" fill="none" stroke="${C.eye}" stroke-width="3.5" stroke-linecap="round"/>`
    : `<ellipse cx="${x}" cy="62" rx="5.5" ry="6.5" fill="${C.eye}"/><circle cx="${x - 2}" cy="59.5" r="2" fill="#fff"/>`;
  return `<g class="mochi-figure">
    <path d="M118 124 C150 122 156 88 138 74" fill="none" stroke="${C.cocoa}" stroke-width="16" stroke-linecap="round"/>
    <path d="M118 124 C150 122 156 88 138 74" fill="none" stroke="${cream}" stroke-width="10" stroke-linecap="round"/>
    <path d="M40 134 C34 98 50 74 80 74 C110 74 126 98 120 134 Q80 144 40 134 Z" fill="${cream}" ${RO3}/>
    <ellipse cx="66" cy="136" rx="11" ry="7" fill="${cream}" ${RO3}/><ellipse cx="94" cy="136" rx="11" ry="7" fill="${cream}" ${RO3}/>
    <path d="M44 46 L46 14 L72 32 Z" fill="${cream}" ${RO3}/><path d="M50 38 L51 24 L62 32 Z" fill="${C.pink}"/>
    <path d="M116 46 L114 14 L88 32 Z" fill="${cream}" ${RO3}/><path d="M110 38 L109 24 L98 32 Z" fill="${C.pink}"/>
    <ellipse cx="80" cy="62" rx="44" ry="38" fill="${cream}" ${RO3}/>
    <path d="M98 30 Q118 36 121 56 Q106 54 96 42 Z" fill="${C.peach}"/>
    ${eye(64)}${eye(96)}
    <ellipse cx="53" cy="74" rx="7" ry="4" fill="${C.blush}" opacity="0.6"/><ellipse cx="107" cy="74" rx="7" ry="4" fill="${C.blush}" opacity="0.6"/>
    <path d="M77 70 L83 70 L80 74 Z" fill="${C.pinkHover}"/>
    <path d="M74 77 Q77 81 80 77 Q83 81 86 77" fill="none" stroke="${C.cocoa}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M30 66 L46 68 M30 76 L46 74 M130 66 L114 68 M130 76 L114 74" stroke="${C.cocoa}" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
    <path d="M56 96 Q80 106 104 96" fill="none" stroke="${C.pink}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="80" cy="103" r="6" fill="${C.butter}" ${RO3}/>
  </g>`;
}

export function sunbeams() {
  return `<g id="room-sunlight" pointer-events="none">
    <polygon class="beam" points="118,150 210,150 720,1000 470,1000" fill="url(#beam)"/>
    <polygon class="beam beam--late" points="242,150 332,150 1030,1000 800,1000" fill="url(#beam)"/>
    <rect width="${W}" height="1000" fill="url(#glow)"/>
  </g>`;
}

/** Label stiker. Lebarnya disesuaikan setelah teks diukur (lihat room.js). */
export function tag(x, y, text) {
  return `<g class="tag" transform="translate(${x} ${y})">
    <rect class="tag__shadow" x="-80" y="-24" width="160" height="52" rx="26" fill="${C.shadowSoft}"/>
    <rect class="tag__bg" x="-80" y="-30" width="160" height="52" rx="26" fill="#fff" ${RO}/>
    <text class="tag__text" x="0" y="5" text-anchor="middle">${text}</text>
  </g>`;
}

/* ───────── Pojok santai (sisi kanan dunia, x 1900–3000) ───────── */

export function bed() {
  const hearts = [[2210, 624], [2290, 640], [2370, 622], [2250, 660], [2340, 664]]
    .map(([x, y]) => `<path d="M${x} ${y + 7} C${x - 10} ${y} ${x - 8} ${y - 8} ${x} ${y - 3} C${x + 8} ${y - 8} ${x + 10} ${y} ${x} ${y + 7} Z" fill="#fff" opacity="0.85"/>`).join('');
  return `<g class="hotspot__art">
    <rect x="2028" y="696" width="24" height="28" rx="6" fill="${C.woodDeep}" ${RO3}/>
    <rect x="2398" y="696" width="24" height="28" rx="6" fill="${C.woodDeep}" ${RO3}/>
    <rect x="1990" y="470" width="50" height="252" rx="22" fill="${C.wood}" ${RO}/>
    <circle cx="2015" cy="462" r="16" fill="${C.butter}" ${RO3}/>
    <rect x="2424" y="572" width="42" height="150" rx="18" fill="${C.wood}" ${RO}/>
    <rect x="2024" y="648" width="420" height="52" rx="14" fill="${C.woodLight}" ${RO}/>
    <rect x="2034" y="602" width="398" height="54" rx="20" fill="${C.card}" ${RO}/>
    <path d="M2046 600 C2040 576 2062 566 2090 570 C2122 566 2142 578 2136 600 C2140 618 2120 626 2090 622 C2060 626 2040 618 2046 600 Z" fill="#fff" ${RO3}/>
    <path d="M2154 590 Q2292 572 2434 592 L2434 672 Q2292 694 2154 672 Z" fill="${C.pink}" ${RO}/>
    ${hearts}
    <path d="M2154 600 Q2168 636 2154 672" fill="none" stroke="${C.pinkHover}" stroke-width="5" stroke-linecap="round"/>
  </g>`;
}

export function nightstand() {
  return `<g id="room-nightstand">
    <rect x="2494" y="604" width="104" height="118" rx="12" fill="${C.woodLight}" ${RO}/>
    <rect x="2506" y="622" width="80" height="40" rx="8" fill="${C.woodLight}" ${RO3}/>
    <circle cx="2546" cy="642" r="6" fill="${C.mint}" ${RO3}/>
    <ellipse cx="2546" cy="600" rx="26" ry="8" fill="${C.wood}" ${RO3}/>
    ${limb(2546, 598, 2546, 552, 5, C.woodDeep)}
    <circle cx="2546" cy="520" r="62" fill="${C.butter}" opacity="0.25"/>
    <path d="M2516 552 L2524 506 H2568 L2576 552 Z" fill="${C.butter}" ${RO}/>
  </g>`;
}

export function roundWindow() {
  return `<g id="room-round-window">
    <circle cx="2780" cy="300" r="132" fill="${C.woodLight}" ${RO}/>
    <circle cx="2780" cy="300" r="108" fill="url(#sky)" ${RO3}/>
    <path d="M2700 330 Q2730 300 2770 318 Q2810 290 2860 320 V370 Q2780 420 2700 370 Z" fill="${C.mint}" opacity="0.9"/>
    <path d="M2732 250 Q2734 232 2752 234 Q2760 220 2778 226 Q2794 224 2796 240 Q2808 244 2804 256 L2738 258 Q2728 258 2732 250 Z" fill="#fff" ${RO3}/>
    <path d="M2780 192 V408 M2672 300 H2888" stroke="${C.woodLight}" stroke-width="12"/>
    <path d="M2780 192 V408 M2672 300 H2888" stroke="${C.cocoa}" stroke-width="3" opacity="0.5"/>
    <path d="M2636 176 Q2780 248 2924 176 L2924 150 L2636 150 Z" fill="${C.sky}" ${RO}/>
    <path d="M2660 178 Q2672 196 2690 190 M2870 190 Q2888 196 2900 178" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
  </g>`;
}

export function floorPlant() {
  return `<g id="room-floor-plant">
    <path d="M2880 640 C2850 560 2856 480 2900 430 C2920 500 2916 580 2896 640 Z" fill="${C.mint}" ${RO3}/>
    <path d="M2910 640 C2930 540 2980 490 3020 480 C3004 560 2960 620 2920 644 Z" fill="#8FC9A4" ${RO3}/>
    <path d="M2896 644 C2860 600 2810 590 2780 600 C2808 640 2852 654 2896 650 Z" fill="#8FC9A4" ${RO3}/>
    <path d="M2868 640 H2972 L2958 722 H2882 Z" fill="${C.peach}" ${RO}/>
    <rect x="2860" y="628" width="120" height="20" rx="8" fill="${C.wood}" ${RO3}/>
  </g>`;
}

export function rug2() {
  return `<g id="room-rug2">
    <ellipse cx="2250" cy="880" rx="250" ry="56" fill="#CFE6D7" ${RO}/>
    <ellipse cx="2250" cy="880" rx="200" ry="40" fill="none" stroke="#fff" stroke-width="6" stroke-dasharray="18 14" stroke-linecap="round"/>
  </g>`;
}

/* ───────── Pojok belajar (x 3080–3700): meja belajar & papan tulis ───────── */

export function studyBoard() {
  return `<g id="room-study-board">
    <rect x="3170" y="200" width="330" height="210" rx="18" fill="${C.wood}" ${RO}/>
    <rect x="3188" y="218" width="294" height="174" rx="8" fill="#5E8C74" ${RO3}/>
    <text x="3218" y="282" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="#fff">1 + 2 = 3</text>
    <text x="3218" y="350" font-family="Fredoka, sans-serif" font-weight="600" font-size="40" fill="${C.butter}">A B C</text>
    <path d="M3400 330 L3412 352 L3436 354 L3418 370 L3423 394 L3400 382 L3377 394 L3382 370 L3364 354 L3388 352 Z" fill="${C.pink}" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>
    <rect x="3300" y="404" width="70" height="12" rx="5" fill="${C.woodLight}" ${RO3}/>
    <rect x="3312" y="396" width="22" height="8" rx="3" fill="#fff" stroke="${C.cocoa}" stroke-width="2"/>
  </g>`;
}

export function studyDesk() {
  return `<g class="hotspot__art">
    <!-- kursi di belakang meja -->
    <rect x="3290" y="520" width="120" height="96" rx="28" fill="${C.sky}" ${RO}/>
    <path d="M3318 548 H3382" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="0.7"/>
    <!-- meja -->
    <rect x="3140" y="590" width="20" height="132" rx="6" fill="${C.woodDeep}" ${RO3}/>
    <rect x="3540" y="590" width="20" height="132" rx="6" fill="${C.woodDeep}" ${RO3}/>
    <rect x="3420" y="590" width="118" height="110" rx="10" fill="${C.woodLight}" ${RO}/>
    <rect x="3432" y="604" width="94" height="38" rx="8" fill="${C.woodLight}" ${RO3}/>
    <rect x="3432" y="650" width="94" height="38" rx="8" fill="${C.woodLight}" ${RO3}/>
    <circle cx="3479" cy="623" r="5.5" fill="${C.pink}" ${RO3}/><circle cx="3479" cy="669" r="5.5" fill="${C.pink}" ${RO3}/>
    <rect x="3120" y="566" width="460" height="28" rx="10" fill="${C.wood}" ${RO}/>
    <!-- tumpukan buku -->
    <rect x="3150" y="540" width="96" height="26" rx="6" fill="${C.mint}" ${RO3}/>
    <rect x="3158" y="516" width="84" height="24" rx="6" fill="${C.butter}" ${RO3}/>
    <rect x="3146" y="492" width="92" height="24" rx="6" fill="${C.pink}" ${RO3}/>
    <path d="M3166 504 H3222 M3174 528 H3226" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>
    <!-- buku terbuka -->
    <path d="M3290 562 Q3330 540 3370 556 Q3410 540 3450 562 L3450 568 L3290 568 Z" fill="#fff" ${RO3}/>
    <path d="M3370 556 V566 M3306 556 Q3330 548 3354 554 M3386 554 Q3410 548 3434 556" fill="none" stroke="${C.cocoa}" stroke-width="2.5" stroke-linecap="round"/>
    <!-- bola dunia -->
    <rect x="3492" y="552" width="44" height="14" rx="6" fill="${C.woodDeep}" ${RO3}/>
    <path d="M3514 552 V540" ${RO3}/>
    <circle cx="3514" cy="506" r="34" fill="${C.sky}" ${RO}/>
    <path d="M3494 492 Q3506 482 3518 494 Q3528 504 3522 516 Q3508 520 3500 510 Z M3524 478 Q3536 484 3540 498 Q3530 496 3524 488 Z" fill="${C.mint}" ${RO3}/>
    <path d="M3478 506 A36 36 0 0 0 3550 506" fill="none" stroke="${C.woodDeep}" stroke-width="4"/>
  </g>`;
}
