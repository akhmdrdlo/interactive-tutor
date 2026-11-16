/**
 * Membacakan teks dengan suara bawaan browser (Web Speech API) — tanpa file audio & tanpa server.
 * Basa Sunda belum punya suara bawaan, jadi dibacakan dengan suara bahasa Indonesia.
 */
const LANG = { en: 'en-US', id: 'id-ID', su: 'id-ID' };

export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

export function speak(text, lang = 'id') {
  if (!canSpeak()) return false;
  const code = LANG[lang] ?? 'id-ID';
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = code;
  u.rate = 0.85;
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang.replace('_', '-').startsWith(code.slice(0, 2)));
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
  return true;
}

export const stopSpeaking = () => { if (canSpeak()) window.speechSynthesis.cancel(); };
