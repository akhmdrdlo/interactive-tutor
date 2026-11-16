/**
 * Koding dan Kecerdasan Artifisial Kelas V (Kemendikdasmen).
 * Sumber: sumber/koding/koding-kecerdasan-artifisial-buku-siswa-kelas5.pdf — 4 bab.
 */
export default {
  id: 'koding',
  source: 'Buku Siswa Koding dan Kecerdasan Artifisial untuk SD/MI Kelas V',
  chapters: [
    {
      id: 'bab1',
      title: 'Berpikir Komputasional: Menemukan Solusi',
      lessons: [
        {
          id: 'kka-1-bk',
          title: 'Empat Jurus Berpikir Komputasional',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Berpikir komputasional adalah cara berpikir yang teratur, sistematis, dan logis untuk memecahkan masalah sehari-hari.' },
            { speaker: 'mentor', text: 'Jurus pertama: dekomposisi, memecah masalah besar menjadi bagian kecil. Jurus kedua: pengenalan pola, menemukan hal yang berulang.' },
            { speaker: 'student', text: 'Jurus ketiga dan keempat?' },
            { speaker: 'mentor', mood: 'happy', text: 'Abstraksi: fokus pada hal penting saja. Algoritma: menyusun langkah berurutan untuk menyelesaikan masalah.' },
          ],
          quiz: [
            {
              type: 'drag-match',
              prompt: 'Pasangkan jurus dengan contohnya!',
              pairs: [
                { left: 'Dekomposisi', right: 'Membagi tugas membereskan kamar jadi kecil-kecil' },
                { left: 'Pengenalan pola', right: 'Jadwal pelajaran berulang setiap minggu' },
                { left: 'Abstraksi', right: 'Hanya mencatat hal penting dari cerita' },
                { left: 'Algoritma', right: 'Langkah-langkah membuat teh' },
              ],
              hint: 'Algoritma selalu berupa urutan langkah. Pola berarti sesuatu yang berulang.',
            },
            {
              type: 'multiple-choice',
              prompt: 'Pola bilangan 2, 4, 6, 8, … Bilangan berikutnya adalah …',
              options: [{ id: 'a', label: '9' }, { id: 'b', label: '10' }, { id: 'c', label: '12' }],
              answer: 'b',
              hint: 'Setiap bilangan bertambah 2.',
            },
            {
              type: 'multiple-choice',
              prompt: 'Langkah pertama untuk menemukan solusi sebuah masalah adalah …',
              options: [{ id: 'a', label: 'Langsung mencoba apa saja' }, { id: 'b', label: 'Memahami masalahnya' }, { id: 'c', label: 'Menyerah' }],
              answer: 'b',
              hint: 'Langkah ini disebut analisis masalah.',
            },
          ],
        },
        {
          id: 'kka-1-algoritma',
          title: 'Algoritma & Pseudocode',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Pepi sering terlambat karena tidak menyiapkan barang dan bangun kesiangan. Yuk bantu dengan algoritma!' },
            { speaker: 'mentor', text: 'Algoritma adalah langkah berurutan untuk menyelesaikan masalah. Kalau urutannya tertukar, hasilnya bisa kacau.' },
            { speaker: 'student', mood: 'wow', text: 'Kalau ditulis rapi pakai kata-kata singkat seperti perintah?' },
            { speaker: 'mentor', mood: 'happy', text: 'Itu namanya pseudocode — dibaca "syu-dokod". Langkah algoritma yang ditulis rapi seperti kode program.' },
          ],
          quiz: [
            {
              type: 'sequence',
              prompt: 'Susun algoritma pagi Pepi supaya tidak terlambat!',
              steps: ['Siapkan tas sebelum tidur', 'Pasang alarm', 'Bangun saat alarm berbunyi', 'Mandi dan sarapan', 'Berangkat ke sekolah'],
              hint: 'Beberapa langkah dilakukan malam sebelumnya.',
            },
            {
              type: 'sequence',
              prompt: 'Susun langkah mencuci tangan!',
              steps: ['Basahi tangan dengan air', 'Gosok dengan sabun', 'Bilas dengan air bersih', 'Keringkan dengan lap'],
              hint: 'Sabun dipakai setelah tangan basah, dan dikeringkan paling akhir.',
            },
            {
              type: 'multiple-choice',
              prompt: 'Langkah algoritma yang ditulis singkat dan rapi seperti perintah program disebut …',
              options: [{ id: 'a', label: 'Pseudocode' }, { id: 'b', label: 'Dekomposisi' }, { id: 'c', label: 'Pola bentuk' }],
              answer: 'a',
              hint: 'Dibaca "syu-dokod".',
            },
          ],
        },
      ],
    },
    {
      id: 'bab2',
      title: 'Mengenal Teknologi Digital',
      lessons: [{
        id: 'kka-2-digital',
        title: 'Perangkat Keras, Lunak & Data Pribadi',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Jam dengan jarum dan surat tulisan tangan adalah teknologi analog. Ponsel dan jam digital adalah teknologi digital.' },
          { speaker: 'mentor', text: 'Komputer punya perangkat keras (bisa disentuh: layar, papan ketik, tetikus) dan perangkat lunak (program atau aplikasi).' },
          { speaker: 'student', text: 'Bagaimana komputer bekerja?' },
          { speaker: 'mentor', mood: 'happy', text: 'Masukan (input) → Proses → Luaran (output). Dan ingat: jangan sebarkan informasi pribadi, dan buat kata sandi yang sulit ditebak!' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Perangkat keras atau perangkat lunak?',
            pairs: [
              { left: 'Papan ketik', right: 'Perangkat keras' },
              { left: 'Aplikasi pengolah kata', right: 'Perangkat lunak' },
              { left: 'Tetikus', right: 'Perangkat keras' },
              { left: 'Peramban internet', right: 'Perangkat lunak' },
            ],
            hint: 'Perangkat keras bisa dipegang. Perangkat lunak adalah program di dalamnya.',
          },
          {
            type: 'sequence',
            prompt: 'Urutkan cara kerja komputer saat kamu mengetik huruf!',
            steps: ['Masukan: menekan tombol huruf', 'Proses: komputer mengolah perintah', 'Luaran: huruf muncul di layar'],
            hint: 'Input → Proses → Output.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Kata sandi manakah yang paling aman?',
            options: [{ id: 'a', label: '123456' }, { id: 'b', label: 'password' }, { id: 'c', label: 'Kucing!Ungu7Lari' }],
            answer: 'c',
            hint: 'Kata sandi yang mudah ditebak justru tidak aman.',
          },
        ],
      }],
    },
    {
      id: 'bab3',
      title: 'Kecerdasan Artifisial: Teman Baru di Dunia Digital',
      lessons: [{
        id: 'kka-3-ka',
        title: 'Mesin Cerdas & Non-Cerdas',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Kecerdasan Artifisial (KA) adalah teknologi yang memungkinkan mesin belajar dan mengambil keputusan berdasarkan data.' },
          { speaker: 'mentor', text: 'Mesin cerdas mampu belajar, menyesuaikan diri, dan mengambil keputusan. Mesin non-cerdas hanya bekerja sesuai perintah.' },
          { speaker: 'student', mood: 'wow', text: 'Jadi kipas angin itu non-cerdas, ya?' },
          { speaker: 'mentor', mood: 'happy', text: 'Betul! Sedangkan aplikasi yang bisa mengenali suaramu termasuk mesin cerdas. Gunakan KA dengan bijak, ya.' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Mesin cerdas atau non-cerdas?',
            pairs: [
              { left: 'Kipas angin biasa', right: 'Non-cerdas' },
              { left: 'Asisten suara di ponsel', right: 'Cerdas' },
              { left: 'Kalkulator', right: 'Non-cerdas' },
              { left: 'Aplikasi pengenal wajah', right: 'Cerdas' },
            ],
            hint: 'Mesin cerdas bisa belajar dari data. Mesin non-cerdas hanya menjalankan perintah yang sama.',
          },
          {
            type: 'multiple-choice',
            prompt: 'KA bisa membuat keputusan karena …',
            options: [{ id: 'a', label: 'Belajar dari banyak data' }, { id: 'b', label: 'Punya perasaan seperti manusia' }, { id: 'c', label: 'Selalu menebak secara acak' }],
            answer: 'a',
            hint: 'KA dilatih memproses data dengan aturan logis (algoritma).',
          },
          {
            type: 'multiple-choice',
            prompt: 'Sikap bijak saat memakai KA adalah …',
            options: [{ id: 'a', label: 'Mempercayai semua jawabannya tanpa dicek' }, { id: 'b', label: 'Mengecek kembali dan bertanya pada guru atau orang tua' }, { id: 'c', label: 'Membagikan data pribadi ke aplikasi' }],
            answer: 'b',
            hint: 'KA bisa keliru. Kamu tetap perlu berpikir sendiri.',
          },
        ],
      }, {
          id: 'kka-3-indra',
          title: 'Indra Manusia & Komputer',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Manusia mengenali dunia dengan pancaindra: mata melihat, telinga mendengar, hidung mencium.' },
            { speaker: 'mentor', text: 'Komputer juga bisa "mengindra" memakai alat: kamera untuk melihat, mikrofon untuk mendengar, dan sensor untuk merasakan suhu atau gerak.' },
            { speaker: 'student', mood: 'wow', text: 'Jadi komputer bisa merasakan seperti kita?' },
            { speaker: 'mentor', mood: 'happy', text: 'Tidak persis. Komputer hanya mengolah data dari alatnya. Manfaat KA misalnya penerjemah bahasa dan peta penunjuk jalan.' },
          ],
          quiz: [
            { type: 'drag-match', prompt: 'Pasangkan indra manusia dengan alat komputer!', pairs: [{ left: 'Mata', right: 'Kamera' }, { left: 'Telinga', right: 'Mikrofon' }, { left: 'Kulit (merasakan panas)', right: 'Sensor suhu' }], hint: 'Pikirkan fungsi yang sama: melihat, mendengar, merasakan.' },
            { type: 'multiple-choice', prompt: 'Contoh manfaat kecerdasan artifisial dalam kehidupan sehari-hari adalah …', options: [{ id: 'a', label: 'Aplikasi penerjemah bahasa' }, { id: 'b', label: 'Gunting kertas' }, { id: 'c', label: 'Kipas tangan' }], answer: 'a', hint: 'KA bisa belajar dari banyak data bahasa.' },
            { type: 'multiple-choice', prompt: 'Perbedaan manusia dan komputer dalam mengindra adalah …', options: [{ id: 'a', label: 'Komputer mengolah data dari alat, manusia memakai pancaindra dan perasaan' }, { id: 'b', label: 'Komputer punya perasaan' }, { id: 'c', label: 'Manusia tidak bisa melihat' }], answer: 'a', hint: 'Komputer tidak punya perasaan.' },
          ],
        }],
    },
    {
      id: 'bab4',
      title: 'Belajar Bersama KA: Si Cerdas yang Terus Belajar',
      lessons: [{
        id: 'kka-4-klasifikasi',
        title: 'Klasifikasi',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Klasifikasi adalah cara mengelompokkan benda berdasarkan ciri-cirinya, misalnya hewan berdasarkan tempat hidupnya.' },
          { speaker: 'student', text: 'Bebek hidup di darat dan di air. Masuk kelompok mana?' },
          { speaker: 'mentor', mood: 'happy', text: 'Bisa masuk lebih dari satu kelompok! KA juga belajar mengelompokkan dengan mengenali pola dari banyak contoh data.' },
          { speaker: 'mentor', text: 'Kalau manusia mengelompokkan dengan mengamati langsung, itu disebut klasifikasi manual.' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Kelompokkan hewan menurut tempat hidupnya!',
            pairs: [
              { left: 'Ikan mas', right: 'Air' },
              { left: 'Kucing', right: 'Darat' },
              { left: 'Katak', right: 'Darat dan air' },
            ],
            hint: 'Katak bertelur di air tetapi bisa melompat di darat.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Supaya KA pandai mengelompokkan gambar buah, KA perlu …',
            options: [{ id: 'a', label: 'Dilatih dengan banyak contoh data' }, { id: 'b', label: 'Dimatikan dan dinyalakan' }, { id: 'c', label: 'Diberi satu gambar saja' }],
            answer: 'a',
            hint: 'KA tidak langsung pintar; ia belajar dari banyak contoh.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Pengelompokan yang dilakukan manusia dengan pengamatan langsung disebut …',
            options: [{ id: 'a', label: 'Klasifikasi otomatis' }, { id: 'b', label: 'Klasifikasi manual' }, { id: 'c', label: 'Pseudocode' }],
            answer: 'b',
            hint: '"Manual" artinya dikerjakan sendiri oleh manusia.',
          },
        ],
      }],
    },
  ],
};
