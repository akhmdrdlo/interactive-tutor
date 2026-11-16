/**
 * Dekorasi kamar: toko (tukar bintang), taruh/simpan benda, dan mode atur
 * untuk menyeret benda ke mana saja di dinding atau lantai.
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { esc, html } from '../core/dom.js';
import { openSheet, confirmDialog } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { toast, starBurst } from '../ui/feedback.js';
import { DECOR, ZONES, findDecor } from '../data/decor.js';
import { decorThumb } from './decor-art.js';
import { WORLD } from '../core/world.js';

let room = null;          // API dari mountRoom
let editBar = null;

export function initDecor(roomApi) {
  room = roomApi;
  bindDrag();
}

const isPlaced = (id) => store.get().decor.placed.some((p) => p.id === id);
const isOwned = (id) => store.get().decor.owned.includes(id);

function placeNearView(id) {
  const item = findDecor(id);
  const zone = ZONES[item.zone];
  const x = Math.round(room.viewCenterX() + (Math.random() * 160 - 80));
  const y = item.zone === 'floor' ? 930 : Math.round((zone.minY + zone.maxY) / 2);
  store.update((s) => { s.decor.placed.push({ id, x, y }); });
}

export function openDecor() {
  openSheet({
    title: 'Dekorasi Kamar',
    tone: 'pink',
    render(body, close) {
      function paint() {
        const placedCount = store.get().decor.placed.length;
        body.innerHTML = `
          <div class="decor-head">
            <p class="sheet__lead">Tukar bintang dengan hiasan, lalu taruh di kamar. Benda bisa digeser di mode atur.</p>
            <button type="button" class="btn btn--primary" data-edit ${placedCount ? '' : 'disabled'}>Atur posisi</button>
          </div>
          <ul class="decor-grid">
            ${DECOR.map((d) => {
              const owned = isOwned(d.id);
              const placed = isPlaced(d.id);
              return `<li class="decor-card${placed ? ' is-placed' : ''}">
                <span class="decor-card__thumb">${decorThumb(d.id)}</span>
                <span class="decor-card__name">${esc(d.name)}</span>
                <span class="decor-card__zone">${d.zone === 'wall' ? 'Dinding' : 'Lantai'}</span>
                ${owned
                  ? `<button type="button" class="btn btn--small ${placed ? 'btn--ghost' : 'btn--primary'}" data-toggle="${d.id}">${placed ? 'Simpan ke kotak' : 'Taruh di kamar'}</button>`
                  : `<button type="button" class="btn btn--small btn--ghost" data-buy="${d.id}">${icon('star')}<span>Tukar ${d.price}</span></button>`}
              </li>`;
            }).join('')}
          </ul>`;
      }
      paint();

      body.addEventListener('click', async (event) => {
        const buy = event.target.closest('[data-buy]');
        const toggle = event.target.closest('[data-toggle]');
        if (event.target.closest('[data-edit]')) { close(); setTimeout(() => startEditing(), 250); return; }

        if (buy) {
          const item = findDecor(buy.dataset.buy);
          const { stars } = store.get();
          if (stars < item.price) {
            sfx.nudge();
            toast(`Bintangmu kurang ${item.price - stars} lagi. Yuk belajar atau main di komputer dulu!`);
            return;
          }
          const ok = await confirmDialog({
            title: `Tukar ${item.price} bintang?`,
            message: `${item.name} akan masuk ke kotak dekorasimu. Sisa bintangmu nanti ${stars - item.price}.`,
            yes: 'Tukar!',
            art: decorThumb(item.id),
          });
          if (!ok) return;
          store.update((s) => { s.stars -= item.price; s.decor.owned.push(item.id); });
          sfx.sparkle();
          const r = buy.getBoundingClientRect();
          starBurst(r.left + r.width / 2, r.top, 10);
          toast(`${item.name} sudah jadi milikmu!`, { tone: 'mint' });
          paint();
          return;
        }

        if (toggle) {
          const id = toggle.dataset.toggle;
          if (isPlaced(id)) {
            store.update((s) => { s.decor.placed = s.decor.placed.filter((p) => p.id !== id); });
            sfx.pop();
            paint();
          } else {
            placeNearView(id);
            sfx.select();
            close();
            setTimeout(() => startEditing(id), 250);
          }
        }
      });
    },
  });
}

/* ───────── Mode atur ───────── */

let selected = null;

