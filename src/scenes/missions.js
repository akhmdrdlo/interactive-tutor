/** Panel Misi Harian + koleksi stiker. */
import { sfx } from '../core/audio.js';
import { esc } from '../core/dom.js';
import { store } from '../core/store.js';
import { openSheet } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { starBurst, toast } from '../ui/feedback.js';
import { missionState, claimMission, STICKERS, stickerSvg, MISSION_REWARD } from '../core/missions.js';

export function openMissions() {
  openSheet({
    title: 'Misi Hari Ini',
    tone: 'mint',
    render(body) {
      function paint() {
        const list = missionState();
        const owned = store.get().stickers;
        const doneAll = list.every((m) => m.claimed);
        body.innerHTML = `
          <p class="sheet__lead">Selesaikan 3 misi kecil hari ini. Tiap misi +${MISSION_REWARD} bintang, dan kalau ketiganya beres kamu dapat <b>1 stiker baru</b>! Misinya berganti setiap hari.</p>
          <ul class="mission-list">${list.map((m) => `<li class="mission${m.done ? ' is-done' : ''}">
            <span class="mission__icon" aria-hidden="true">${icon(m.done ? 'check' : 'star')}</span>
            <span class="mission__text"><b>${esc(m.text)}</b>
              <span class="mission__bar" role="progressbar" aria-valuemin="0" aria-valuemax="${m.target}" aria-valuenow="${m.count}" aria-label="Kemajuan misi"><span style="width:${(m.count / m.target) * 100}%"></span></span>
              <small>${m.count} / ${m.target}</small></span>
            ${m.claimed ? '<span class="mission__claimed">Sudah diambil</span>'
              : `<button type="button" class="btn btn--small ${m.done ? 'btn--primary' : 'btn--ghost'}" data-claim="${m.id}" ${m.done ? '' : 'disabled'}>Ambil +${MISSION_REWARD}</button>`}
          </li>`).join('')}</ul>
          ${doneAll ? '<p class="mission-done">Semua misi hari ini beres. Hebat! Datang lagi besok untuk misi baru.</p>' : ''}
          <h3 class="set-group">Koleksi Stiker (${owned.length}/${STICKERS.length})</h3>
          <ul class="sticker-grid">${STICKERS.map((st) => `<li class="sticker${owned.includes(st.id) ? '' : ' is-locked'}">
            ${stickerSvg(st)}<span>${owned.includes(st.id) ? esc(st.name) : '???'}</span></li>`).join('')}</ul>`;
      }
      body.addEventListener('click', (e) => {
        const b = e.target.closest('[data-claim]');
        if (!b || b.disabled) return;
        const r = b.getBoundingClientRect();
        const { stars, sticker } = claimMission(b.dataset.claim);
        if (!stars) return;
        sfx.success();
        starBurst(r.left + r.width / 2, r.top + r.height / 2, 10);
        if (sticker) toast(`Stiker baru: ${sticker.name}!`, { tone: 'mint' });
        paint();
      });
      paint();
    },
  });
}
