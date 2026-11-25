/**
 * Lemari Baju & Cermin — ganti rambut, baju, warna kulit, aksesoris,
 * dan tukar bintang dengan item baru.
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { esc, replayClass } from '../core/dom.js';
import { openSheet, confirmDialog } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { toast, starBurst } from '../ui/feedback.js';
import { renderAvatar, colorsFor, CROP } from '../character/avatar.js';
import { WARDROBE, SKIN_TONES } from '../data/wardrobe.js';
import { markMission } from '../core/missions.js';

const TABS = [
  { id: 'hair', label: 'Rambut' },
  { id: 'outfit', label: 'Baju' },
  { id: 'skin', label: 'Kulit' },
  { id: 'accessory', label: 'Aksesoris' },
];

export function openWardrobe() {
  markMission('wardrobe');
  openSheet({
    title: 'Lemari Baju',
    tone: 'peach',
    render(body) {
      let tab = 'hair';
      let mood = 'smile';
      let moodTimer = null;

      body.innerHTML = `
        <div class="wardrobe">
          <figure class="mirror" aria-live="polite">
            <div class="mirror__frame"><div class="mirror__glass" data-preview></div></div>
            <figcaption class="mirror__caption" data-caption></figcaption>
          </figure>
          <div class="closet">
            <div class="tabs" role="tablist" aria-label="Kategori">
              ${TABS.map((t) => `<button type="button" role="tab" class="tab" data-tab="${t.id}" id="tab-${t.id}" aria-controls="closet-panel">${t.label}</button>`).join('')}
            </div>
            <div class="closet__panel" id="closet-panel" role="tabpanel" data-panel></div>
          </div>
        </div>`;

      const preview = body.querySelector('[data-preview]');
      const caption = body.querySelector('[data-caption]');
      const panel = body.querySelector('[data-panel]');

      function paintPreview() {
        const { avatar } = store.get();
        preview.innerHTML = renderAvatar(avatar, { prefix: 'mirror-', expression: mood, label: 'Bayanganmu di cermin' });
        const hair = WARDROBE.hair.find((i) => i.id === avatar.hair)?.name;
        const outfit = WARDROBE.outfit.find((i) => i.id === avatar.outfit)?.name;
        caption.textContent = `${hair} · ${outfit}`;
      }

      function celebrate() {
        mood = 'happy';
        clearTimeout(moodTimer);
        moodTimer = setTimeout(() => { mood = 'smile'; paintPreview(); }, 1100);
        paintPreview();
        replayClass(preview, 'is-hopping', 500);
      }

      function itemCard(category, item, { owned, selected, thumb }) {
        const locked = !owned;
        return `<button type="button" class="item-card${selected ? ' is-selected' : ''}${locked ? ' is-locked' : ''}"
            data-category="${category}" data-id="${item.id}" aria-pressed="${selected}"
            aria-label="${esc(item.name)}${locked ? `, tukar ${item.price} bintang` : ''}">
          <span class="item-card__thumb">${thumb}</span>
          <span class="item-card__name">${esc(item.name)}</span>
          ${selected ? `<span class="item-card__badge">${icon('check')}</span>` : ''}
          ${locked ? `<span class="item-card__price">${icon('star')}<b>${item.price}</b></span>` : ''}
        </button>`;
      }

      function paintPanel() {
        const state = store.get();
        const { avatar, owned } = state;
        body.querySelectorAll('[data-tab]').forEach((btn) => {
          const active = btn.dataset.tab === tab;
          btn.classList.toggle('is-active', active);
          btn.setAttribute('aria-selected', String(active));
          btn.tabIndex = active ? 0 : -1;
        });
        panel.setAttribute('aria-labelledby', `tab-${tab}`);

        if (tab === 'skin') {
          panel.innerHTML = `<p class="closet__hint">Pilih warna kulit yang paling mirip denganmu.</p>
            <div class="swatches">${SKIN_TONES.map((s, i) => `
              <button type="button" class="swatch swatch--lg${avatar.skin === i ? ' is-selected' : ''}" data-skin="${i}"
                style="--swatch:${s.base}" aria-label="${s.name}" aria-pressed="${avatar.skin === i}"></button>`).join('')}
            </div>`;
          return;
        }

        const items = WARDROBE[tab];
        const cards = items.map((item) => {
          // Thumbnail baju memakai rambut bob agar kerudung/rambut panjang tidak menutupi bajunya.
          const preview = {
            hair: { ...avatar, accessories: [], hair: item.id },
            outfit: { ...avatar, accessories: [], hair: 'bob', outfit: item.id },
            accessory: { ...avatar, accessories: [item.id] },
          }[tab];
          const selected = tab === 'accessory' ? avatar.accessories.includes(item.id) : avatar[tab] === item.id;
          const thumb = renderAvatar(preview, { prefix: `thumb-${tab}-${item.id}-`, viewBox: CROP[tab], label: '' });
          return itemCard(tab, item, { owned: owned[tab].includes(item.id), selected, thumb });
        }).join('');

        const colors = tab === 'hair' ? colorsFor(avatar.hair) : null;
        panel.innerHTML = `
          ${tab === 'accessory' ? '<p class="closet__hint">Boleh pakai lebih dari satu, lho!</p>' : ''}
          <div class="item-grid">${cards}</div>
          ${colors ? `<p class="closet__label">${avatar.hair === 'kerudung' ? 'Warna kerudung' : 'Warna rambut'}</p>
            <div class="swatches">${colors.map((c, i) => `
              <button type="button" class="swatch${avatar.color === i ? ' is-selected' : ''}" data-color="${i}"
                style="--swatch:${c.base}" aria-label="${c.name}" aria-pressed="${avatar.color === i}"></button>`).join('')}
            </div>` : ''}`;
      }

      async function buy(category, item) {
        const { stars } = store.get();
        if (stars < item.price) {
          sfx.nudge();
          toast(`Bintangmu kurang ${item.price - stars} lagi. Yuk belajar dulu untuk mengumpulkan bintang!`);
          return false;
        }
        const ok = await confirmDialog({
          title: `Tukar ${item.price} bintang?`,
          message: `${item.name} akan masuk ke lemarimu. Sisa bintangmu nanti ${stars - item.price}.`,
          yes: 'Tukar!',
          art: renderAvatar({ ...store.get().avatar, accessories: category === 'accessory' ? [item.id] : store.get().avatar.accessories }, { prefix: 'confirm-', viewBox: CROP[category], label: '' }),
        });
        if (!ok) return false;
        store.update((s) => {
          s.stars -= item.price;
          s.owned[category].push(item.id);
        });
        sfx.sparkle();
        toast(`Yay! ${item.name} sekarang milikmu.`, { tone: 'mint' });
        return true;
      }

      async function onPick(event) {
        const card = event.target.closest('.item-card');
        const swatch = event.target.closest('.swatch');
        const tabBtn = event.target.closest('[data-tab]');

        if (tabBtn) {
          tab = tabBtn.dataset.tab;
          sfx.pop();
          paintPanel();
          return;
        }

        if (swatch) {
          store.update((s) => {
            if (swatch.dataset.skin !== undefined) s.avatar.skin = Number(swatch.dataset.skin);
            if (swatch.dataset.color !== undefined) s.avatar.color = Number(swatch.dataset.color);
          });
          sfx.select();
          celebrate();
          paintPanel();
          body.querySelector(`.swatch[data-${swatch.dataset.skin !== undefined ? 'skin' : 'color'}="${swatch.dataset.skin ?? swatch.dataset.color}"]`)?.focus();
          return;
        }

        if (!card) return;
        const { category, id } = card.dataset;
        const item = WARDROBE[category].find((i) => i.id === id);
        if (!store.get().owned[category].includes(id)) {
          const bought = await buy(category, item);
          if (!bought) return;
          const rect = card.getBoundingClientRect();
          starBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }

        store.update((s) => {
          if (category === 'accessory') {
            const list = s.avatar.accessories;
            s.avatar.accessories = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
          } else {
            s.avatar[category] = id;
          }
        });
        sfx.select();
        celebrate();
        paintPanel();
        body.querySelector(`.item-card[data-id="${id}"]`)?.focus();
      }

      // Panah kiri/kanan untuk berpindah tab (pola tablist standar).
      function onTabKey(event) {
        const btn = event.target.closest('[data-tab]');
        if (!btn || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        const index = TABS.findIndex((t) => t.id === btn.dataset.tab);
        const next = TABS[(index + (event.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length];
        tab = next.id;
        paintPanel();
        body.querySelector(`[data-tab="${tab}"]`).focus();
      }

      body.addEventListener('click', onPick);
      body.addEventListener('keydown', onTabKey);
      paintPreview();
      paintPanel();
      return () => clearTimeout(moodTimer);
    },
  });
}
