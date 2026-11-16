/**
 * Palet warna — satu sumber kebenaran untuk CSS *dan* SVG.
 *
 * Aturan pemilihan:
 *  - Warna yang ditulis di CLAUDE.md §3 dipakai apa adanya (dokumen utama proyek).
 *  - Warna yang hanya ada di BRANDKIT.md (lantai, kayu, kulit, blush, mata, hover, teks mint)
 *    diambil dari BRANDKIT.md.
 *
 * main.js menyuntikkan setiap kunci sebagai CSS custom property: `cocoa` → `--cocoa`.
 */
export const C = {
  // Dinding & permukaan kamar
  wall: '#FBF5EE',          // Soft Cream Wall (CLAUDE.md)
  linen: '#EFE3D5',         // Warm Linen / Sand (CLAUDE.md)
  molding: '#E8D8CA',       // Panel molding (BRANDKIT)
  floor: '#E6DCE5',         // Lantai lilac-cream (BRANDKIT)
  floorLine: '#DFD3DE',
  glow: 'rgba(255, 236, 195, 0.35)', // Sunlight Glow Overlay (CLAUDE.md)
  card: '#FFF9F2',          // Kartu materi / dialog (BRANDKIT)

  // Aksen
  pink: '#F2A6B8',          // Dusty Blush Pink — tombol utama (CLAUDE.md)
  pinkHover: '#F28B9E',     // (BRANDKIT)
  peach: '#F7C5A8',
  mint: '#A8D8B9',          // Benar / selesai (CLAUDE.md)
  mintInk: '#2D6A4F',       // Teks/ikon di atas mint (BRANDKIT)
  sky: '#B5D8EB',
  butter: '#FCE38A',        // Koin / bintang / lampu (CLAUDE.md)
  butterDeep: '#F6AD55',
  wood: '#D4A373',          // Rak, meja, lemari (BRANDKIT)
  woodLight: '#E6CCB2',
  woodDeep: '#B9875A',

  // Garis & teks
  cocoa: '#4A352D',         // Wajib untuk outline & border (CLAUDE.md) — jangan pakai #000
  inkSoft: '#7D635B',
  shadowSoft: '#D8C3B4',
  white: '#FFFFFF',
  focus: '#5A9EC4',         // cincin fokus keyboard (biru langit yang lebih tua agar kontras)

  // Karakter (BRANDKIT)
  blush: '#FF9AA2',
  eye: '#3D2C2E',
};

/** Ketebalan outline standar (dalam satuan viewBox). Brand: 2.5–3.5px. */
export const STROKE = 3;

/** Atribut outline cocoa yang dipakai berulang di semua SVG. */
export const OUTLINE = `stroke="${C.cocoa}" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round"`;

export function injectCssVars(root = document.documentElement) {
  for (const [key, value] of Object.entries(C)) {
    const cssName = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
    root.style.setProperty(`--${cssName}`, value);
  }
}
