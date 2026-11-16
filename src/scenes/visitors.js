/**
 * Teman berkunjung: sesekali seorang teman masuk ke kamar, mengajak belajar,
 * dan menanyakan soal ACAK dari semua pelajaran (plus soal hitung buatan otomatis).
 * Jawaban benar memberi bonus bintang (dibatasi per hari). Kalau dicuekin, ia pamit sendiri.
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { esc, onActivate, prefersReducedMotion } from '../core/dom.js';
import { openSheet } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { speechBubble, toast } from '../ui/feedback.js';
import { avatarLayers, renderAvatar, CROP, AVATAR_VIEWBOX } from '../character/avatar.js';
import { VISITORS } from '../data/visitors.js';
import { SUBJECTS } from '../data/subjects.js';
import { pickQuestions } from '../data/question-pool.js';
import { runSession } from '../sandbox/session.js';
import { WORLD } from '../core/world.js';

const FIRST_VISIT_MS = [40_000, 70_000];
const NEXT_VISIT_MS = [150_000, 270_000];
const STAY_MS = 75_000;        // pamit kalau tidak disapa
const VISIT_CAP = 10;          // bonus bintang tamu per hari
const SPEED = 420;
const BASE_X = 900;            // posisi gambar avatar di koordinat dunia
const between = ([a, b]) => a + Math.random() * (b - a);
const pick = (list) => list[Math.floor(Math.random() * list.length)];

let room = null;
let timer = null;
let current = null;            // { visitor, el, x, target, leaving, stayTimer }

export function initVisitors(roomApi) {
  room = roomApi;
  schedule(between(FIRST_VISIT_MS));
}

function schedule(ms) {
  clearTimeout(timer);
  timer = setTimeout(tryVisit, ms);
}

function tryVisit() {
  if (current) return;
  if (room.isBusy() || document.hidden) { schedule(20_000); return; }
  arrive(pick(VISITORS));
}

/* ── Datang & pergi ── */
function arrive(visitor) {
  const viewRight = (room.stage.scrollLeft + room.stage.clientWidth) / room.scale();
  const fromRight = viewRight + 200 < WORLD.w - 100;
  const startX = fromRight ? Math.min(WORLD.w - 140, viewRight + 160) : Math.max(140, room.stage.scrollLeft / room.scale() - 160);
  const ax = room.avatarX();
  const targetX = Math.min(WORLD.w - 180, Math.max(180, ax + (fromRight ? 280 : -280)));

  const el = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  el.setAttribute('class', 'mover mover--visitor is-walking');
  el.innerHTML = `
    <g class="hotspot hotspot--visitor" role="button" tabindex="0" aria-label="${esc(visitor.name)} berkunjung. Ketuk untuk belajar bersama">
      <ellipse cx="${BASE_X}" cy="880" rx="88" ry="13" fill="#4A352D" opacity="0.1"/>
      <g class="facing"><svg class="room-visitor" x="${BASE_X - 125}" y="540" width="250" height="333" viewBox="${AVATAR_VIEWBOX}" overflow="visible">${avatarLayers(visitor.avatar, { prefix: `visitor-${visitor.id}-` })}</svg></g>
      <g transform="translate(${BASE_X} 515)"><g class="visitor-badge">
        <circle r="30" fill="#FCE38A" stroke="#4A352D" stroke-width="4.5"/>
        <text y="12" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="38" fill="#4A352D">!</text>
      </g></g>
    </g>`;
  room.visitorLayer.append(el);
  current = { visitor, el, x: startX, target: targetX, leaving: false };
  face(current, Math.sign(targetX - startX));
  place(current);
  sfx.open();
  toast(`${visitor.name} datang berkunjung!`);

  onActivate(el.querySelector('.hotspot--visitor'), () => {
    if (!current || current.leaving) return;
    sfx.pop();
    openVisit(visitor);
  });

  walk(() => {
    speechBubble(el.querySelector('.room-visitor'), pick(visitor.greet), { duration: 5000 });
    current.stayTimer = setTimeout(() => leave(`Aku pulang dulu, ya. Nanti aku main lagi!`), STAY_MS);
  });
}

function leave(message) {
  if (!current || current.leaving) return;
  const c = current;
  clearTimeout(c.stayTimer);
  c.leaving = true;
  if (message) speechBubble(c.el.querySelector('.room-visitor'), message, { duration: 3000 });
  setTimeout(() => {
    const viewRight = (room.stage.scrollLeft + room.stage.clientWidth) / room.scale();
    c.target = c.x > room.avatarX() ? Math.min(WORLD.w + 300, viewRight + 400) : -300;
    c.el.classList.add('is-walking');
    face(c, Math.sign(c.target - c.x));
    walk(() => {
      c.el.remove();
      current = null;
      schedule(between(NEXT_VISIT_MS));
    });
  }, message ? 1600 : 0);
}

function face(c, dir) {
  c.el.querySelector('.facing').setAttribute('transform', dir < 0 ? `translate(${BASE_X * 2} 0) scale(-1 1)` : '');
}

function place(c) {
  c.el.setAttribute('transform', `translate(${(c.x - BASE_X).toFixed(1)} 0)`);
}

