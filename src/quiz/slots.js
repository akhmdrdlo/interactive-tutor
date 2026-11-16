/**
 * Kuis "isi slot" — dipakai dua tipe soal:
 *   drag-match : slot = konsep di kiri,  keping = pasangannya
 *   sequence   : slot = urutan 1, 2, 3…, keping = langkah-langkah
 *
 * Cara main (semuanya bisa dengan sentuhan, mouse, atau keyboard):
 *   • seret keping ke slot, ATAU
 *   • ketuk keping lalu ketuk slot (ketuk slot kosong langsung mengisi keping terpilih
 *     atau keping pertama untuk soal urutan)
 *   • ketuk keping yang sudah terpasang untuk mengembalikannya
 * Saat diperiksa, pasangan yang benar terkunci hijau; yang belum tepat kembali ke baki.
 */
import { esc } from '../core/dom.js';
import { sfx } from '../core/audio.js';
import { shuffle } from './shuffle.js';

export function mountSlots(el, quiz, { onAnswer, onReady }) {
  const isSequence = quiz.type === 'sequence';
  const answers = isSequence ? quiz.steps : quiz.pairs.map((p) => p.right);
  const slotLabels = isSequence ? quiz.steps.map((_, i) => String(i + 1)) : quiz.pairs.map((p) => p.left);
  const pieces = shuffle(answers.map((text, i) => ({ id: `p${i}`, text, answerSlot: i })));

  /** placement[slotIndex] = pieceId | null */
  const placement = answers.map(() => null);
  const lockedSlots = new Set();
  let selected = null;

  el.innerHTML = `
    <div class="slots ${isSequence ? 'slots--sequence' : 'slots--match'}">
      <ol class="slots__targets">
        ${slotLabels.map((label, i) => `
          <li class="slot-row">
            <span class="slot-row__label">${esc(label)}</span>
            <button type="button" class="slot" data-slot="${i}" aria-label="${isSequence ? `Urutan ${i + 1}` : esc(label)}: kosong"></button>
          </li>`).join('')}
      </ol>
      <div class="slots__tray" data-tray aria-label="Keping jawaban"></div>
    </div>`;

  const tray = el.querySelector('[data-tray]');
  const slotEls = [...el.querySelectorAll('.slot')];
  const pieceById = new Map(pieces.map((p) => [p.id, p]));

  function pieceButton(piece, where) {
    return `<button type="button" class="piece${selected === piece.id ? ' is-selected' : ''}" data-piece="${piece.id}"
      aria-pressed="${selected === piece.id}" ${where === 'slot' ? 'aria-label="' + esc(piece.text) + ', ketuk untuk melepas"' : ''}>${esc(piece.text)}</button>`;
  }

  function paint() {
    const placed = new Set(placement.filter(Boolean));
    tray.innerHTML = pieces.filter((p) => !placed.has(p.id)).map((p) => pieceButton(p, 'tray')).join('')
      || '<p class="slots__empty">Semua keping sudah terpasang. Tekan <b>Periksa</b>!</p>';
    slotEls.forEach((slot, i) => {
      const piece = placement[i] ? pieceById.get(placement[i]) : null;
      slot.classList.toggle('is-filled', Boolean(piece));
      slot.classList.toggle('is-locked', lockedSlots.has(i));
      slot.classList.toggle('is-target', Boolean(selected) && !piece);
      slot.innerHTML = piece ? pieceButton(piece, 'slot') : '';
      slot.setAttribute('aria-label', `${isSequence ? `Urutan ${i + 1}` : slotLabels[i]}: ${piece ? piece.text : 'kosong'}`);
    });
    onReady(placement.every(Boolean));
  }

  function place(pieceId, slotIndex) {
    if (lockedSlots.has(slotIndex)) return;
    const from = placement.indexOf(pieceId);
    if (from !== -1) placement[from] = placement[slotIndex]; // tukar bila sudah terpasang
    placement[slotIndex] = pieceId;
    selected = null;
    sfx.select();
    paint();
  }

  function unplace(slotIndex) {
    if (lockedSlots.has(slotIndex)) return;
    placement[slotIndex] = null;
    sfx.pop();
    paint();
  }

  el.addEventListener('click', (event) => {
    if (dragState?.moved) return; // klik palsu sesudah menyeret
    const pieceEl = event.target.closest('.piece');
    const slotEl = event.target.closest('.slot');

    if (pieceEl && slotEl) { unplace(Number(slotEl.dataset.slot)); return; }
    if (pieceEl) {
      selected = selected === pieceEl.dataset.piece ? null : pieceEl.dataset.piece;
      sfx.pop();
      paint();
      el.querySelector(`.slots__tray [data-piece="${selected}"]`)?.focus();
      return;
    }
    if (slotEl) {
      const index = Number(slotEl.dataset.slot);
      const fallback = isSequence ? tray.querySelector('.piece')?.dataset.piece : null;
      const pieceId = selected ?? fallback;
      if (pieceId) place(pieceId, index);
    }
  });

  /* ── Seret dengan pointer (mouse & sentuh) ── */
  let dragState = null;

  el.addEventListener('pointerdown', (event) => {
    const pieceEl = event.target.closest('.piece');
    if (!pieceEl || event.button > 0) return;
    const slotEl = pieceEl.closest('.slot');
    if (slotEl && lockedSlots.has(Number(slotEl.dataset.slot))) return;
    dragState = { pieceId: pieceEl.dataset.piece, startX: event.clientX, startY: event.clientY, moved: false, ghost: null, source: pieceEl };
    try { pieceEl.setPointerCapture(event.pointerId); } catch { /* pointer sintetis/sudah dilepas */ }
  });

  el.addEventListener('pointermove', (event) => {
    if (!dragState) return;
    const dx = event.clientX - dragState.startX;
    const dy = event.clientY - dragState.startY;
    if (!dragState.moved && Math.hypot(dx, dy) < 8) return;
    if (!dragState.moved) {
      dragState.moved = true;
      const rect = dragState.source.getBoundingClientRect();
      const ghost = dragState.source.cloneNode(true);
      ghost.classList.add('piece--ghost');
      ghost.style.width = `${rect.width}px`;
      ghost.style.left = `${rect.left}px`;
      ghost.style.top = `${rect.top}px`;
      // Di dalam <dialog> supaya ikut top layer (kalau di body akan tertutup dialog).
      (el.closest('dialog') ?? document.body).append(ghost);
      dragState.ghost = ghost;
      dragState.offset = { x: dragState.startX - rect.left, y: dragState.startY - rect.top };
      dragState.source.classList.add('is-dragging');
    }
    dragState.ghost.style.left = `${event.clientX - dragState.offset.x}px`;
    dragState.ghost.style.top = `${event.clientY - dragState.offset.y}px`;
    slotEls.forEach((s) => s.classList.remove('is-hover'));
    hoveredSlot(event)?.classList.add('is-hover');
  });

  function hoveredSlot(event) {
    const under = document.elementsFromPoint(event.clientX, event.clientY);
    return under.find((node) => node.classList?.contains('slot')) ?? null;
  }

  function endDrag(event, cancelled = false) {
    if (!dragState || dragState.done) return;
    const state = dragState;
    state.done = true;
    if (state.moved) {
      const slot = cancelled ? null : hoveredSlot(event);
      state.ghost?.remove();
      state.source.classList.remove('is-dragging');
      slotEls.forEach((s) => s.classList.remove('is-hover'));
      if (slot) {
        place(state.pieceId, Number(slot.dataset.slot));
      } else if (!cancelled && event.target && tray.contains(document.elementFromPoint(event.clientX, event.clientY))) {
        const from = placement.indexOf(state.pieceId);
        if (from !== -1) unplace(from);
      }
    }
    // biarkan event click berikutnya melihat `moved`, lalu bersihkan
    setTimeout(() => { if (dragState === state) dragState = null; }, 0);
  }

  el.addEventListener('pointerup', (event) => endDrag(event));
  el.addEventListener('pointercancel', (event) => endDrag(event, true));
  el.addEventListener('lostpointercapture', (event) => { if (dragState?.moved) endDrag(event, true); });

  paint();

  return {
    needsCheck: true,
    check() {
      let allCorrect = true;
      placement.forEach((pieceId, i) => {
        // Bandingkan teks, bukan id: dua keping bertuliskan sama (mis. "Biotik") boleh tertukar.
        const ok = pieceById.get(pieceId)?.text.trim() === answers[i].trim();
        if (ok) lockedSlots.add(i);
        else { allCorrect = false; placement[i] = null; }
      });
      selected = null;
      paint();
      onAnswer(allCorrect);
      return allCorrect;
    },
  };
}
