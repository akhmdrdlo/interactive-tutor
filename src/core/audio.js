/**
 * Efek suara sintetis lembut dengan Web Audio API — tanpa file MP3.
 * Semua bunyi pendek, volume rendah, dan bernada "mainan" (sine/triangle).
 */
let ctx = null;
let master = null;
let enabled = true;

function audio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume()?.catch?.(() => {});
  return ctx;
}

function tone(opts) {
  // Suara hanya hiasan: browser HP dengan Web Audio tidak lengkap tidak boleh membuat aplikasi macet.
  try { toneUnsafe(opts); } catch { enabled = false; }
}

function toneUnsafe({ freq, to, dur = 0.14, type = 'sine', gain = 0.16, delay = 0 }) {
  if (!enabled) return;
  const c = audio();
  if (!c) return;
  const t = c.currentTime + delay;
  const osc = c.createOscillator();
  const env = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(gain, t + 0.012);
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(env).connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.03);
}

export const sfx = {
  setEnabled(value) { enabled = value; },
  /** Klik benda / tombol */
  pop() { tone({ freq: 520, to: 880, dur: 0.1, type: 'triangle', gain: 0.14 }); },
  /** Membuka panel */
  open() { tone({ freq: 392, dur: 0.1 }); tone({ freq: 587, dur: 0.14, delay: 0.07 }); },
  /** Menutup panel */
  close() { tone({ freq: 587, dur: 0.09 }); tone({ freq: 392, dur: 0.12, delay: 0.06 }); },
  /** Memilih item */
  select() { tone({ freq: 660, to: 990, dur: 0.12, type: 'triangle', gain: 0.12 }); },
  /** Jawaban benar / pelajaran selesai */
  success() { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone({ freq: f, dur: 0.2, delay: i * 0.08, gain: 0.12 })); },
  /** Menukar bintang */
  sparkle() { [1318.5, 1567.98, 2093].forEach((f, i) => tone({ freq: f, dur: 0.12, delay: i * 0.05, type: 'triangle', gain: 0.07 })); },
  /** "Hampir tepat" — naik pelan, bukan bunyi gagal */
  nudge() { tone({ freq: 330, to: 392, dur: 0.18, type: 'triangle', gain: 0.1 }); },
  /** Mochi si kucing */
  meow() { tone({ freq: 760, to: 520, dur: 0.16, type: 'triangle', gain: 0.1 }); tone({ freq: 520, to: 700, dur: 0.18, type: 'triangle', gain: 0.09, delay: 0.15 }); },
};
