/**
 * Daftar 9 mata pelajaran Kelas 5 SD (Kurikulum Merdeka Fase C).
 *
 * `load` menunjuk ke file materi per mapel (skema seragam, lihat subjects/_schema.js).
 * `reading` menunjuk ke Buku Ringkas (isi buku yang disederhanakan) di books/<mapel>.js.
 * Mapel yang belum punya file materi cukup diberi `load: null` — tampil sebagai "segera hadir".
 */
export const SUBJECTS = [
  { id: 'ipas', title: 'IPAS', book: 'Ilmu Pengetahuan Alam dan Sosial (Edisi Revisi)', color: '#A8D8B9', icon: 'leaf', lang: 'id', load: () => import('./subjects/ipas.js'), reading: () => import('./books/ipas.js') },
  { id: 'matematika', title: 'Matematika', book: 'Matematika', color: '#FCE38A', icon: 'math', lang: 'id', load: () => import('./subjects/matematika.js'), reading: () => import('./books/matematika.js') },
  { id: 'bahasa-indonesia', title: 'Bahasa Indonesia', book: 'Bahasa Indonesia', color: '#F2A6B8', icon: 'book', lang: 'id', load: () => import('./subjects/bahasa-indonesia.js'), reading: () => import('./books/bahasa-indonesia.js') },
  { id: 'bahasa-inggris', title: 'Bahasa Inggris', book: 'My Next Words', color: '#B5D8EB', icon: 'chat', lang: 'en', load: () => import('./subjects/bahasa-inggris.js'), reading: () => import('./books/bahasa-inggris.js') },
  { id: 'pai', title: 'PAI & Budi Pekerti', book: 'Pendidikan Agama Islam dan Budi Pekerti', color: '#D9C8EC', icon: 'moon', lang: 'id', load: () => import('./subjects/pai.js'), reading: () => import('./books/pai.js') },
  { id: 'pancasila', title: 'Pendidikan Pancasila', book: 'Pendidikan Pancasila', color: '#F7C5A8', icon: 'shield', lang: 'id', load: () => import('./subjects/pancasila.js'), reading: () => import('./books/pancasila.js') },
  { id: 'basa-sunda', title: 'Basa Sunda', book: 'Tuturus Catur', color: '#D4E6A5', icon: 'angklung', lang: 'su', load: () => import('./subjects/basa-sunda.js'), reading: () => import('./books/basa-sunda.js') },
  { id: 'seni-rupa', title: 'Seni Rupa', book: 'Seni Rupa', color: '#FFD6A5', icon: 'palette', lang: 'id', load: null, soon: 'Buku Seni Rupa belum ada di rak. Minta guru menaruh bukunya di folder sumber/seni-rupa, ya!' },
  { id: 'koding', title: 'Koding & KA', book: 'Koding dan Kecerdasan Artifisial', color: '#B8E0D2', icon: 'code', lang: 'id', load: () => import('./subjects/koding.js'), reading: () => import('./books/koding.js') },
];