function walk(onArrive) {
  const c = current;
  let last = performance.now();
  if (prefersReducedMotion()) { c.x = c.target; place(c); c.el.classList.remove('is-walking'); onArrive(); return; }
  const step = (now) => {
    if (current !== c) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const diff = c.target - c.x;
    if (Math.abs(diff) < 6) {
      c.x = c.target;
      place(c);
      c.el.classList.remove('is-walking');
      onArrive();
      return;
    }
    c.x += Math.sign(diff) * Math.min(Math.abs(diff), SPEED * dt);
    place(c);
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ── Fakta acak dari Buku Ringkas ── */
async function randomFact() {
  const subject = pick(SUBJECTS.filter((s) => s.reading));
  const book = (await subject.reading()).default;
  const chapter = pick(book.chapters);
  const page = pick(chapter.pages);
  const options = [
    ...chapter.words.map((w) => `"${w.term}" artinya ${w.meaning.charAt(0).toLowerCase()}${w.meaning.slice(1)}`),
    ...(page.points ?? []),
    ...page.text.filter((t) => t.length < 230),
  ];
  return { subject, chapter, text: pick(options) };
}

/* ── Panel kunjungan ── */
function visitorsLeft() {
  const { daily } = store.get();
  const today = new Date().toISOString().slice(0, 10);
  return VISIT_CAP - (daily.date === today ? daily.visits : 0);
}

function openVisit(visitor) {
  clearTimeout(current?.stayTimer);
  openSheet({
    title: `${visitor.name} berkunjung`,
    tone: 'peach',
    render(body, close) {
      const portrait = renderAvatar(visitor.avatar, { prefix: `visit-${visitor.id}-`, viewBox: CROP.hair, expression: 'happy', label: visitor.name });

      function home() {
        body.innerHTML = `
          <div class="visit">
            <div class="visit__hello">
              <span class="visit__face">${portrait}</span>
              <div class="story__bubble"><p class="story__name">${esc(visitor.name)} · ${esc(visitor.role)}</p><p class="story__text">${esc(visitor.ask)}</p></div>
            </div>
            <ul class="game-list">
              <li><button type="button" class="game-card" data-do="quiz">
                <span class="game-card__art" style="background:var(--butter)" aria-hidden="true">${icon('star')}</span>
                <span class="game-card__text"><span class="game-card__title">Jawab pertanyaan ${esc(visitor.name)}</span>
                <span class="game-card__blurb">3 soal acak dari pelajaran apa saja. Bonus tamu hari ini tersisa ${Math.max(0, visitorsLeft())} bintang.</span></span>
              </button></li>
              <li><button type="button" class="game-card" data-do="fact">
                <span class="game-card__art" style="background:var(--sky)" aria-hidden="true">${icon('book')}</span>
                <span class="game-card__text"><span class="game-card__title">Ceritakan sesuatu!</span>
                <span class="game-card__blurb">Dengar "tahukah kamu" dari buku pelajaran, dipilih acak.</span></span>
              </button></li>
            </ul>
          </div>`;
      }

      async function fact() {
        const f = await randomFact();
        body.innerHTML = `
          <div class="visit">
            <div class="visit__hello">
              <span class="visit__face">${portrait}</span>
              <div class="story__bubble">
                <p class="story__name">Tahukah kamu? · ${esc(f.subject.title)}, ${esc(f.chapter.title)}</p>
                <p class="story__text" lang="${f.subject.lang === 'su' ? 'su' : 'id'}">${esc(f.text)}</p>
              </div>
            </div>
            <div class="lesson__nav">
              <button type="button" class="btn btn--ghost" data-do="home">Kembali</button>
              <button type="button" class="btn btn--primary" data-do="fact">Cerita lain</button>
            </div>
          </div>`;
        sfx.select();
      }

      async function quiz() {
        const picked = await pickQuestions(3);
        runSession(body, {
          questions: picked.map((p) => ({ quiz: p.quiz, subjectId: p.subject?.id, tag: `${p.subject?.title ?? ''} · ${p.chapter}` })),
          onFinish: (first) => {
            const earned = store.awardDaily('visits', 2 + first, VISIT_CAP);
            return {
              title: `${visitor.name}: "${first === 3 ? 'Wah, semuanya benar!' : 'Hebat, kamu sudah berusaha!'}"`,
              message: earned ? `Bonus tamu: <b>${earned} bintang</b>!` : 'Bonus tamu hari ini sudah penuh, tapi latihanmu tetap berharga!',
              earned,
            };
          },
          actions: '<button type="button" class="btn btn--ghost" data-action="again">Soal lain</button><button type="button" class="btn btn--primary" data-action="bye">Dadah!</button>',
          onAction: (a) => {
            if (a === 'again') quiz();
            else { close(); setTimeout(() => leave(visitor.bye), 350); }
          },
        });
      }

      body.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-do]');
        if (!btn) return;
        sfx.pop();
        ({ quiz, fact, home })[btn.dataset.do]();
      });
      home();
      // Kalau panel ditutup tanpa pamit, teman tetap menunggu sebentar lalu pulang.
      return () => {
        if (current && !current.leaving) current.stayTimer = setTimeout(() => leave(visitor.bye), 20_000);
      };
    },
  });
}

/** Untuk uji coba di konsol: memanggil tamu sekarang juga. */
export function summonVisitorNow() {
  if (current) return;
  clearTimeout(timer);
  arrive(pick(VISITORS));
}
