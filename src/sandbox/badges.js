/**
 * Lencana Bab: satu stiker per bab. Didapat kalau semua pelajaran bab itu selesai
 * DAN Buku Ringkas bab itu sudah dibaca. Lencana baru = +3 bintang (sekali saja).
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { esc } from '../core/dom.js';
import { openSheet } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { toast, starBurst } from '../ui/feedback.js';
import { SUBJECTS } from '../data/subjects.js';

const BADGE_KEY = 'lencana';
const BADGE_REWARD = 3;

async function collect() {
  const subjects = SUBJECTS.filter((s) => s.load);
  return Promise.all(subjects.map(async (subject) => {
    const data = (await subject.load()).default;
    const chapters = data.chapters.map((c, i) => {
      const lessonsDone = c.lessons.filter((l) => store.isDone(subject.id, l.id)).length;
      const read = store.isDone('baca', `${subject.id}:${c.id}`);
      const steps = c.lessons.length + 1;
      const done = lessonsDone + (read ? 1 : 0);
      return { id: c.id, label: c.label ?? `Bab ${i + 1}`, title: c.title, done, steps, complete: done === steps, key: `${subject.id}:${c.id}` };
    });
    return { subject, chapters };
  }));
}

export async function openBadges({ onBack } = {}) {
  const groups = await collect();
  // Klaim lencana yang baru lengkap.
  let fresh = 0;
  for (const g of groups) for (const c of g.chapters) {
    if (c.complete && !store.isDone(BADGE_KEY, c.key)) fresh += store.completeLesson(BADGE_KEY, c.key, BADGE_REWARD) ? 1 : 0;
  }
  const total = groups.reduce((n, g) => n + g.chapters.length, 0);
  const owned = groups.reduce((n, g) => n + g.chapters.filter((c) => c.complete).length, 0);

  openSheet({
    title: 'Koleksi Lencana',
    tone: 'peach',
    silent: true,
    render(body) {
      body.innerHTML = `
        <div class="game-head">
          ${onBack ? `<button type="button" class="btn btn--small btn--ghost" data-back>${icon('back')}<span>Meja belajar</span></button>` : ''}
          <p class="sheet__lead">Lencana didapat kalau semua pelajaran satu bab selesai <b>dan</b> Buku Ringkas bab itu sudah dibaca. Kamu punya <b>${owned}</b> dari ${total} lencana.</p>
        </div>
        ${groups.map((g) => `
          <h3 class="set-group">${esc(g.subject.title)}</h3>
          <ul class="badge-grid">${g.chapters.map((c) => `
            <li class="badge${c.complete ? ' is-owned' : ''}" style="--subject:${g.subject.color}">
              <span class="badge__seal" aria-hidden="true">${c.complete ? icon('star') : `<b>${c.done}/${c.steps}</b>`}</span>
              <span class="badge__label">${esc(c.label)}</span>
              <span class="badge__title">${esc(c.title)}</span>
            </li>`).join('')}</ul>`).join('')}`;
      body.addEventListener('click', (e) => { if (e.target.closest('[data-back]')) { sfx.pop(); onBack?.(); } });
      if (fresh) {
        sfx.success();
        toast(`${fresh} lencana baru! +${fresh * BADGE_REWARD} bintang`, { tone: 'mint' });
        const r = body.getBoundingClientRect();
        starBurst(r.left + r.width / 2, r.top + 80, 14);
      }
    },
  });
}