function startEditing(focusId = null) {
  if (!room) return;
  room.setEditing(true);
  document.body.classList.add('is-decor-editing');
  selected = focusId;
  if (!editBar) {
    editBar = html(`
      <div class="edit-bar" role="toolbar" aria-label="Mode atur dekorasi">
        <p class="edit-bar__msg" data-msg>Seret benda ke tempat yang kamu suka.</p>
        <button type="button" class="btn btn--ghost" data-store disabled>Simpan ke kotak</button>
        <button type="button" class="btn btn--primary" data-done>Selesai</button>
      </div>`);
    document.body.append(editBar);
    editBar.addEventListener('click', (e) => {
      if (e.target.closest('[data-done]')) stopEditing();
      if (e.target.closest('[data-store]') && selected) {
        const id = selected;
        store.update((s) => { s.decor.placed = s.decor.placed.filter((p) => p.id !== id); });
        sfx.pop();
        select(null);
      }
    });
  }
  editBar.hidden = false;
  select(focusId);
  sfx.open();
}

function stopEditing() {
  room.setEditing(false);
  document.body.classList.remove('is-decor-editing');
  editBar.hidden = true;
  selected = null;
  sfx.close();
  toast('Kamarmu makin cantik!', { tone: 'mint' });
}

function select(id) {
  selected = id;
  room.svg.querySelectorAll('.decor-pos').forEach((g) => g.classList.toggle('is-selected', g.dataset.decor === id));
  const storeBtn = editBar?.querySelector('[data-store]');
  if (storeBtn) storeBtn.disabled = !id;
  const msg = editBar?.querySelector('[data-msg]');
  if (msg) msg.textContent = id ? `${findDecor(id).name} dipilih. Seret untuk memindahkan.` : 'Seret benda ke tempat yang kamu suka.';
}

function bindDrag() {
  const svg = room.svg;
  let drag = null;

  svg.addEventListener('pointerdown', (e) => {
    if (!svg.classList.contains('is-editing')) return;
    const pos = e.target.closest('.decor-pos');
    if (!pos) return;
    e.preventDefault();
    const id = pos.dataset.decor;
    const p = store.get().decor.placed.find((d) => d.id === id);
    const w = room.toWorld(e.clientX, e.clientY);
    drag = { id, pos, dx: p.x - w.x, dy: p.y - w.y, x: p.x, y: p.y, moved: false };
    select(id);
    pos.classList.add('is-dragging');
    try { pos.setPointerCapture(e.pointerId); } catch { /* */ }
  });

  svg.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const item = findDecor(drag.id);
    const zone = ZONES[item.zone];
    const w = room.toWorld(e.clientX, e.clientY);
    drag.x = Math.round(Math.min(WORLD.w - 60, Math.max(60, w.x + drag.dx)));
    drag.y = Math.round(Math.min(zone.maxY, Math.max(zone.minY, w.y + drag.dy)));
    drag.moved = true;
    drag.pos.setAttribute('transform', `translate(${drag.x} ${drag.y})`);
    autoScroll(e.clientX);
  });

  const end = () => {
    if (!drag) return;
    const { id, x, y, moved, pos } = drag;
    pos.classList.remove('is-dragging');
    drag = null;
    if (!moved) return;
    store.update((s) => {
      const p = s.decor.placed.find((d) => d.id === id);
      if (p) { p.x = x; p.y = y; }
    });
    sfx.select();
    select(id);
  };
  svg.addEventListener('pointerup', end);
  svg.addEventListener('pointercancel', end);

  // Keyboard di mode atur: Tab ke benda, panah memindahkan.
  svg.addEventListener('keydown', (e) => {
    if (!svg.classList.contains('is-editing')) return;
    const pos = e.target.closest('.decor-pos');
    const step = { ArrowLeft: [-30, 0], ArrowRight: [30, 0], ArrowUp: [0, -20], ArrowDown: [0, 20] }[e.key];
    if (!pos || !step) return;
    e.preventDefault();
    e.stopPropagation();
    const id = pos.dataset.decor;
    const zone = ZONES[findDecor(id).zone];
    store.update((s) => {
      const p = s.decor.placed.find((d) => d.id === id);
      p.x = Math.min(WORLD.w - 60, Math.max(60, p.x + step[0]));
      p.y = Math.min(zone.maxY, Math.max(zone.minY, p.y + step[1]));
    });
    select(id);
    svg.querySelector(`.decor-pos[data-decor="${id}"] .decor-item`)?.focus();
  });
}

/** Saat menyeret dekat tepi layar, kamar ikut bergeser. */
function autoScroll(clientX) {
  const { stage } = room;
  const rect = stage.getBoundingClientRect();
  const edge = 60;
  if (clientX < rect.left + edge) stage.scrollLeft -= 14;
  else if (clientX > rect.right - edge) stage.scrollLeft += 14;
}

