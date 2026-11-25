/**
 * Kamar Utama — dunia selebar WORLD.w yang bisa digeser ke samping.
 *
 * Gerak karakter:
 *   • tombol ◀ ▶ di layar (tahan untuk berjalan), panah keyboard / A-D
 *   • ketuk lantai → berjalan ke titik itu
 *   • ketuk benda → berjalan ke benda itu, lalu membukanya
 * Kamera (scroll horizontal) mengikuti karakter saat berjalan; anak juga bebas
 * menggeser kamar dengan jari, trackpad, atau roda tetikus.
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { $$, onActivate, replayClass, prefersReducedMotion } from '../core/dom.js';
import { avatarLayers, AVATAR_VIEWBOX } from '../character/avatar.js';
import { speechBubble } from '../ui/feedback.js';
import { decorArt } from './decor-art.js';
import { findDecor } from '../data/decor.js';
import * as art from './room-art.js';
import { outdoorDefs, outdoorBackground, frontDoor, BUILDINGS, buildingArt, villageLife } from './outdoor-art.js';

const { WORLD } = art;

const GREETINGS = [
  'Hai! Mau belajar apa hari ini?',
  'Bajuku keren, kan? Ganti di lemari, yuk!',
  'Ayo kumpulkan bintang yang banyak!',
  'Geser aku ke kanan — ada pojok santai dan meja belajar, lho!',
];

const MOCHI_TIPS = [
  'Meong! Klik rak buku untuk mulai belajar, ya.',
  'Tekan tombol panah untuk berjalan ke kiri dan kanan.',
  'Main di komputer bisa dapat bintang juga!',
  'Bintang bisa ditukar dengan baju dan dekorasi kamar.',
  'Salah jawab itu biasa. Kita coba lagi pelan-pelan, ya.',
];

/** Titik berdiri di depan tiap benda (koordinat x dunia). */
const ANCHORS = { subjects: 560, wardrobe: 1180, coding: 1560, decor: 760, bed: 2290, study: 3350, ...Object.fromEntries(BUILDINGS.map((b) => [b.id, b.anchor])) };
const SPEED = 640;          // satuan dunia per detik
const AVATAR = { baseX: 900, width: 270, height: 360, top: 528 };
const MIN_X = 160;
const MAX_X = WORLD.w - 160;

function hotspot({ action, label, tagText, tagAt, body }) {
  return `<g class="hotspot" data-action="${action}" role="button" tabindex="0" aria-label="${label}">
    ${body}
    ${tagText ? art.tag(tagAt[0], tagAt[1], tagText) : ''}
  </g>`;
}

function decorItem(p, editing) {
  const item = findDecor(p.id);
  // Area sentuh seukuran benda: benda berlubang (mis. lampu tali) tetap mudah diseret.
  const hit = item.zone === 'floor'
    ? `<rect class="decor-hit" x="${-item.w / 2}" y="${-item.h}" width="${item.w}" height="${item.h}" fill="transparent"/>`
    : `<rect class="decor-hit" x="${-item.w / 2}" y="${-item.h / 2}" width="${item.w}" height="${item.h}" fill="transparent"/>`;
  return `<g class="decor-pos" data-decor="${p.id}" transform="translate(${p.x} ${p.y})">
    <g class="decor-item${editing ? ' is-editable' : ''}" role="${editing ? 'button' : 'img'}" tabindex="${editing ? 0 : -1}" aria-label="${item.name}${editing ? ', seret untuk memindahkan' : ''}">${editing ? hit : ''}${decorArt(p.id)}</g>
  </g>`;
}

/**
 * @param {HTMLElement} stage   elemen yang di-scroll horizontal
 * @param {Record<string, () => void>} actions
 */
