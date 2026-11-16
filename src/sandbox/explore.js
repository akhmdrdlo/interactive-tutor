/**
 * Jelajah: Peta Indonesia (IPAS Bab 1 + Pancasila Bab 3) dan Garis Waktu Sejarah (IPAS Bab 5).
 * Peta digambar sederhana (bukan peta berskala) — fokusnya mengenal pulau, ujung Indonesia, dan budaya.
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { esc } from '../core/dom.js';
import { C } from '../core/palette.js';
import { openSheet } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { toast } from '../ui/feedback.js';
import { runSession } from './session.js';

const O = `stroke="${C.cocoa}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;

const ISLANDS = [
  { id: 'sumatra', name: 'Sumatra', d: 'M40 40 C80 30 120 70 160 110 C200 150 250 200 270 250 C250 270 220 260 190 230 C150 190 110 150 80 110 C55 80 30 60 40 40 Z',
    facts: ['Ujung barat Indonesia: Pulau Rondo (Aceh).', 'Lampung: makanan Seruit dan Tari Sembah.'] },
  { id: 'jawa', name: 'Jawa', d: 'M280 290 C330 280 400 286 470 296 C480 306 470 318 450 318 C390 316 320 312 285 306 C272 302 272 294 280 290 Z',
    facts: ['Jawa Barat: tanah Sunda, ada angklung dan Basa Sunda.', 'Jawa Timur: Sate Madura dan alat musik Bonang.', 'Candi Borobudur peninggalan Mataram Kuno ada di Jawa Tengah.'] },
  { id: 'kalimantan', name: 'Kalimantan', d: 'M320 120 C350 70 430 60 470 100 C500 130 490 190 460 230 C420 260 360 250 330 220 C305 190 300 150 320 120 Z',
    facts: ['Kalimantan Selatan: Pasar Terapung Lok Baintan di Sungai Martapura.', 'Kalimantan Utara: Tari Lalatip dan alat musik Jatung Utang.'] },
  { id: 'sulawesi', name: 'Sulawesi', d: 'M540 110 C570 100 610 100 640 110 C620 125 585 125 570 140 C590 160 620 170 640 190 C615 200 590 190 575 180 C575 210 590 240 580 260 C560 250 552 215 548 180 C545 155 530 130 540 110 Z',
    facts: ['Ujung utara Indonesia: Pulau Miangas (Sulawesi Utara).', 'Gorontalo: Tari Saronde dan rumah Dulohupa.', 'Sultan Hasanuddin, pahlawan dari Gowa, Sulawesi Selatan.'] },
  { id: 'nusa', name: 'Bali & Nusa Tenggara', d: 'M485 325 C500 318 520 322 525 330 C515 338 495 338 485 325 Z M540 330 C580 322 630 326 660 334 C640 344 590 346 545 340 Z',
    facts: ['Ujung selatan Indonesia: Pulau Rote (NTT).', 'Nusa Tenggara Timur: alat musik Sasando dan makanan Se’i.'] },
  { id: 'maluku', name: 'Maluku', d: 'M690 150 C705 145 715 160 708 175 C698 180 688 168 690 150 Z M700 210 C720 205 745 212 740 225 C720 232 700 226 700 210 Z',
    facts: ['Maluku: lagu Rasa Sayange, Tari Cakalele, dan rumah Baileo.', 'Kepulauan rempah: pala dan cengkih.'] },
  { id: 'papua', name: 'Papua', d: 'M780 170 C830 150 900 160 960 190 C980 220 975 270 950 300 C900 320 840 300 810 270 C790 250 800 220 770 205 C760 190 765 178 780 170 Z',
    facts: ['Ujung timur Indonesia: Merauke (Papua Selatan).', 'Alat musik tifa dan lagu Sajojo adalah warisan budaya Papua.'] },
];
const PINS = [
  { name: 'Pulau Rondo', x: 46, y: 38, dir: 'barat' },
  { name: 'Pulau Miangas', x: 612, y: 52, dir: 'utara' },
  { name: 'Pulau Rote', x: 610, y: 362, dir: 'selatan' },
  { name: 'Merauke', x: 930, y: 312, dir: 'timur' },
];

export function openMap({ onBack } = {}) {
  openSheet({
    title: 'Peta Indonesia',
    tone: 'sky',
    silent: true,
    render(body) {
      const visited = new Set();
      body.innerHTML = `
        <div class="game-head">
          ${onBack ? `<button type="button" class="btn btn--small btn--ghost" data-back>${icon('back')}<span>Meja belajar</span></button>` : ''}
          <p class="sheet__lead">Ketuk pulau untuk mengenal budayanya. Bintang kuning menandai ujung-ujung Indonesia. <small>(Peta sederhana, bukan peta berskala.)</small></p>
        </div>
        <div class="map">
          <svg class="map__svg" viewBox="0 0 1000 400" role="group" aria-label="Peta Indonesia sederhana">
            <rect width="1000" height="400" rx="24" fill="${C.sky}" opacity="0.55"/>
            <path d="M0 330 Q500 300 1000 340" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="10 12" opacity="0.8"/>
            <text x="20" y="390" font-family="Fredoka, sans-serif" font-size="18" fill="${C.inkSoft}">Samudra Hindia</text>
            <text x="820" y="40" font-family="Fredoka, sans-serif" font-size="18" fill="${C.inkSoft}">Samudra Pasifik</text>
            <text x="440" y="20" font-family="Fredoka, sans-serif" font-size="14" fill="${C.inkSoft}">garis khatulistiwa</text>
            <line x1="0" y1="140" x2="1000" y2="140" stroke="${C.butterDeep}" stroke-width="2.5" stroke-dasharray="6 8"/>
            ${ISLANDS.map((i) => `<path class="island" data-island="${i.id}" d="${i.d}" fill="${C.mint}" ${O} role="button" tabindex="0" aria-label="${esc(i.name)}"/>`).join('')}
            ${PINS.map((p) => `<g transform="translate(${p.x} ${p.y})" aria-hidden="true"><path d="M0 -14 L4 -4 L14 -3 L6 4 L9 14 L0 8 L-9 14 L-6 4 L-14 -3 L-4 -4 Z" fill="${C.butter}" ${O}/></g>`).join('')}
          </svg>
          <div class="map__info" data-info aria-live="polite"><p>Pilih sebuah pulau di peta.</p></div>
        </div>
        <ul class="map__pins">${PINS.map((p) => `<li><b>Ujung ${p.dir}:</b> ${esc(p.name)}</li>`).join('')}</ul>`;

      function show(id) {
        const isl = ISLANDS.find((i) => i.id === id);
        body.querySelectorAll('.island').forEach((p) => p.classList.toggle('is-active', p.dataset.island === id));
        body.querySelector('[data-info]').innerHTML = `<h3 class="reader__heading">${esc(isl.name)}</h3><ul class="reader__points">${isl.facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>`;
        visited.add(id);
        sfx.select();
        if (visited.size === ISLANDS.length && !body.dataset.done) {
          body.dataset.done = '1';
          const earned = store.completeLesson('jelajah', 'peta', 3);
          toast(earned ? `Kamu menjelajahi seluruh Indonesia! +${earned} bintang` : 'Penjelajah hebat!', { tone: 'mint' });
        }
      }
      body.addEventListener('click', (e) => {
        if (e.target.closest('[data-back]')) { sfx.pop(); onBack?.(); return; }
        const isl = e.target.closest('[data-island]');
        if (isl) show(isl.dataset.island);
      });
      body.addEventListener('keydown', (e) => {
        const isl = e.target.closest('[data-island]');
        if (isl && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); show(isl.dataset.island); }
      });
    },
  });
}

const ERAS = [
  { when: 'sekitar 3000 SM', title: 'Masa Praaksara', text: 'Belum ada tulisan. Manusia memakai alat dari batu, lalu dari logam.' },
  { when: 'abad ke-4 M', title: 'Masa Hindu-Buddha', text: 'Agama Hindu-Buddha masuk lewat perdagangan. Kerajaan Kutai meninggalkan Prasasti Yupa; Mataram Kuno membangun Borobudur.' },
  { when: 'abad ke-7 M', title: 'Masa Islam', text: 'Islam diperkirakan masuk pada masa Sriwijaya. Kerajaan Demak menaklukkan Majapahit tahun 1527.' },
  { when: '1602', title: 'Masa Penjajahan', text: 'VOC, perusahaan dagang Belanda, berdiri lalu ikut mengendalikan kerajaan-kerajaan. Tahun 1942 Jepang datang.' },
  { when: '17 Agustus 1945', title: 'Masa Kemerdekaan', text: 'Indonesia memproklamasikan kemerdekaannya.' },
];

export function openTimeline({ onBack } = {}) {
  openSheet({
    title: 'Garis Waktu Sejarah',
    tone: 'peach',
    silent: true,
    render(body) {
      function view() {
        body.innerHTML = `
          <div class="game-head">
            ${onBack ? `<button type="button" class="btn btn--small btn--ghost" data-back>${icon('back')}<span>Meja belajar</span></button>` : ''}
            <p class="sheet__lead">Jalan-jalan dari masa lalu sampai Indonesia merdeka. Ketuk tiap masa, lalu uji ingatanmu.</p>
          </div>
          <ol class="timeline">
            ${ERAS.map((e, i) => `<li class="timeline__item"><details${i === 0 ? ' open' : ''}><summary><span class="timeline__when">${esc(e.when)}</span><span class="timeline__title">${esc(e.title)}</span></summary><p>${esc(e.text)}</p></details></li>`).join('')}
          </ol>
          <div class="lesson__nav"><span></span><button type="button" class="btn btn--primary" data-test>Uji urutan sejarah</button></div>`;
      }
      function test() {
        runSession(body, {
          questions: [
            { quiz: { type: 'sequence', prompt: 'Urutkan masa sejarah Indonesia dari yang paling awal!', steps: ERAS.map((e) => e.title), hint: 'Praaksara = sebelum ada tulisan. Kemerdekaan paling akhir.' } },
            { quiz: { type: 'drag-match', prompt: 'Pasangkan peristiwa dengan tahunnya!', pairs: [{ left: 'VOC berdiri', right: '1602' }, { left: 'Demak menaklukkan Majapahit', right: '1527' }, { left: 'Proklamasi kemerdekaan', right: '1945' }], hint: 'Proklamasi 17 Agustus 1945.' } },
          ],
          onFinish: (first) => {
            const earned = store.completeLesson('jelajah', 'garis-waktu', 3, first / 2);
            return { title: first === 2 ? 'Sejarawan cilik!' : 'Garis waktu selesai!', message: earned ? `Kamu dapat <b>${earned} bintang</b>.` : 'Ulangi lagi untuk melengkapi bintangnya.', earned };
          },
          actions: '<button type="button" class="btn btn--primary" data-action="view">Lihat garis waktu</button>',
          onAction: view,
        });
      }
      body.addEventListener('click', (e) => {
        if (e.target.closest('[data-back]')) { sfx.pop(); onBack?.(); return; }
        if (e.target.closest('[data-test]')) { sfx.pop(); test(); }
      });
      view();
    },
  });
}
