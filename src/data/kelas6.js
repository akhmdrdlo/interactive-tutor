/**
 * Mata pelajaran Kelas 6 SD (Kurikulum Merdeka Fase C) — dibuka dari gedung Sekolah Kelas 6 di Kampung SDaya.
 * Sumber: buku siswa resmi di sumber/kelas6/<mapel>/ (diunduh dari SIBI Kemendikdasmen).
 * Id diberi akhiran "-6" supaya progres Kelas 5 dan Kelas 6 tersimpan terpisah.
 *
 * Belum ada di katalog nasional: Basa Sunda (muatan lokal), Koding & KA, dan buku siswa Seni Rupa Kelas 6.
 */
export const SUBJECTS6 = [
  { id: 'ipas-6', title: 'IPAS', book: 'Ilmu Pengetahuan Alam dan Sosial Kelas VI (Edisi Revisi)', color: '#A8D8B9', icon: 'leaf', lang: 'id', load: () => import('./kelas6/ipas.js') },
  { id: 'matematika-6', title: 'Matematika', book: 'Matematika Kelas VI', color: '#FCE38A', icon: 'math', lang: 'id', load: () => import('./kelas6/matematika.js') },
  { id: 'bahasa-indonesia-6', title: 'Bahasa Indonesia', book: 'Anak-Anak yang Mengubah Dunia', color: '#F2A6B8', icon: 'book', lang: 'id', load: () => import('./kelas6/bahasa-indonesia.js') },
  { id: 'bahasa-inggris-6', title: 'Bahasa Inggris', book: 'English for Nusantara Kids', color: '#B5D8EB', icon: 'chat', lang: 'en', load: () => import('./kelas6/bahasa-inggris.js') },
  { id: 'pai-6', title: 'PAI & Budi Pekerti', book: 'Pendidikan Agama Islam dan Budi Pekerti Kelas VI', color: '#D9C8EC', icon: 'moon', lang: 'id', load: () => import('./kelas6/pai.js') },
  { id: 'pancasila-6', title: 'Pendidikan Pancasila', book: 'Pendidikan Pancasila Kelas VI (Edisi Revisi)', color: '#F7C5A8', icon: 'shield', lang: 'id', load: () => import('./kelas6/pancasila.js') },
];
