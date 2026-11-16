/**
 * Lab Mini: belajar dengan mencoba sendiri.
 *   Bunyi    — xilofon Web Audio: batang panjang = nada rendah (IPAS Bab 8)
 *   Bayangan — geser senter, bayangan membesar/mengecil (IPAS Bab 7)
 *   Warna    — campur cat & prisma pelangi (IPAS Bab 7)
 *   Pecahan  — potong & warnai pizza (Matematika Bab 3)
 * Setiap lab punya satu misi; misi pertama kali selesai = +2 bintang.
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { esc } from '../core/dom.js';
import { C } from '../core/palette.js';
import { openSheet } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { toast, starBurst } from '../ui/feedback.js';

const LAB_KEY = 'lab';
const LAB_REWARD = 2;
const O = `stroke="${C.cocoa}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;

const LABS = [
  { id: 'bunyi', title: 'Lab Bunyi', blurb: 'Pukul batang xilofon. Mana yang nadanya paling rendah?', mission: 'Mainkan semua 8 batang.', color: C.mint },
  { id: 'bayangan', title: 'Lab Bayangan', blurb: 'Geser senter mendekat dan menjauh dari boneka.', mission: 'Buat bayangan sebesar mungkin.', color: C.butter },
  { id: 'warna', title: 'Lab Warna', blurb: 'Campur dua cat, lalu sinari prisma.', mission: 'Buat jingga, hijau, dan ungu.', color: C.pink },
  { id: 'pecahan', title: 'Lab Pecahan', blurb: 'Potong pizza dan warnai potongannya.', mission: 'Warnai pizza sesuai soal.', color: C.peach },
];

function missionDone(lab, host) {
  const earned = store.completeLesson(LAB_KEY, lab.id, LAB_REWARD);
  sfx.success();
  toast(earned ? `Misi ${lab.title} selesai! +${earned} bintang` : `Misi ${lab.title} selesai lagi. Hebat!`, { tone: 'mint' });
  const r = host.getBoundingClientRect();
  starBurst(r.left + r.width / 2, r.top + 60, 10);
}

/* ───────── Lab Bunyi ───────── */
function labBunyi(host, lab) {
  const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5]; // C5 → C6
  const colors = [C.pink, C.peach, C.butter, C.mint, C.sky, '#D9C8EC', C.pinkHover, C.butterDeep];
  const played = new Set();
  let ctx = null;
  host.innerHTML = `
    <p class="lab__say" data-say>Batang paling kiri paling panjang. Ketuk batangnya!</p>
    <div class="xylo" role="group" aria-label="Xilofon">
      ${notes.map((f, i) => {
        const h = 210 - i * 18;
        return `<button type="button" class="xylo__bar" data-i="${i}" style="--h:${h}px;--c:${colors[i]}" aria-label="Batang ${i + 1}, panjang ${h} piksel"></button>`;
      }).join('')}
    </div>
    <p class="lab__fact">Semakin panjang batangnya, semakin lambat bergetar, sehingga <b>nadanya semakin rendah</b>.</p>`;
  host.addEventListener('click', (e) => {
    const bar = e.target.closest('.xylo__bar');
    if (!bar) return;
    const i = Number(bar.dataset.i);
    if (store.get().settings.sound) {
      ctx ??= new (window.AudioContext || window.webkitAudioContext)();
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = notes[i];
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.25, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
      osc.connect(g).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 1);
    }
    bar.classList.remove('is-hit'); void bar.offsetWidth; bar.classList.add('is-hit');
    played.add(i);
    host.querySelector('[data-say]').textContent = i === 0 ? 'Itu batang terpanjang — nadanya paling rendah!' : i === 7 ? 'Batang terpendek — nadanya paling tinggi!' : `Sudah ${played.size} dari 8 batang.`;
    if (played.size === 8 && !host.dataset.done) { host.dataset.done = '1'; missionDone(lab, host); }
  });
}

