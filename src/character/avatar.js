/**
 * Perakit avatar: menggabungkan potongan dari parts.js menjadi lapisan-lapisan
 *   #layer-hair-back → #layer-body → #layer-outfit → #layer-head →
 *   #layer-eyes → #layer-face → #layer-hair → #layer-accessory
 *
 * `prefix` dipakai agar id tetap unik saat beberapa avatar tampil bersamaan
 * (avatar utama memakai prefix kosong → id persis seperti di CLAUDE.md).
 */
import { HAIR, OUTFIT, ACCESSORY, body, head, eyes, face } from './parts.js';
import { SKIN_TONES, HAIR_COLORS, HIJAB_COLORS, DEFAULT_AVATAR } from '../data/wardrobe.js';
import { esc } from '../core/dom.js';

export const AVATAR_VIEWBOX = '0 0 240 320';

/** Potongan viewBox untuk thumbnail di lemari. */
export const CROP = {
  hair: '18 0 204 204',
  outfit: '44 150 152 162',
  accessory: '28 14 184 150',
  full: AVATAR_VIEWBOX,
};

export function colorsFor(hairId) {
  return hairId === 'kerudung' ? HIJAB_COLORS : HAIR_COLORS;
}

/** Isi lapisan avatar (tanpa <svg>) — bisa disisipkan ke SVG lain. */
export function avatarLayers(config, { prefix = '', expression = 'smile' } = {}) {
  const cfg = { ...DEFAULT_AVATAR, ...config };
  const skin = SKIN_TONES[cfg.skin] ?? SKIN_TONES[0];
  const palette = colorsFor(cfg.hair);
  const hairColor = palette[cfg.color] ?? palette[0];
  const hair = (HAIR[cfg.hair] ?? HAIR.bob)(hairColor);
  const outfit = (OUTFIT[cfg.outfit] ?? OUTFIT.seragam)();
  const accessories = cfg.accessories.map((id) => ACCESSORY[id]?.() ?? '').join('');
  const id = (name) => `${prefix}layer-${name}`;

  return `<g class="avatar-figure">`
    + `<g id="${id('hair-back')}" class="layer-hair-back">${hair.back}</g>`
    + `<g id="${id('body')}" class="layer-body">${body(skin)}</g>`
    + `<g id="${id('outfit')}" class="layer-outfit">${outfit}</g>`
    + `<g id="${id('head')}" class="layer-head">${head(skin)}</g>`
    + `<g id="${id('eyes')}" class="layer-eyes">${eyes(expression)}</g>`
    + `<g id="${id('face')}" class="layer-face">${face(expression)}</g>`
    + `<g id="${id('hair')}" class="layer-hair">${hair.front}</g>`
    + `<g id="${id('accessory')}" class="layer-accessory">${accessories}</g>`
    + `</g>`;
}

/** Avatar lengkap sebagai <svg> mandiri. */
export function renderAvatar(config, { prefix = '', expression = 'smile', viewBox = AVATAR_VIEWBOX, label = 'Avatarmu', className = '' } = {}) {
  return `<svg class="avatar ${className}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(label)}">`
    + avatarLayers(config, { prefix, expression })
    + `</svg>`;
}
