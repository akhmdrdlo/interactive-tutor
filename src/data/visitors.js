/**
 * Teman yang sesekali berkunjung ke kamar. Penampilannya memakai sistem avatar yang sama.
 * greet: kalimat saat datang · ask: ajakan menjawab · bye: pamit · facts: pembuka "tahukah kamu".
 */
export const VISITORS = [
  {
    id: 'nisa',
    name: 'Nisa',
    role: 'teman sekelas',
    avatar: { hair: 'kuncir', color: 1, outfit: 'overall', skin: 2, accessories: ['jepit'] },
    greet: ['Hai! Aku Nisa. Mau belajar bareng? Ketuk aku, ya!', 'Halo! Aku bawa pertanyaan seru, nih!'],
    ask: 'Coba jawab pertanyaanku. Kalau benar, kamu dapat bonus bintang!',
    bye: 'Seru banget belajar bareng kamu. Dadah!',
  },
  {
    id: 'euis',
    name: 'Teh Euis',
    role: 'tétéh dari lembur',
    avatar: { hair: 'kerudung', color: 2, outfit: 'batik', skin: 1, accessories: [] },
    greet: ['Wilujeng sumping! Ieu Tétéh Euis. Hayu diajar babarengan!', 'Punten! Tétéh mampir, yuk belajar sebentar.'],
    ask: 'Tétéh punya beberapa pertanyaan. Kalau benar, ada bonus bintang!',
    bye: 'Hatur nuhun, kamu pinter pisan! Tétéh pamit, nya.',
  },
  {
    id: 'raka',
    name: 'Kak Raka',
    role: 'kakak kelas',
    avatar: { hair: 'bob', color: 1, outfit: 'hoodie', skin: 3, accessories: ['headphone'] },
    greet: ['Yo! Aku Kak Raka. Ada kuis kilat, nih. Berani?', 'Hai! Kakak lagi lewat. Mau tantangan soal?'],
    ask: 'Tiga soal kilat! Jawab yang benar untuk bonus bintang.',
    bye: 'Mantap! Lain kali Kakak bawa soal yang lebih seru.',
  },
  {
    id: 'dinda',
    name: 'Dinda',
    role: 'sepupu',
    avatar: { hair: 'ekorKuda', color: 2, outfit: 'gaun', skin: 0, accessories: ['bando'] },
    greet: ['Haii! Ini Dinda, sepupumu. Main tebak-tebakan pelajaran, yuk!', 'Dinda datang! Aku penasaran kamu sudah belajar apa.'],
    ask: 'Tebak-tebakan dimulai! Jawab yang benar, ya.',
    bye: 'Yeay, makasih! Dinda pulang dulu, ya.',
  },
];