/* ───────── Lab Bayangan ───────── */
function labBayangan(host, lab) {
  host.innerHTML = `
    <p class="lab__say" data-say>Geser senter. Perhatikan ukuran bayangan di dinding.</p>
    <svg class="lab__svg" viewBox="0 0 600 260" role="img" aria-label="Senter, boneka, dan dinding" data-scene></svg>
    <label class="lab__slider">Jarak senter ke boneka
      <input type="range" min="40" max="300" value="200" data-range aria-describedby="shadow-size">
    </label>
    <p class="lab__fact" id="shadow-size" data-size></p>`;
  const scene = host.querySelector('[data-scene]');
  const range = host.querySelector('[data-range]');
  const WALL = 540;
  const OBJ = 340;      // posisi boneka
  const OBJ_H = 60;
  function paint() {
    const d = Number(range.value);                // jarak senter–boneka
    const lampX = OBJ - d;
    const shadowH = Math.min(240, OBJ_H * (WALL - lampX) / d);
    const top = 200 - shadowH;
    scene.innerHTML = `
      <rect x="${WALL}" y="10" width="40" height="230" fill="${C.linen}" ${O}/>
      <polygon points="${lampX + 20},180 ${WALL},${top} ${WALL},200" fill="${C.butter}" opacity="0.35"/>
      <rect x="${WALL}" y="${top}" width="12" height="${shadowH}" rx="4" fill="${C.cocoa}" opacity="0.55"/>
      <g transform="translate(${lampX} 168)"><rect x="-30" y="0" width="50" height="24" rx="8" fill="${C.sky}" ${O}/><path d="M20 -4 L34 -10 L34 34 L20 28 Z" fill="${C.butter}" ${O}/></g>
      <g transform="translate(${OBJ} 140)"><ellipse cx="0" cy="44" rx="16" ry="18" fill="${C.wood}" ${O}/><circle cx="0" cy="14" r="16" fill="${C.wood}" ${O}/><circle cx="-12" cy="0" r="6" fill="${C.wood}" ${O}/><circle cx="12" cy="0" r="6" fill="${C.wood}" ${O}/></g>
      <line x1="20" y1="232" x2="580" y2="232" stroke="${C.cocoa}" stroke-width="3" stroke-linecap="round"/>`;
    const big = shadowH > 200;
    host.querySelector('[data-size]').innerHTML = `Tinggi bayangan: <b>${Math.round(shadowH)}</b>. ${d < 120 ? 'Senter dekat → bayangan <b>besar</b>.' : 'Senter jauh → bayangan <b>kecil</b>.'}`;
    if (big && !host.dataset.done) {
      host.dataset.done = '1';
      host.querySelector('[data-say]').textContent = 'Wah, bayangannya raksasa! Benda yang dekat sumber cahaya menghasilkan bayangan besar.';
      missionDone(lab, host);
    }
  }
  range.addEventListener('input', paint);
  paint();
}

