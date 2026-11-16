/**
 * Pemutar Buku Cerita Interaktif (lihat src/data/stories.js untuk format adegan).
 * Dua arah: anak memilih pertanyaan untuk tokoh, tokoh menjawab, lalu tokoh balik bertanya.
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { esc } from '../core/dom.js';
import { openSheet } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { starBurst } from '../ui/feedback.js';
import { renderAvatar, CROP } from '../character/avatar.js';
import { mochiSvg } from '../scenes/room-art.js';
import { renderQuiz } from '../quiz/runner.js';
import { mountPizza } from './labs.js';
import { STORIES } from '../data/stories.js';
import { VISITORS } from '../data/visitors.js';
import { SUBJECTS } from '../data/subjects.js';

const STORY_KEY = 'cerita';

function speaker(id, mood) {
  if (id === 'mochi') return { name: 'Mochi', face: `<svg viewBox="0 0 160 150" role="img" aria-label="Mochi">${mochiSvg({ eyesClosed: mood === 'happy' })}</svg>` };
  if (id === 'student') return { name: 'Kamu', face: renderAvatar(store.get().avatar, { prefix: 'st-me-', viewBox: CROP.hair, expression: mood ?? 'smile', label: 'Kamu' }) };
  const v = VISITORS.find((x) => x.id === id);
  return { name: v.name, face: renderAvatar(v.avatar, { prefix: `st-${id}-`, viewBox: CROP.hair, expression: mood ?? 'smile', label: v.name }) };
}

function bubble(sceneSay) {
  const sp = speaker(sceneSay.say, sceneSay.mood);
  const right = sceneSay.say === 'student';
  return `<div class="story ${right ? 'story--student' : 'story--mentor'} lesson-step">
    <div class="story__portrait">${sp.face}</div>
    <div class="story__bubble"><p class="story__name">${esc(sp.name)}</p><p class="story__text">${esc(sceneSay.text)}</p></div>
  </div>`;
}

export function openStories({ onBack } = {}) {
  openSheet({
    title: 'Buku Cerita',
    tone: 'pink',
    silent: true,
    render(body) {
      body.innerHTML = `
        <div class="game-head">
          ${onBack ? `<button type="button" class="btn btn--small btn--ghost" data-back>${icon('back')}<span>Meja belajar</span></button>` : ''}
          <p class="sheet__lead">Cerita bersama teman-teman. Kamu boleh bertanya ke tokohnya, dan mereka juga akan bertanya padamu!</p>
        </div>
        <ul class="game-list">${STORIES.map((s) => {
          const subject = SUBJECTS.find((x) => x.id === s.subject);
          const done = store.isDone(STORY_KEY, s.id);
          return `<li><button type="button" class="game-card" data-story="${s.id}">
            <span class="game-card__art" style="background:${subject.color}" aria-hidden="true">${speaker(s.cast[0]).face}</span>
            <span class="game-card__text"><span class="game-card__title">${esc(s.title)}</span><span class="game-card__blurb">${esc(subject.title)} · ${esc(s.blurb)}</span></span>
            <span class="game-card__status">${done ? 'Sudah dibaca' : `+${s.reward} bintang`}</span>
          </button></li>`;
        }).join('')}</ul>`;
      body.addEventListener('click', (e) => {
        if (e.target.closest('[data-back]')) { sfx.pop(); onBack?.(); return; }
        const c = e.target.closest('[data-story]');
        if (c) { sfx.pop(); playStory(STORIES.find((s) => s.id === c.dataset.story), { onBack: () => openStories({ onBack }) }); }
      });
    },
  });
}

export function playStory(story, { onBack } = {}) {
  const subject = SUBJECTS.find((x) => x.id === story.subject);
  openSheet({
    title: story.title,
    color: subject.color,
    silent: true,
    render(body) {
      let i = 0;
      let quizTotal = story.scenes.filter((s) => s.quiz).length;
      let firstTry = 0;
      body.innerHTML = `
        <div class="lesson">
          <div class="lesson__progress" aria-hidden="true">${story.scenes.map(() => '<span class="pip"></span>').join('')}<span class="pip pip--finish"></span></div>
          <div class="lesson__stage" data-stage></div>
        </div>`;
      const stage = body.querySelector('[data-stage]');
      const pips = [...body.querySelectorAll('.pip')];
      const next = () => { i += 1; show(); };

      function nav(label = 'Lanjut') {
        return `<div class="lesson__nav"><span></span><button type="button" class="btn btn--primary" data-go>${label}</button></div>`;
      }

      function show() {
        pips.forEach((p, k) => { p.classList.toggle('is-done', k < i); p.classList.toggle('is-current', k === i); });
        const sc = story.scenes[i];
        if (!sc) return finish();
        if (sc.say) {
          stage.innerHTML = bubble(sc) + nav();
          stage.querySelector('[data-go]').onclick = () => { sfx.pop(); next(); };
          stage.querySelector('[data-go]').focus();
        } else if (sc.ask) {
          const asked = new Set();
          const paintAsk = (replyHtml = '') => {
            stage.innerHTML = `
              ${replyHtml}
              <div class="ask lesson-step">
                <p class="ask__prompt">${esc(sc.ask.prompt)}</p>
                <div class="ask__options">${sc.ask.options.map((o, k) => `<button type="button" class="ask__opt${asked.has(k) ? ' is-asked' : ''}" data-ask="${k}">${esc(o.label)}</button>`).join('')}</div>
              </div>
              ${asked.size ? nav('Lanjut cerita') : ''}`;
            stage.querySelectorAll('[data-ask]').forEach((b) => { b.onclick = () => {
              const k = Number(b.dataset.ask);
              asked.add(k);
              sfx.select();
              paintAsk(sc.ask.options[k].reply.map(bubble).join(''));
            }; });
            const go = stage.querySelector('[data-go]');
            if (go) go.onclick = () => { sfx.pop(); next(); };
          };
          paintAsk();
        } else if (sc.quiz) {
          renderQuiz(stage, sc.quiz, { subjectId: story.subject, onNext: next, onCorrect: (first) => { if (first) firstTry += 1; } });
        } else if (sc.toy === 'pizza') {
          stage.innerHTML = `<p class="ask__prompt">${esc(sc.text)}</p><div data-toy></div><div class="lesson__nav"><span></span><button type="button" class="btn btn--primary" data-go disabled>Lanjut</button></div>`;
          mountPizza(stage.querySelector('[data-toy]'), { slices: sc.slices, target: sc.target, onSolved: () => {
            const go = stage.querySelector('[data-go]');
            go.disabled = false;
            go.focus();
          } });
          stage.querySelector('[data-go]').onclick = () => { sfx.pop(); next(); };
        }
      }

      function finish() {
        const earned = store.completeLesson(STORY_KEY, story.id, story.reward, quizTotal ? firstTry / quizTotal : 1);
        sfx.success();
        stage.innerHTML = `
          <div class="lesson-step finish">
            <h3 class="finish__title" tabindex="-1">Tamat!</h3>
            <p class="finish__score"><b>${firstTry}</b><span>/${quizTotal} pertanyaan tokoh dijawab benar langsung</span></p>
            <p class="finish__reward">${earned ? icon('star') : icon('check')}<span>${earned ? `Kamu dapat <b>${earned} bintang</b>.` : 'Bintang cerita ini sudah kamu kumpulkan.'}</span></p>
          </div>
          <div class="lesson__nav"><button type="button" class="btn btn--ghost" data-list>Cerita lain</button><button type="button" class="btn btn--primary" data-again>Baca lagi</button></div>`;
        stage.querySelector('.finish__title').focus();
        if (earned) { const r = stage.querySelector('.finish__title').getBoundingClientRect(); starBurst(r.left + r.width / 2, r.top, 12); }
        stage.querySelector('[data-list]').onclick = () => { sfx.pop(); onBack?.(); };
        stage.querySelector('[data-again]').onclick = () => { sfx.pop(); playStory(story, { onBack }); };
      }

      show();
    },
  });
}
