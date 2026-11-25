/**
 * Level minigame "Jalan Pulang Mochi" (algoritma & perulangan, Koding & KA Bab 1).
 *
 * Peta: S = Mochi, G = ikan (tujuan), # = pot penghalang, . = lantai.
 * maxBlocks: batas jumlah blok (null = bebas). allowRepeat: munculkan pilihan "Ulangi ×n".
 * solution dipakai oleh scripts/check-content.mjs untuk memastikan level bisa diselesaikan.
 */
export const CODING_LEVELS = [
  {
    id: 'lv1',
    title: 'Langkah Pertama',
    intro: 'Bantu aku menuju ikan! Tekan panah untuk menyusun perintah, lalu tekan Jalankan.',
    map: ['.....', 'S..G.', '.....'],
    maxBlocks: null,
    allowRepeat: false,
    reward: 5,
    solution: [['right', 1], ['right', 1], ['right', 1]],
  },
  {
    id: 'lv2',
    title: 'Belok, Yuk!',
    intro: 'Ikannya ada di bawah. Aku perlu ke kanan dulu, lalu turun.',
    map: ['S....', '.....', '..G..', '.....'],
    maxBlocks: null,
    allowRepeat: false,
    reward: 5,
    solution: [['right', 1], ['right', 1], ['down', 1], ['down', 1]],
  },
  {
    id: 'lv3',
    title: 'Awas Pot!',
    intro: 'Ada pot di tengah jalan. Cari jalan memutar, ya.',
    map: ['.....', 'S.#.G', '.....'],
    maxBlocks: null,
    allowRepeat: false,
    reward: 5,
    solution: [['up', 1], ['right', 1], ['right', 1], ['right', 1], ['right', 1], ['down', 1]],
  },
  {
    id: 'lv4',
    title: 'Naik Tangga',
    intro: 'Jalannya seperti anak tangga: kanan, turun, kanan, turun… Kamu lihat polanya?',
    map: ['S.##', '#..#', '##.G'],
    maxBlocks: null,
    allowRepeat: false,
    reward: 5,
    solution: [['right', 1], ['down', 1], ['right', 1], ['down', 1], ['right', 1]],
  },
  {
    id: 'lv5',
    title: 'Kenalan dengan Ulangi',
    intro: 'Jalannya jauh, tapi kamu cuma boleh pakai 1 blok! Pilih "Ulangi ×6", lalu tekan panah kanan.',
    map: ['.......', 'S.....G', '.......'],
    maxBlocks: 1,
    allowRepeat: true,
    reward: 5,
    solution: [['right', 6]],
  },
  {
    id: 'lv6',
    title: 'Huruf L',
    intro: 'Dua blok saja: ulangi ke kanan, lalu ulangi ke bawah.',
    map: ['S.....', '......', '......', '......', '.....G'],
    maxBlocks: 2,
    allowRepeat: true,
    reward: 5,
    solution: [['right', 5], ['down', 4]],
  },
  {
    id: 'lv7',
    title: 'Labirin Kecil',
    intro: 'Pecah jalannya jadi beberapa bagian lurus. Itu namanya dekomposisi!',
    map: ['S...##', '###.##', '#...##', '##...G'],
    maxBlocks: 3,
    allowRepeat: true,
    reward: 5,
    solution: [['right', 3], ['down', 3], ['right', 2]],
  },
  {
    id: 'lv8',
    title: 'Tantangan Akhir',
    intro: 'Labirin besar! Paling banyak 5 blok. Kamu pasti bisa.',
    map: ['S.#...', '.##.#.', '....#.', '##..#.', '#.#.#.', '##...G'],
    maxBlocks: 5,
    allowRepeat: true,
    reward: 8,
    solution: [['down', 2], ['right', 3], ['down', 3], ['right', 2]],
  },
  {
    id: 'lv9',
    title: 'Zig-Zag Ulangi',
    intro: 'Jalan berliku panjang! Pakai Ulangi untuk setiap bagian lurus. Paling banyak 8 blok.',
    map: ['S..#...', '##.#.#.', '...#.#.', '.###.#.', '.....#G'],
    maxBlocks: 8,
    allowRepeat: true,
    reward: 8,
    solution: [['right', 2], ['down', 2], ['left', 2], ['down', 2], ['right', 4], ['up', 4], ['right', 2], ['down', 4]],
  },
  {
    id: 'lv10',
    title: 'Spiral Ikan',
    intro: 'Ikannya di tengah spiral. Pecah jalannya jadi bagian lurus, ya!',
    map: ['S.....', '#####.', '.G.#..', '.####.', '......'],
    maxBlocks: 6,
    allowRepeat: true,
    reward: 8,
    solution: [['right', 5], ['down', 4], ['left', 5], ['up', 2], ['right', 1]],
  },
  {
    id: 'lv11',
    title: 'Dua Jalan',
    intro: 'Ada dua jalan menuju ikan. Cari yang paling sedikit bloknya: maksimal 3!',
    map: ['S...#', '.##.#', '.#..#', '.#.##', '...G.'],
    maxBlocks: 3,
    allowRepeat: true,
    reward: 8,
    solution: [['down', 4], ['right', 3]],
  },
  {
    id: 'lv12',
    title: 'Labirin Raksasa',
    intro: 'Level terakhir! Labirin 7 × 7, paling banyak 7 blok. Kamu programmer hebat!',
    map: ['S.#....', '..#.##.', '..#..#.', '.###.#.', '.....#.', '####.#.', 'G.....#'],
    maxBlocks: 7,
    allowRepeat: true,
    reward: 10,
    solution: [['down', 4], ['right', 4], ['down', 2], ['left', 4]],
  },
];

export const DIRS = {
  up: { dr: -1, dc: 0, label: 'Atas' },
  down: { dr: 1, dc: 0, label: 'Bawah' },
  left: { dr: 0, dc: -1, label: 'Kiri' },
  right: { dr: 0, dc: 1, label: 'Kanan' },
};

/** Mencari S dan G di peta. */
export function parseMap(map) {
  let start = null;
  let goal = null;
  map.forEach((row, r) => [...row].forEach((ch, c) => {
    if (ch === 'S') start = { r, c };
    if (ch === 'G') goal = { r, c };
  }));
  return { start, goal, rows: map.length, cols: map[0].length };
}

/**
 * Menjalankan program dan mengembalikan jejak langkah.
 * @returns {{ steps: Array<{r:number,c:number,dir:string,bump?:boolean}>, result: 'goal'|'bump'|'short' }}
 */
export function simulate(map, program) {
  const { start, goal, rows, cols } = parseMap(map);
  const steps = [];
  let { r, c } = start;
  for (const [dir, count] of program) {
    for (let i = 0; i < count; i += 1) {
      const nr = r + DIRS[dir].dr;
      const nc = c + DIRS[dir].dc;
      const blocked = nr < 0 || nc < 0 || nr >= rows || nc >= cols || map[nr][nc] === '#';
      if (blocked) {
        steps.push({ r, c, dir, bump: true });
        return { steps, result: 'bump' };
      }
      r = nr;
      c = nc;
      steps.push({ r, c, dir });
      if (r === goal.r && c === goal.c) return { steps, result: 'goal' };
    }
  }
  return { steps, result: 'short' };
}
