/**
 * Panel-panel lain yang dibuka dari benda di kamar:
 * rak buku (mapel) dan simpan progres.
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { esc } from '../core/dom.js';
import { openSheet } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { toast } from '../ui/feedback.js';
import { SUBJECTS } from '../data/subjects.js';
import { openSubject, loadSubject } from './subject.js';

export function openSubjects() {
  openSheet({
    title: 'Rak Buku Pelajaran',
    tone: 'sky',
    render(body) {
      const { progress } = store.get();
      // Hitung jumlah pelajaran tiap mapel di latar belakang untuk label "x/y selesai".
      SUBJECTS.filter((s) => s.load).forEach(async (s) => {
        const data = await loadSubject(s).catch(() => null);
        const meta = body.querySelector(`[data-subject="${s.id}"] .subject-card__meta`);
        if (!data || !meta) return;
        // Hitung hanya pelajaran yang masih ada (id lama di file simpanan diabaikan).
        const ids = data.chapters.flatMap((c) => c.lessons.map((l) => l.id));
        const done = ids.filter((id) => progress[s.id]?.[id]?.done).length;
        meta.textContent = `${done}/${ids.length} selesai`;
      });
      body.innerHTML = `
        <p class="sheet__lead">Mau belajar apa hari ini? Pilih salah satu buku, ya!</p>
        <ul class="subject-grid">
          ${SUBJECTS.map((s) => {
            return `<li>
              <button type="button" class="subject-card" data-subject="${s.id}" style="--subject:${s.color}">
                <span class="subject-card__spine" aria-hidden="true"></span>
                <span class="subject-card__icon">${icon(s.icon)}</span>
                <span class="subject-card__text">
                  <span class="subject-card__title">${esc(s.title)}</span>
                  <span class="subject-card__book">${esc(s.book)}</span>
                </span>
                <span class="subject-card__meta">${s.load ? 'Memuat…' : 'Segera hadir'}</span>
              </button>
            </li>`;
          }).join('')}
        </ul>`;

      body.addEventListener('click', (event) => {
        const card = event.target.closest('[data-subject]');
        if (!card) return;
        sfx.pop();
        const subject = SUBJECTS.find((s) => s.id === card.dataset.subject);
        if (subject.load) openSubject(subject, { onBack: openSubjects });
        else toast(subject.soon ?? `Buku ${subject.title} masih disiapkan. Tunggu kejutannya, ya!`);
      });
    },
  });
}

export function openSave() {
  openSheet({
    title: 'Simpan Progres',
    tone: 'mint',
    size: 'narrow',
    render(body) {
      const paint = () => {
        const { savedAt, stars } = store.get();
        const when = savedAt
          ? new Date(savedAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
          : 'belum pernah';
        body.innerHTML = `
          <p class="sheet__lead">Progresmu otomatis tersimpan di perangkat ini. Mau pindah ke laptop atau tablet lain? Unduh file simpananmu, lalu buka di sana.</p>
          <dl class="save-facts">
            <div><dt>Bintang</dt><dd>${stars}</dd></div>
            <div><dt>Tersimpan</dt><dd>${esc(when)}</dd></div>
          </dl>
          <div class="save-actions">
            <button type="button" class="btn btn--primary" data-export>${icon('download')}<span>Unduh file simpanan</span></button>
            <label class="btn btn--ghost">
              ${icon('upload')}<span>Buka file simpanan</span>
              <input type="file" accept="application/json,.json" data-import hidden>
            </label>
          </div>`;
      };
      paint();

      body.addEventListener('click', (event) => {
        if (!event.target.closest('[data-export]')) return;
        store.exportFile();
        sfx.success();
        toast('File simpanan sudah diunduh. Simpan baik-baik, ya!', { tone: 'mint' });
      });

      body.addEventListener('change', async (event) => {
        const input = event.target.closest('[data-import]');
        const file = input?.files?.[0];
        if (!file) return;
        try {
          await store.importFile(file);
          sfx.success();
          toast('Progresmu berhasil dimuat. Selamat datang kembali!', { tone: 'mint' });
          paint();
        } catch (error) {
          sfx.nudge();
          toast(`${error.message} Coba pilih file yang namanya diawali "sdaya".`);
          input.value = '';
        }
      });
    },
  });
}
