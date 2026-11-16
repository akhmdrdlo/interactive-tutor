/** Mengacak salinan array. Kalau hasilnya kebetulan sama dengan aslinya, acak ulang. */
export function shuffle(list) {
  const copy = [...list];
  for (let attempt = 0; attempt < 5; attempt += 1) {
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    if (copy.length < 2 || copy.some((item, i) => item !== list[i])) break;
  }
  return copy;
}
