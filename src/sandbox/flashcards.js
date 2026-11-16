/**
 * Kartu Kosakata: kartu bolak-balik untuk menghafal kata (Inggris, Sunda, Indonesia),
 * lalu kuis kosakata acak dari set yang sama.
 */
import { store } from '../core/store.js';
import { sfx } from '../core/audio.js';
import { esc } from '../core/dom.js';
import { openSheet } from '../ui/sheet.js';
import { icon } from '../ui/icons.js';
import { shuffle } from '../quiz/shuffle.js';
import { VOCAB_SETS } from '../data/vocab.js';
import { SUBJECTS } from '../data/subjects.js';
import { runSession } from './session.js';
import { speak, canSpeak } from '../core/speech.js';

const subjectOf = (set) => SUBJECTS.find((s) => s.id === set.subject);

export function openFlashcards({ onBack } = {}) {
  openSheet({
    title: 'Kartu Kosakata',
    tone: 'peach',
    silent: true,
    render(body) {
      function showSets() {
        const groups = [...new Set(VOCAB_SETS.map((s) => s.subject))];
        body.innerHTML = `
          <div class="game-head">
            ${onBack ? `<button type="button" class="btn btn--small btn--ghost" data-back>${icon('back')}<span>Meja belajar</span></button>` : ''}
            <p class="sheet__lead">Balik kartunya untuk melihat arti. Kalau sudah hafal, coba kuis kosakatanya!</p>
          </div>
          ${groups.map((g) => {
            const subject = SUBJECTS.find((s) => s.id === g);
            return `<h3 class="set-group">${esc(subject.title)}</h3>
              <ul class="set-grid">${VOCAB_SETS.filter((s) => s.subject === g).map((s) => `
                <li><button type="button" class="set-card" data-set="${s.id}" style="--subject:${subject.color}">
                  <span class="set-card__title">${esc(s.title)}</span>
                  <span class="set-card__count">${s.cards.length} kata</span>
                </button></li>`).join('')}</ul>`;
          }).join('')}`;
      }

      function showCards(set) {
        let cards = [...set.cards];
        let i = 0;
        let flipped = false;
        const subject = subjectOf(set);

        function paint() {
          const c = cards[i];
          body.innerHTML = `
            <div class="flash">
              <div class="flash__top">
                <button type="button" class="btn btn--small btn--ghost" data-sets>${icon('back')}<span>Semua set</span></button>
                <p class="flash__title">${esc(set.title)}</p>
                <p class="flash__count">${i + 1} / ${cards.length}</p>
              </div>
              <button type="button" class="flashcard${flipped ? ' is-flipped' : ''}" data-flip style="--subject:${subject.color}"
                aria-label="${esc(flipped ? `${c.back}. ${c.example ?? ''}` : `${c.front}. Ketuk untuk melihat arti`)}">
                <span class="flashcard__face flashcard__face--front" lang="${set.lang}">
                  <span class="flashcard__word">${esc(c.front)}</span>
                  <span class="flashcard__hint">Ketuk untuk membalik</span>
                </span>
                <span class="flashcard__face flashcard__face--back">
                  <span class="flashcard__word flashcard__word--small">${esc(c.back)}</span>
                  ${c.example ? `<span class="flashcard__example" lang="${set.lang}">${esc(c.example)}</span>` : ''}
                </span>
              </button>
              ${canSpeak() ? `<button type="button" class="btn btn--small btn--ghost flash__listen" data-listen>${icon('soundOn')}<span>Dengar</span></button>` : ''}
              <div class="lesson__nav">
                <button type="button" class="btn btn--ghost" data-prev ${i === 0 ? 'disabled' : ''}>${icon('back')}<span>Sebelumnya</span></button>
                <button type="button" class="btn btn--ghost" data-shuffle>Acak</button>
                ${i < cards.length - 1
                  ? '<button type="button" class="btn btn--primary" data-next>Kartu berikutnya</button>'
                  : '<button type="button" class="btn btn--primary" data-quiz>Kuis kosakata</button>'}
              </div>
            </div>`;
        }

        function quiz() {
          body.onclick = null; // sesi kuis punya tombolnya sendiri
          const pool = set.cards;
          const questions = shuffle(pool).slice(0, Math.min(6, pool.length)).map((card, n) => {
            const reverse = n % 2 === 1; // selang-seling: kata → arti, arti → kata
            const others = shuffle(pool.filter((c) => c !== card)).slice(0, 2);
            const options = shuffle([card, ...others]).map((c, k) => ({ id: String(k), label: reverse ? c.front : c.back, ok: c === card }));
            return {
              quiz: {
                type: 'multiple-choice',
                prompt: reverse ? `Apa bahasa ${set.langName} dari "${card.back}"?` : `"${card.front}" artinya …`,
                options: options.map(({ id, label }) => ({ id, label })),
                answer: options.find((o) => o.ok).id,
                hint: card.example ? `Petunjuk: ${card.example}` : 'Balik lagi kartunya kalau lupa, ya.',
              },
            };
          });
          runSession(body, {
            questions,
            onFinish: (first, total) => {
              const earned = store.awardDaily('practice', Math.floor(first / 2), 10);
              return {
                title: first === total ? 'Kamu hafal semuanya!' : 'Kuis kosakata selesai!',
                message: earned ? `Bonus latihan: <b>${earned} bintang</b>.` : 'Ulangi kartunya sekali lagi supaya makin hafal!',
                earned,
              };
            },
            actions: '<button type="button" class="btn btn--ghost" data-action="cards">Lihat kartu</button><button type="button" class="btn btn--primary" data-action="again">Kuis lagi</button>',
            onAction: (a) => (a === 'again' ? quiz() : showCards(set)),
          });
        }

        body.onclick = (e) => {
          const t = e.target;
          if (t.closest('[data-sets]')) { sfx.pop(); body.onclick = null; showSets(); return; }
          if (t.closest('[data-listen]')) { const c = cards[i]; speak(flipped ? `${c.back}. ${c.example ?? ''}` : c.front, flipped ? 'id' : set.lang); return; }
          if (t.closest('[data-flip]')) { flipped = !flipped; sfx.select(); paint(); body.querySelector('[data-flip]').focus(); return; }
          if (t.closest('[data-next]')) { i += 1; flipped = false; sfx.pop(); paint(); return; }
          if (t.closest('[data-prev]')) { i -= 1; flipped = false; sfx.pop(); paint(); return; }
          if (t.closest('[data-shuffle]')) { cards = shuffle(cards); i = 0; flipped = false; sfx.pop(); paint(); return; }
          if (t.closest('[data-quiz]')) { sfx.pop(); quiz(); }
        };
        paint();
      }

      body.addEventListener('click', (e) => {
        if (e.target.closest('[data-back]')) { sfx.pop(); onBack?.(); return; }
        const card = e.target.closest('[data-set]');
        if (card) { sfx.pop(); showCards(VOCAB_SETS.find((s) => s.id === card.dataset.set)); }
      });
      showSets();
    },
  });
}
