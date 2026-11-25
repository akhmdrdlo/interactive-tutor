/**
 * Bangunan di Kampung SDaya (dunia luar rumah).
 * Setiap bangunan membuka kegiatan yang cocok dengan tempatnya.
 */
import { sfx } from '../core/audio.js';
import { esc } from '../core/dom.js';
import { openSheet } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { openBookshelf } from '../sandbox/reader.js';
import { openMathDrill } from '../sandbox/desk.js';
import { openLabs } from '../sandbox/labs.js';
import { openMap, openTimeline } from '../sandbox/explore.js';
import { openStories } from '../sandbox/stories.js';
import { SUBJECTS6 } from '../data/kelas6.js';
import { openSubject, loadSubject } from './subject.js';
import { store } from '../core/store.js';
import { markMission } from '../core/missions.js';

function chooser(title, tone, lead, options) {
  openSheet({
    title,
    tone,
    render(body) {
      body.innerHTML = `<p class="sheet__lead">${esc(lead)}</p>
        <ul class="desk-grid">${options.map((o, i) => `<li><button type="button" class="desk-card" data-opt="${i}">
          <span class="desk-card__icon" style="background:${o.color}" aria-hidden="true">${icon(o.icon)}</span>
          <span class="desk-card__title">${esc(o.title)}</span><span class="desk-card__blurb">${esc(o.blurb)}</span>
        </button></li>`).join('')}</ul>`;
      body.addEventListener('click', (e) => {
        const b = e.target.closest('[data-opt]');
        if (b) { sfx.pop(); options[Number(b.dataset.opt)].open(); }
      });
    },
  });
}

export const openLibrary = () => chooser('Perpustakaan', 'sky', 'Selamat datang di perpustakaan kampung! Mau membaca apa?', [
  { title: 'Buku Ringkas', blurb: 'Isi buku pelajaran dengan bahasa mudah.', icon: 'book', color: 'var(--sky)', open: () => openBookshelf({ onBack: openLibrary }) },
  { title: 'Buku Cerita', blurb: 'Ngobrol dengan tokoh tentang materi sulit.', icon: 'chat', color: 'var(--pink)', open: () => openStories({ onBack: openLibrary }) },
]);

export const openMarket = () => { markMission('market'); openMathDrill({ topic: 'uang', title: 'Belanja di Pasar' }); };

export const openPark = () => openLabs();

export const openMuseum = () => chooser('Museum', 'peach', 'Museum Kampung SDaya menyimpan peta dan kisah sejarah Nusantara.', [
  { title: 'Ruang Peta', blurb: 'Peta Indonesia, legenda, dan Kuis Peta.', icon: 'shield', color: 'var(--sky)', open: () => openMap({ onBack: openMuseum }) },
  { title: 'Lorong Sejarah', blurb: 'Garis waktu dari praaksara sampai merdeka.', icon: 'moon', color: 'var(--peach)', open: () => openTimeline({ onBack: openMuseum }) },
]);

/** Sekolah Kelas 6: rak buku berisi mapel Kelas 6 (mesin pelajaran & kuis sama dengan Kelas 5). */
export function openSchool6() {
  openSheet({
    title: 'Sekolah Kelas 6',
    tone: 'pink',
    render(body) {
      const { progress } = store.get();
      body.innerHTML = `
        <p class="sheet__lead">Selamat datang di Kelas 6! Materinya diambil dari buku siswa Kurikulum Merdeka Kelas VI. Boleh dicoba kapan saja, walau kamu masih kelas 5.</p>
        <ul class="subject-grid">${SUBJECTS6.map((s) => `<li>
          <button type="button" class="subject-card" data-subject="${s.id}" style="--subject:${s.color}">
            <span class="subject-card__spine" aria-hidden="true"></span>
            <span class="subject-card__icon">${icon(s.icon)}</span>
            <span class="subject-card__text"><span class="subject-card__title">${esc(s.title)}</span><span class="subject-card__book">${esc(s.book)}</span></span>
            <span class="subject-card__meta">Memuat…</span>
          </button></li>`).join('')}</ul>
        <p class="subject-source">Basa Sunda, Koding &amp; KA, dan Seni Rupa Kelas 6 belum tersedia di katalog buku nasional.</p>`;
      SUBJECTS6.forEach(async (s) => {
        const data = await loadSubject(s).catch(() => null);
        const meta = body.querySelector(`[data-subject="${s.id}"] .subject-card__meta`);
        if (!data || !meta) return;
        const ids = data.chapters.flatMap((c) => c.lessons.map((l) => l.id));
        meta.textContent = `${ids.filter((id) => progress[s.id]?.[id]?.done).length}/${ids.length} selesai`;
      });
      body.addEventListener('click', (e) => {
        const card = e.target.closest('[data-subject]');
        if (!card) return;
        sfx.pop();
        openSubject(SUBJECTS6.find((s) => s.id === card.dataset.subject), { onBack: openSchool6 });
      });
    },
  });
}