/* ───────── Lab Warna ───────── */
function labWarna(host, lab) {
  const PAINT = { merah: '#E46A6A', kuning: '#F3D04B', biru: '#5E8FD6' };
  const MIX = { 'kuning+merah': ['jingga', '#F29A4A'], 'biru+kuning': ['hijau', '#6DBB72'], 'biru+merah': ['ungu', '#9C6BC7'] };
  const made = new Set();
  let picked = [];
  host.innerHTML = `
    <p class="lab__say" data-say>Pilih dua warna cat untuk dicampur.</p>
    <div class="paints" role="group" aria-label="Cat">
      ${Object.entries(PAINT).map(([n, c]) => `<button type="button" class="paint" data-paint="${n}" style="--c:${c}" aria-pressed="false">${n}</button>`).join('')}
    </div>
    <div class="mix-bowl" data-bowl aria-live="polite"><span>?</span></div>
    <p class="lab__fact">Warna hasil campuran dua warna pokok disebut <b>warna sekunder</b>.</p>
    <div class="prism-box">
      <button type="button" class="btn btn--small btn--ghost" data-prism>Sinari prisma</button>
      <svg class="lab__svg lab__svg--small" viewBox="0 0 600 140" aria-hidden="true" data-prism-scene></svg>
    </div>`;
  const prism = host.querySelector('[data-prism-scene]');
  const drawPrism = (on) => {
    const bands = ['#E46A6A', '#F29A4A', '#F3D04B', '#6DBB72', '#5E8FD6', '#6B6BC7', '#9C6BC7'];
    prism.innerHTML = `<line x1="20" y1="70" x2="250" y2="70" stroke="#fff" stroke-width="10" ${on ? '' : 'opacity="0.3"'} stroke-linecap="round"/>
      <line x1="20" y1="70" x2="250" y2="70" stroke="${C.cocoa}" stroke-width="2" opacity="0.4"/>
      <path d="M250 120 L300 20 L350 120 Z" fill="#E6F4FA" ${O}/>
      ${on ? bands.map((c, i) => `<path d="M330 ${70 + i * 2} L590 ${18 + i * 16}" stroke="${c}" stroke-width="10" stroke-linecap="round" opacity="0.9"/>`).join('') : ''}`;
  };
  drawPrism(false);
  host.addEventListener('click', (e) => {
    if (e.target.closest('[data-prism]')) { drawPrism(true); sfx.sparkle(); host.querySelector('[data-say]').textContent = 'Cahaya putih diuraikan prisma menjadi mejikuhibiniu!'; return; }
    const p = e.target.closest('[data-paint]');
    if (!p) return;
    picked = picked.includes(p.dataset.paint) ? picked.filter((x) => x !== p.dataset.paint) : [...picked, p.dataset.paint].slice(-2);
    host.querySelectorAll('[data-paint]').forEach((b) => b.setAttribute('aria-pressed', String(picked.includes(b.dataset.paint))));
    sfx.pop();
    const bowl = host.querySelector('[data-bowl]');
    if (picked.length < 2) { bowl.style.background = picked[0] ? PAINT[picked[0]] : ''; bowl.innerHTML = '<span>?</span>'; return; }
    const [name, color] = MIX[[...picked].sort().join('+')];
    bowl.style.background = color;
    bowl.innerHTML = `<span>${name}</span>`;
    made.add(name);
    sfx.select();
    host.querySelector('[data-say]').textContent = `${picked[0]} + ${picked[1]} = ${name}! (${made.size}/3 warna sekunder)`;
    if (made.size === 3 && !host.dataset.done) { host.dataset.done = '1'; missionDone(lab, host); }
  });
}

