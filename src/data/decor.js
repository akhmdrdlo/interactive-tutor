/**
 * Katalog dekorasi kamar. Gambarnya ada di src/scenes/decor-art.js dengan id yang sama.
 *
 * zone  : 'floor' (menapak lantai; titik acuan = tengah bawah) atau 'wall' (menempel dinding; acuan = tengah).
 * w, h  : ukuran kotak gambar (satuan dunia) — dipakai untuk thumbnail & batas seret.
 * price : 0 = langsung dimiliki.
 */
export const DECOR = [
  { id: 'bantal', name: 'Bantal Duduk', zone: 'floor', w: 150, h: 80, price: 0 },
  { id: 'tanaman', name: 'Pot Tanaman', zone: 'floor', w: 130, h: 230, price: 15 },
  { id: 'lampu-bintang', name: 'Lampu Bintang', zone: 'floor', w: 110, h: 190, price: 20 },
  { id: 'kelinci', name: 'Boneka Kelinci', zone: 'floor', w: 120, h: 180, price: 25 },
  { id: 'akuarium', name: 'Akuarium Mini', zone: 'floor', w: 190, h: 200, price: 35 },
  { id: 'poster-pelangi', name: 'Poster Pelangi', zone: 'wall', w: 180, h: 210, price: 15 },
  { id: 'jam', name: 'Jam Dinding', zone: 'wall', w: 140, h: 140, price: 20 },
  { id: 'papan-stiker', name: 'Papan Stiker', zone: 'wall', w: 220, h: 170, price: 20 },
  { id: 'lampu-tali', name: 'Lampu Tali', zone: 'wall', w: 440, h: 110, price: 25 },
  { id: 'angklung', name: 'Hiasan Angklung', zone: 'wall', w: 170, h: 210, price: 30 },
  { id: 'beanbag', name: 'Kursi Beanbag', zone: 'floor', w: 170, h: 120, price: 25 },
  { id: 'rumah-kucing', name: 'Rumah Mochi', zone: 'floor', w: 170, h: 160, price: 30 },
  { id: 'karpet-bintang', name: 'Karpet Bintang', zone: 'floor', w: 320, h: 70, price: 25 },
  { id: 'rak-dinding', name: 'Rak Dinding', zone: 'wall', w: 230, h: 130, price: 20 },
  { id: 'bingkai-foto', name: 'Foto Keluarga', zone: 'wall', w: 160, h: 140, price: 15 },
];

export const ZONES = {
  floor: { minY: 770, maxY: 990 },
  wall: { minY: 130, maxY: 470 },
};

export const findDecor = (id) => DECOR.find((d) => d.id === id) ?? null;