export function mountRoom(stage, actions) {
  const W = WORLD.w;
  stage.innerHTML = `
    <svg class="room" viewBox="0 0 ${W} ${WORLD.h}" style="aspect-ratio:${W} / ${WORLD.h}" preserveAspectRatio="xMinYMid meet"
         xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Kamar belajarmu">
      ${art.defs()}
      <defs>${outdoorDefs()}</defs>
      ${art.background()}
      ${outdoorBackground()}
      <rect class="walk-surface" x="0" y="${WORLD.floorY}" width="${W}" height="${WORLD.h - WORLD.floorY}" fill="transparent"/>
      ${art.windowArt()}
      ${art.frameArt()}
      ${art.roundWindow()}
      ${frontDoor()}
      ${BUILDINGS.map((b) => hotspot({ action: b.id, label: `${b.label}: masuk`, body: buildingArt(b) })).join('')}
      ${villageLife()}
      ${art.bunting()}
      <g id="decor-wall"></g>
      ${art.contactShadows()}
      ${art.rug2()}
      ${art.rugBase()}
      ${hotspot({ action: 'subjects', label: 'Rak buku: buka daftar pelajaran', tagText: 'Rak Buku', tagAt: [530, 128], body: art.bookshelf() })}
      ${hotspot({ action: 'wardrobe', label: 'Lemari baju: ganti gaya', tagText: 'Lemari Baju', tagAt: [1250, 170], body: art.wardrobe() })}
      ${hotspot({ action: 'coding', label: 'Komputer: main minigame koding', tagText: 'Komputer', tagAt: [1610, 336], body: art.desk() })}
      ${hotspot({ action: 'bed', label: 'Tempat tidur', tagText: 'Tempat Tidur', tagAt: [2300, 510], body: art.bed() })}
      ${art.nightstand()}
      ${art.studyBoard()}
      ${hotspot({ action: 'study', label: 'Meja belajar: baca buku dan latihan', tagText: 'Meja Belajar', tagAt: [3350, 160], body: art.studyDesk() })}
      ${art.floorPlant()}
      ${hotspot({ action: 'decor', label: 'Boneka beruang: hias kamarmu', tagText: 'Dekorasi', tagAt: [652, 728], body: art.teddy() })}
      <g id="decor-floor"></g>
      <g id="visitor-layer"></g>
      <g class="mover mover--mochi" transform="translate(0 0)">
        <g class="hotspot hotspot--pet" data-action="pet" role="button" tabindex="0" aria-label="Mochi si kucing: minta tips">
          <ellipse cx="1160" cy="926" rx="62" ry="10" fill="#4A352D" opacity="0.1"/>
          <g class="facing" data-cx="1160">
            <svg class="room-mochi" x="1084" y="796" width="150" height="140" viewBox="0 0 160 150" overflow="visible">${art.mochiSvg()}</svg>
          </g>
        </g>
      </g>
      <g class="mover mover--avatar" transform="translate(0 0)">
        <g class="hotspot hotspot--avatar" data-action="avatar" role="button" tabindex="0" aria-label="Ini kamu! Sapa dirimu">
          <ellipse cx="${AVATAR.baseX}" cy="880" rx="92" ry="14" fill="#4A352D" opacity="0.1"/>
          <g class="facing" data-cx="${AVATAR.baseX}">
            <svg class="room-avatar" x="${AVATAR.baseX - AVATAR.width / 2}" y="${AVATAR.top}" width="${AVATAR.width}" height="${AVATAR.height}"
                 viewBox="${AVATAR_VIEWBOX}" overflow="visible">${avatarLayers(store.get().avatar)}</svg>
          </g>
        </g>
      </g>
      ${art.sunbeams()}
    </svg>`;

  const svg = stage.querySelector('svg.room');
  const avatarMover = svg.querySelector('.mover--avatar');
  const mochiMover = svg.querySelector('.mover--mochi');
  const avatarSvg = svg.querySelector('.room-avatar');
  const mochiSvgEl = svg.querySelector('.room-mochi');
  const wallLayer = svg.querySelector('#decor-wall');
  const floorLayer = svg.querySelector('#decor-floor');
  fitTags(svg);
  document.fonts?.ready.then(() => fitTags(svg));

  /* ── Konversi koordinat ── */
  const scale = () => svg.getBoundingClientRect().height / WORLD.h;
  const toWorld = (clientX, clientY) => {
    const rect = svg.getBoundingClientRect();
    const k = rect.height / WORLD.h;
    return { x: (clientX - rect.left) / k, y: (clientY - rect.top) / k };
  };
  const viewCenterX = () => (stage.scrollLeft + stage.clientWidth / 2) / scale();

  /* ── State gerak ── */
  const state = {
    x: AVATAR.baseX,
    facing: 1,
    keys: new Set(),     // 'left' | 'right' dari keyboard
    hold: 0,             // -1 / 0 / 1 dari tombol layar
    target: null,
    onArrive: null,
    mochiX: 1160,
    mochiFacing: -1,
    follow: false,
    locked: false,       // true saat mode dekorasi
  };

  const setFacing = (mover, cx, dir) => {
    const g = mover.querySelector('.facing');
    g.setAttribute('transform', dir < 0 ? `translate(${cx * 2} 0) scale(-1 1)` : '');
  };

  function centerCamera(x, smooth = false) {
    const goal = x * scale() - stage.clientWidth / 2;
    if (!smooth) { stage.scrollLeft = goal; return; }
    const diff = goal - stage.scrollLeft;
    if (Math.abs(diff) > 1) stage.scrollLeft += diff * 0.12;
  }

  let last = performance.now();
  function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    let dir = state.hold || (state.keys.has('right') ? 1 : 0) - (state.keys.has('left') ? 1 : 0);
    if (state.locked) dir = 0;
    if (dir) { state.target = null; state.onArrive = null; }
    if (!dir && state.target !== null) {
      const diff = state.target - state.x;
      if (Math.abs(diff) < 6) {
        state.x = state.target;
        state.target = null;
        const cb = state.onArrive;
        state.onArrive = null;
        cb?.();
      } else {
        dir = Math.sign(diff);
      }
    }

    const moving = dir !== 0;
    if (moving) {
      const step = dir * SPEED * dt;
      state.x = Math.min(MAX_X, Math.max(MIN_X, state.x + step));
      if (state.target !== null && (state.x === MIN_X || state.x === MAX_X)) state.target = state.x;
      if (dir !== state.facing) { state.facing = dir; setFacing(avatarMover, AVATAR.baseX, dir); }
      state.follow = true;
    }
    avatarMover.setAttribute('transform', `translate(${(state.x - AVATAR.baseX).toFixed(1)} 0)`);
    avatarMover.classList.toggle('is-walking', moving);

    // Mochi membuntuti di belakang karakter.
    const mochiGoal = state.x - state.facing * 210;
    const md = mochiGoal - state.mochiX;
    const mochiMoving = Math.abs(md) > 30;
    if (mochiMoving) {
      state.mochiX += md * Math.min(1, dt * 2.6);
      const mf = Math.sign(md);
      if (mf !== state.mochiFacing) { state.mochiFacing = mf; setFacing(mochiMover, 1160, mf > 0 ? -1 : 1); }
    }
    mochiMover.setAttribute('transform', `translate(${(state.mochiX - 1160).toFixed(1)} 0)`);
    mochiMover.classList.toggle('is-walking', mochiMoving);

    if (state.follow) {
      centerCamera(state.x, !prefersReducedMotion());
      if (!moving) state.follow = false;
    }
    requestAnimationFrame(tick);
  }

  function walkTo(x, onArrive) {
    state.target = Math.min(MAX_X, Math.max(MIN_X, x));
    state.onArrive = onArrive ?? null;
  }

  /* ── Avatar & dekorasi digambar ulang saat data berubah ── */
  let expressionTimer = null;
  let tipIndex = 0;
  let editing = false;
  const paintAvatar = (expression = 'smile') => { avatarSvg.innerHTML = avatarLayers(store.get().avatar, { expression }); };

  function paintDecor() {
    const { placed } = store.get().decor;
    const wall = placed.filter((p) => findDecor(p.id).zone === 'wall');
    const floor = placed.filter((p) => findDecor(p.id).zone === 'floor').sort((a, b) => a.y - b.y);
    wallLayer.innerHTML = wall.map((p) => decorItem(p, editing)).join('');
    floorLayer.innerHTML = floor.map((p) => decorItem(p, editing)).join('');
  }
  paintDecor();

  let lastAvatar = JSON.stringify(store.get().avatar);
  let lastDecor = JSON.stringify(store.get().decor.placed);
  const unsubscribe = store.subscribe((s) => {
    const a = JSON.stringify(s.avatar);
    const d = JSON.stringify(s.decor.placed);
    if (a !== lastAvatar) { lastAvatar = a; paintAvatar(); }
    if (d !== lastDecor) { lastDecor = d; paintDecor(); }
  });

  /* ── Interaksi benda ── */
  const handlers = {
    avatar(el) {
      sfx.pop();
      paintAvatar('happy');
      replayClass(el, 'is-hopping', 520);
      speechBubble(avatarSvg, GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
      clearTimeout(expressionTimer);
      expressionTimer = setTimeout(() => paintAvatar(), 1400);
    },
    pet(el) {
      sfx.meow();
      mochiSvgEl.innerHTML = art.mochiSvg({ eyesClosed: true });
      replayClass(el, 'is-hopping', 520);
      speechBubble(mochiSvgEl, MOCHI_TIPS[tipIndex % MOCHI_TIPS.length], { duration: 4200 });
      tipIndex += 1;
      setTimeout(() => { mochiSvgEl.innerHTML = art.mochiSvg(); }, 900);
    },
    bed() {
      paintAvatar('happy');
      speechBubble(avatarSvg, 'Hoaam… Belajar dulu, nanti malam baru tidur!');
      clearTimeout(expressionTimer);
      expressionTimer = setTimeout(() => paintAvatar(), 1600);
    },
  };

  for (const el of $$('.hotspot', svg)) {
    onActivate(el, () => {
      if (editing) return;
      const action = el.dataset.action;
      if (action === 'avatar' || action === 'pet') return handlers[action](el);
      sfx.pop();
      replayClass(el, 'is-squished', 260);
      const open = () => (handlers[action] ? handlers[action](el) : actions[action]?.());
      const anchor = ANCHORS[action];
      if (anchor == null || Math.abs(anchor - state.x) < 140) setTimeout(open, 160);
      else walkTo(anchor, open);
    });
  }

  // Ketuk lantai kosong → berjalan ke sana.
  svg.querySelector('.walk-surface').addEventListener('click', (event) => {
    if (editing) return;
    walkTo(toWorld(event.clientX, event.clientY).x);
  });

  /* ── Keyboard ── */
  const KEY_DIR = { ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right' };
  const typingOrDialog = (e) => document.querySelector('dialog[open]') || /input|textarea|select/i.test(e.target.tagName);
  const onKeyDown = (e) => {
    const dir = KEY_DIR[e.key];
    if (!dir || typingOrDialog(e)) return;
    state.keys.add(dir);
    e.preventDefault();
  };
  const onKeyUp = (e) => { const dir = KEY_DIR[e.key]; if (dir) state.keys.delete(dir); };
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', () => { state.keys.clear(); state.hold = 0; });

  /* ── Roda tetikus vertikal → geser horizontal ── */
  stage.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { stage.scrollLeft += e.deltaY; e.preventDefault(); }
  }, { passive: false });

  /* ── Tombol ◀ ▶ di layar ── */
  function bindMovePad(pad) {
    for (const btn of pad.querySelectorAll('[data-move]')) {
      const dir = Number(btn.dataset.move);
      const start = (e) => { e.preventDefault(); state.hold = dir; btn.classList.add('is-held'); try { btn.setPointerCapture(e.pointerId); } catch { /* */ } };
      const stop = () => { if (state.hold === dir) state.hold = 0; btn.classList.remove('is-held'); };
      btn.addEventListener('pointerdown', start);
      btn.addEventListener('pointerup', stop);
      btn.addEventListener('pointercancel', stop);
      btn.addEventListener('lostpointercapture', stop);
      // Keyboard: tiap tekan Enter/Spasi = satu langkah pendek.
      btn.addEventListener('click', (e) => { if (e.detail === 0) walkTo(state.x + dir * 220); });
    }
  }

  requestAnimationFrame(() => centerCamera(state.x));
  window.addEventListener('resize', () => centerCamera(state.x));
  requestAnimationFrame(tick);

  return {
    svg,
    stage,
    toWorld,
    scale,
    avatarX: () => state.x,
    visitorLayer: svg.querySelector('#visitor-layer'),
    isBusy: () => editing || Boolean(document.querySelector('dialog[open]')),
    viewCenterX,
    bindMovePad,
    setEditing(value) {
      editing = value;
      state.locked = value;
      state.target = null;
      svg.classList.toggle('is-editing', value);
      paintDecor();
    },
    destroy() {
      unsubscribe();
      clearTimeout(expressionTimer);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    },
  };
}

/** Menyesuaikan lebar latar label dengan panjang teksnya. */
function fitTags(svg) {
  for (const tag of $$('.tag', svg)) {
    const text = tag.querySelector('.tag__text');
    const width = Math.ceil(text.getComputedTextLength()) + 52;
    for (const rect of tag.querySelectorAll('rect')) {
      rect.setAttribute('width', width);
      rect.setAttribute('x', -width / 2);
    }
  }
}