/* ───────── Lab Pecahan (juga dipakai di Buku Cerita) ───────── */
export function mountPizza(host, { slices = 8, target = null, onSolved } = {}) {
  let d = slices;
  let shaded = new Set();
  let solved = false;
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  function paint() {
    const n = shaded.size;
    const R = 110;
    const parts = Array.from({ length: d }, (_, i) => {
      const a0 = (i / d) * Math.PI * 2 - Math.PI / 2;
      const a1 = ((i + 1) / d) * Math.PI * 2 - Math.PI / 2;
      const p = (a) => `${(130 + R * Math.cos(a)).toFixed(1)} ${(130 + R * Math.sin(a)).toFixed(1)}`;
      return `<path class="slice${shaded.has(i) ? ' is-on' : ''}" data-slice="${i}" d="M130 130 L${p(a0)} A${R} ${R} 0 0 1 ${p(a1)} Z" ${O} role="button" tabindex="0" aria-pressed="${shaded.has(i)}" aria-label="Potongan ${i + 1}"/>`;
    }).join('');
    const g = n ? gcd(n, d) : 1;
    host.innerHTML = `
      ${target ? `<p class="lab__say">Warnai <b>${target[0]}/${target[1]}</b> pizza!</p>` : ''}
      <div class="pizza-wrap">
        <svg class="pizza" viewBox="0 0 260 260" aria-label="Pizza ${d} potong">${parts}<circle cx="130" cy="130" r="114" fill="none" stroke="${C.woodDeep}" stroke-width="8"/></svg>
        <div class="pizza-info">
          <p class="pizza-frac"><b>${n}</b><span>${d}</span></p>
          ${n && g > 1 ? `<p class="lab__fact">Senilai dengan <b>${n / g}/${d / g}</b></p>` : ''}
          ${target ? '' : `<label class="lab__slider">Jumlah potongan <input type="range" min="2" max="12" value="${d}" data-d></label>`}
        </div>
      </div>`;
    if (target && !solved && n * target[1] === target[0] * d) {
      solved = true;
      sfx.success();
      onSolved?.();
    }
  }
  host.addEventListener('click', (e) => {
    const s = e.target.closest('[data-slice]');
    if (!s || solved) return;
    const i = Number(s.dataset.slice);
    shaded.has(i) ? shaded.delete(i) : shaded.add(i);
    sfx.pop();
    paint();
  });
  host.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('[data-slice]')) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
  });
  host.addEventListener('input', (e) => {
    if (!e.target.matches('[data-d]')) return;
    d = Number(e.target.value);
    shaded = new Set();
    paint();
    host.querySelector('[data-d]')?.focus();
  });
  paint();
}

function labPecahan(host, lab) {
  const targets = [[1, 2], [3, 4], [2, 3], [5, 8]];
  const t = targets[Math.floor(Math.random() * targets.length)];
  const slices = t[1] === 3 ? 6 : 8;
  host.innerHTML = '<div data-pizza></div><p class="lab__fact">Tips: 1/2 = 4/8. Pecahan senilai punya nilai sama walau angkanya berbeda.</p>';
  mountPizza(host.querySelector('[data-pizza]'), { slices, target: t, onSolved: () => { if (!host.dataset.done) { host.dataset.done = '1'; missionDone(lab, host); } } });
}

const RUN = { bunyi: labBunyi, bayangan: labBayangan, warna: labWarna, pecahan: labPecahan };

export function openLabs({ onBack } = {}) {
  openSheet({
    title: 'Lab Mini',
    tone: 'mint',
    silent: true,
    render(body) {
      function list() {
        body.innerHTML = `
          <div class="game-head">
            ${onBack ? `<button type="button" class="btn btn--small btn--ghost" data-back>${icon('back')}<span>Meja belajar</span></button>` : ''}
            <p class="sheet__lead">Coba sendiri, amati, lalu simpulkan — seperti ilmuwan! Setiap lab punya misi berhadiah bintang.</p>
          </div>
          <ul class="set-grid">${LABS.map((l) => `<li><button type="button" class="set-card" data-lab="${l.id}" style="--subject:${l.color}">
            <span class="set-card__title">${esc(l.title)} ${store.isDone(LAB_KEY, l.id) ? '· selesai' : ''}</span>
            <span class="set-card__count">${esc(l.blurb)}</span></button></li>`).join('')}</ul>`;
      }
      function open(id) {
        const lab = LABS.find((l) => l.id === id);
        body.innerHTML = `
          <div class="lab">
            <div class="game-head">
              <button type="button" class="btn btn--small btn--ghost" data-list>${icon('back')}<span>Semua lab</span></button>
              <p class="lab__mission"><b>Misi:</b> ${esc(lab.mission)}</p>
            </div>
            <div class="lab__stage" data-stage></div>
          </div>`;
        RUN[id](body.querySelector('[data-stage]'), lab);
      }
      body.addEventListener('click', (e) => {
        if (e.target.closest('[data-back]')) { sfx.pop(); onBack?.(); return; }
        if (e.target.closest('[data-list]')) { sfx.pop(); list(); return; }
        const card = e.target.closest('[data-lab]');
        if (card) { sfx.pop(); open(card.dataset.lab); }
      });
      list();
    },
  });
}
