/**
 * Buku Ringkas Koding dan Kecerdasan Artifisial Kelas V.
 * Sumber: sumber/koding/koding-kecerdasan-artifisial-buku-siswa-kelas5.pdf. Id bab sama dengan subjects/koding.js.
 */
export default {
  id: 'koding',
  chapters: [
    {
      id: 'bab1',
      title: 'Berpikir Komputasional: Menemukan Solusi',
      pages: [
        {
          heading: 'Memahami masalah',
          text: [
            'Berpikir komputasional adalah cara berpikir yang teratur, sistematis, dan logis untuk memecahkan masalah sehari-hari. Bukan berarti berpikir seperti robot, lho!',
            'Langkah pertama selalu memahami masalah, disebut analisis masalah. Pepi sering terlambat. Setelah dianalisis, penyebabnya: tidak menyiapkan barang sebelum tidur dan bangun kesiangan.',
          ],
        },
        {
          heading: 'Empat jurus',
          text: ['Berpikir komputasional punya empat jurus:'],
          points: [
            'Dekomposisi: memecah masalah besar menjadi bagian kecil.',
            'Pengenalan pola: menemukan hal yang berulang, misalnya jadwal pelajaran tiap minggu atau pola bilangan 2, 4, 6, 8.',
            'Abstraksi: fokus pada hal penting dan mengabaikan yang tidak perlu.',
            'Algoritma: menyusun langkah berurutan untuk menyelesaikan masalah.',
          ],
        },
        {
          heading: 'Algoritma dan pseudocode',
          text: [
            'Algoritma ada di mana-mana: resep, cara mencuci tangan, atau rute ke sekolah. Kalau urutannya tertukar, hasilnya bisa kacau.',
            'Langkah algoritma yang ditulis singkat dan rapi seperti perintah program disebut pseudocode (dibaca "syu-dokod"). Coba latih algoritmamu di minigame Jalan Pulang Mochi!',
          ],
        },
      ],
      words: [
        { term: 'Dekomposisi', meaning: 'Memecah masalah besar menjadi bagian kecil.' },
        { term: 'Pengenalan pola', meaning: 'Menemukan kesamaan atau hal yang berulang.' },
        { term: 'Abstraksi', meaning: 'Fokus pada informasi yang penting saja.' },
        { term: 'Algoritma', meaning: 'Langkah berurutan untuk menyelesaikan masalah.' },
        { term: 'Pseudocode', meaning: 'Algoritma yang ditulis seperti perintah program.' },
      ],
    },
    {
      id: 'bab2',
      title: 'Mengenal Teknologi Digital',
      pages: [
        {
          heading: 'Analog dan digital',
          text: [
            'Teknologi yang bekerja secara manual, seperti menulis surat atau jam dengan jarum, disebut teknologi analog.',
            'Teknologi yang memakai alat elektronik, seperti ponsel, komputer, televisi, atau jam digital, disebut teknologi digital.',
          ],
        },
        {
          heading: 'Bagian-bagian komputer',
          text: ['Komputer bekerja karena dua bagian penting:'],
          points: ['Perangkat keras (hardware): bagian fisik yang bisa dilihat dan disentuh, misalnya layar, papan ketik, tetikus, dan CPU.', 'Perangkat lunak (software): program atau aplikasi di dalamnya, misalnya peramban internet dan aplikasi pengolah kata.'],
          note: 'Alur kerja komputer: Masukan (input) → Proses → Luaran (output).',
        },
        {
          heading: 'Menjaga informasi pribadi',
          text: [
            'Kebocoran informasi pribadi terjadi ketika data tentang dirimu menyebar tanpa izin, apalagi kepada orang yang tidak kamu kenal.',
            'Jangan bagikan alamat rumah, nomor telepon, atau kata sandi. Buat kata sandi yang sulit ditebak — bukan "123456" atau "password". Kalau ragu, tanyakan orang tua atau guru.',
          ],
        },
      ],
      words: [
        { term: 'Perangkat keras', meaning: 'Bagian fisik komputer yang bisa disentuh.' },
        { term: 'Perangkat lunak', meaning: 'Program atau aplikasi di dalam komputer.' },
        { term: 'Input', meaning: 'Perintah atau data yang kita berikan ke komputer.' },
        { term: 'Output', meaning: 'Hasil yang bisa dilihat, didengar, atau dicetak.' },
        { term: 'Kata sandi', meaning: 'Kunci rahasia untuk masuk ke akun.' },
      ],
    },
    {
      id: 'bab3',
      title: 'Kecerdasan Artifisial: Teman Baru di Dunia Digital',
      pages: [
        {
          heading: 'Apa itu kecerdasan artifisial?',
          text: [
            'Kecerdasan Artifisial (KA) adalah teknologi yang memungkinkan mesin belajar dan mengambil keputusan berdasarkan data.',
            'Mesin dilatih memproses banyak data dengan aturan logis (algoritma), sehingga bisa menemukan pola dan memberi prediksi.',
          ],
        },
        {
          heading: 'Mesin cerdas dan non-cerdas',
          text: [
            'Mesin cerdas mampu belajar, menyesuaikan diri, dan mengambil keputusan berdasarkan informasi, misalnya asisten suara di ponsel.',
            'Mesin non-cerdas hanya bekerja sesuai perintah tanpa bisa belajar, misalnya kipas angin biasa atau kalkulator.',
          ],
        },
        {
          heading: 'Memakai KA dengan bijak',
          text: ['KA bermanfaat, tetapi bisa keliru. Sikap bijak saat memakainya:'],
          points: ['Cek kembali jawabannya', 'Tetap berpikir sendiri', 'Jangan membagikan data pribadi', 'Bertanya pada guru atau orang tua'],
        },
        {
          heading: 'Indra manusia dan komputer',
          text: ['Manusia memakai pancaindra: mata, telinga, hidung, lidah, dan kulit. Komputer memakai alat: kamera untuk melihat, mikrofon untuk mendengar, dan sensor untuk merasakan suhu atau gerak.', 'Bedanya, komputer hanya mengolah data dari alatnya, sedangkan manusia juga punya perasaan dan pengalaman. Manfaat KA misalnya penerjemah bahasa dan peta penunjuk jalan.'],
        },
      ],
      words: [
        { term: 'Kecerdasan Artifisial', meaning: 'Teknologi yang membuat mesin bisa belajar dari data.' },
        { term: 'Data', meaning: 'Kumpulan informasi yang dipelajari mesin.' },
        { term: 'Mesin cerdas', meaning: 'Mesin yang bisa belajar dan menyesuaikan diri.' },
      ],
    },
    {
      id: 'bab4',
      title: 'Belajar Bersama KA: Si Cerdas yang Terus Belajar',
      pages: [
        {
          heading: 'Klasifikasi',
          text: [
            'Klasifikasi adalah cara mengelompokkan benda berdasarkan ciri-cirinya, misalnya hewan berdasarkan tempat hidupnya: darat, air, atau keduanya.',
            'Satu benda bisa masuk lebih dari satu kelompok. Bebek, misalnya, bisa hidup di darat dan di air.',
          ],
        },
        {
          heading: 'KA juga belajar mengelompokkan',
          text: [
            'Pengelompokan yang dilakukan manusia dengan mengamati langsung disebut klasifikasi manual.',
            'KA tidak langsung pintar. Ia perlu dilatih dengan banyak contoh data supaya bisa mengenali pola dan mengelompokkan sesuatu, misalnya mengenali gambar buah berdasarkan warna dan bentuknya.',
          ],
        },
      ],
      words: [
        { term: 'Klasifikasi', meaning: 'Mengelompokkan benda berdasarkan cirinya.' },
        { term: 'Klasifikasi manual', meaning: 'Pengelompokan oleh manusia lewat pengamatan langsung.' },
        { term: 'Pola', meaning: 'Ciri atau susunan yang berulang.' },
      ],
    },
  ],
};
