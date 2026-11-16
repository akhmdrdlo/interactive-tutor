/**
 * Matematika Kelas V (Kemendikbudristek 2022).
 * Sumber: sumber/matematika/matematika-buku-siswa-kelas5.pdf — 9 bab, satu pelajaran inti per bab.
 */
export default {
  id: 'matematika',
  source: 'Buku Siswa Matematika untuk SD/MI Kelas V, Kemendikbudristek 2022',
  chapters: [
    {
      id: 'bab1',
      title: 'Bilangan Cacah Sampai 100.000',
      lessons: [{
        id: 'mat-1-nilai-tempat',
        title: 'Membaca & Nilai Tempat',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Bilangan 45.208 dibaca "empat puluh lima ribu dua ratus delapan".' },
          { speaker: 'mentor', text: 'Tiap angka punya nilai tempat: puluh ribuan, ribuan, ratusan, puluhan, satuan. Pada 45.208, angka 5 bernilai 5.000.' },
          { speaker: 'student', mood: 'wow', text: 'Jadi 45.208 itu 40.000 + 5.000 + 200 + 8?' },
          { speaker: 'mentor', mood: 'happy', text: 'Pintar! Memecah bilangan seperti itu disebut dekomposisi. Menggabungkannya lagi disebut komposisi.' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'Nilai angka 7 pada bilangan 27.315 adalah …',
            options: [{ id: 'a', label: '7.000' }, { id: 'b', label: '700' }, { id: 'c', label: '70.000' }],
            answer: 'a',
            hint: 'Hitung dari kanan: satuan, puluhan, ratusan, ribuan. Angka 7 ada di tempat keempat.',
          },
          {
            type: 'sequence',
            prompt: 'Urutkan dari yang terkecil!',
            steps: ['12.045', '12.405', '21.045', '21.450'],
            hint: 'Bandingkan angka paling kiri dulu. Kalau sama, lihat angka berikutnya.',
          },
          {
            type: 'multiple-choice',
            prompt: '30.000 + 7.000 + 500 = …',
            options: [{ id: 'a', label: '30.750' }, { id: 'b', label: '37.500' }, { id: 'c', label: '3.750' }],
            answer: 'b',
            hint: 'Tulis tiap nilai pada tempatnya: 3 puluh ribuan, 7 ribuan, 5 ratusan.',
          },
        ],
      }],
    },
    {
      id: 'bab2',
      title: 'KPK dan FPB',
      lessons: [{
        id: 'mat-2-kpk-fpb',
        title: 'Kelipatan & Faktor',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Yohana berlatih tiap 3 hari, Nisa tiap 4 hari. Kapan mereka berlatih bersama lagi? Kita cari kelipatan yang sama!' },
          { speaker: 'mentor', text: 'Kelipatan 3: 3, 6, 9, 12 … Kelipatan 4: 4, 8, 12 … Yang sama dan paling kecil adalah 12. Itu KPK — Kelipatan Persekutuan Terkecil.' },
          { speaker: 'student', text: 'Kalau FPB apa, Mochi?' },
          { speaker: 'mentor', mood: 'happy', text: 'Faktor 12: 1, 2, 3, 4, 6, 12. Faktor 18: 1, 2, 3, 6, 9, 18. Faktor sama yang paling besar adalah 6 — itu FPB dari 12 dan 18!' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'KPK dari 4 dan 6 adalah …',
            options: [{ id: 'a', label: '24' }, { id: 'b', label: '2' }, { id: 'c', label: '12' }],
            answer: 'c',
            hint: 'Kelipatan 4: 4, 8, 12 … Kelipatan 6: 6, 12 … Mana yang sama paling dulu?',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkan dengan deretan bilangannya!',
            pairs: [
              { left: 'Kelipatan 3', right: '3, 6, 9, 12' },
              { left: 'Faktor 12', right: '1, 2, 3, 4, 6, 12' },
              { left: 'Bilangan prima', right: '2, 3, 5, 7' },
            ],
            hint: 'Bilangan prima hanya bisa dibagi 1 dan dirinya sendiri.',
          },
          {
            type: 'sequence',
            prompt: 'Urutkan langkah mencari KPK dari 3 dan 4!',
            steps: ['Tulis kelipatan 3', 'Tulis kelipatan 4', 'Cari kelipatan yang sama', 'Pilih yang paling kecil'],
            hint: 'KPK = kelipatan persekutuan yang TERKECIL.',
          },
        ],
      }],
    },
    {
      id: 'bab3',
      title: 'Bilangan Pecahan',
      lessons: [{
        id: 'mat-3-pecahan',
        title: 'Membandingkan & Menjumlah Pecahan',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Pada pecahan 3/4, angka atas (3) disebut pembilang, angka bawah (4) disebut penyebut.' },
          { speaker: 'student', mood: 'wow', text: 'Mana lebih besar, 1/2 kue atau 1/4 kue?' },
          { speaker: 'mentor', text: 'Kalau pembilangnya sama, penyebut yang lebih kecil berarti potongannya lebih besar. Jadi 1/2 lebih besar!' },
          { speaker: 'mentor', mood: 'happy', text: 'Menjumlah pecahan berpenyebut sama itu mudah: 1/5 + 2/5 = 3/5. Penyebutnya tetap, pembilangnya dijumlah.' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: '1/5 + 2/5 = …',
            options: [{ id: 'a', label: '3/10' }, { id: 'b', label: '3/5' }, { id: 'c', label: '2/5' }],
            answer: 'b',
            hint: 'Penyebutnya sama, jadi penyebut tidak ikut dijumlah.',
          },
          {
            type: 'sequence',
            prompt: 'Urutkan pecahan dari yang terkecil!',
            steps: ['1/8', '1/4', '1/2', '3/4'],
            hint: 'Bayangkan satu pizza: 1/8 potongan paling kecil, 3/4 hampir satu pizza.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Pecahan yang senilai dengan 1/2 adalah …',
            options: [{ id: 'a', label: '2/4' }, { id: 'b', label: '1/3' }, { id: 'c', label: '2/3' }],
            answer: 'a',
            hint: 'Kalikan pembilang dan penyebut 1/2 dengan bilangan yang sama.',
          },
        ],
      }, {
          id: 'mat-3-campuran',
          title: 'Pecahan Campuran',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Kak Raka punya 1 kue utuh dan 1/2 kue. Itu ditulis 1 1/2, dibaca "satu satu per dua". Namanya pecahan campuran.' },
            { speaker: 'mentor', text: 'Untuk mengubahnya jadi pecahan biasa: kalikan bilangan bulat dengan penyebut, lalu tambah pembilang. 1 1/2 = (1 × 2 + 1)/2 = 3/2.' },
            { speaker: 'student', mood: 'wow', text: 'Kalau 2 1/4 jadi berapa?' },
            { speaker: 'mentor', mood: 'happy', text: '(2 × 4 + 1)/4 = 9/4. Kebalikannya, 7/3 = 2 1/3 karena 7 dibagi 3 hasilnya 2 sisa 1.' },
          ],
          quiz: [
            { type: 'multiple-choice', prompt: '1 1/2 sama dengan …', options: [{ id: 'a', label: '3/2' }, { id: 'b', label: '2/3' }, { id: 'c', label: '1/2' }], answer: 'a', hint: '(1 × 2 + 1) / 2' },
            { type: 'multiple-choice', prompt: 'Pecahan 7/3 jika diubah menjadi pecahan campuran adalah …', options: [{ id: 'a', label: '2 1/3' }, { id: 'b', label: '1 2/3' }, { id: 'c', label: '3 1/7' }], answer: 'a', hint: '7 dibagi 3 = 2, sisa 1.' },
            { type: 'drag-match', prompt: 'Pasangkan pecahan campuran dengan pecahan biasanya!', pairs: [{ left: '1 1/2', right: '3/2' }, { left: '2 1/4', right: '9/4' }, { left: '1 2/3', right: '5/3' }], hint: 'Bilangan bulat × penyebut + pembilang.' },
          ],
        }],
    },
    {
      id: 'bab4',
      title: 'Keliling Bangun Datar',
      lessons: [{
        id: 'mat-4-keliling',
        title: 'Menghitung Keliling',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Keliling bangun datar adalah jumlah panjang semua sisinya.' },
          { speaker: 'mentor', text: 'Persegi bersisi 5 cm punya 4 sisi sama panjang: 5 + 5 + 5 + 5 = 20 cm.' },
          { speaker: 'student', text: 'Kalau persegi panjang 8 cm × 3 cm?' },
          { speaker: 'mentor', mood: 'happy', text: '8 + 3 + 8 + 3 = 22 cm. Atau cepatnya 2 × (8 + 3) = 22 cm!' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'Keliling persegi dengan sisi 6 cm adalah …',
            options: [{ id: 'a', label: '12 cm' }, { id: 'b', label: '36 cm' }, { id: 'c', label: '24 cm' }],
            answer: 'c',
            hint: 'Persegi punya 4 sisi yang sama panjang.',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkan bangun dengan kelilingnya!',
            pairs: [
              { left: 'Segitiga 3 cm, 4 cm, 5 cm', right: '12 cm' },
              { left: 'Persegi panjang 8 cm × 3 cm', right: '22 cm' },
              { left: 'Persegi sisi 5 cm', right: '20 cm' },
            ],
            hint: 'Jumlahkan semua sisinya satu per satu.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Kebun berbentuk persegi panjang 10 m × 4 m akan dipagari keliling. Panjang pagarnya …',
            options: [{ id: 'a', label: '28 m' }, { id: 'b', label: '40 m' }, { id: 'c', label: '14 m' }],
            answer: 'a',
            hint: '2 × (panjang + lebar).',
          },
        ],
      }],
    },
    {
      id: 'bab5',
      title: 'Luas Daerah Bangun Datar',
      lessons: [{
        id: 'mat-5-luas',
        title: 'Menghitung Luas',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Luas daerah bangun datar adalah ukuran besar-kecilnya daerah yang dibatasi bangun itu.' },
          { speaker: 'mentor', text: 'Luas bisa dihitung dengan menghitung persegi satuan yang menutupi bangun.' },
          { speaker: 'student', mood: 'wow', text: 'Kalau persegi panjang 6 × 4 petak, berarti 24 petak?' },
          { speaker: 'mentor', mood: 'happy', text: 'Benar! Luas persegi panjang = panjang × lebar. Luas persegi = sisi × sisi.' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'Luas persegi panjang 6 cm × 4 cm adalah …',
            options: [{ id: 'a', label: '20 cm²' }, { id: 'b', label: '24 cm²' }, { id: 'c', label: '10 cm²' }],
            answer: 'b',
            hint: 'Luas = panjang × lebar, bukan dijumlah.',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkan bangun dengan cara menghitung luasnya!',
            pairs: [
              { left: 'Persegi', right: 'sisi × sisi' },
              { left: 'Persegi panjang', right: 'panjang × lebar' },
            ],
            hint: 'Persegi hanya punya satu ukuran sisi.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Lantai kamar berbentuk persegi dengan sisi 3 m. Luasnya …',
            options: [{ id: 'a', label: '12 m²' }, { id: 'b', label: '6 m²' }, { id: 'c', label: '9 m²' }],
            answer: 'c',
            hint: '3 × 3 = …',
          },
        ],
      }, {
          id: 'mat-5-segitiga',
          title: 'Luas Segitiga & Jajargenjang',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Jajargenjang bisa dipotong dan digeser menjadi persegi panjang. Jadi luas jajargenjang = alas × tinggi.' },
            { speaker: 'mentor', text: 'Segitiga adalah setengah dari persegi panjang. Luas segitiga = 1/2 × alas × tinggi.' },
            { speaker: 'student', mood: 'wow', text: 'Kalau dua bangun kelilingnya sama, luasnya pasti sama?' },
            { speaker: 'mentor', mood: 'happy', text: 'Belum tentu! Persegi 4 × 4 dan persegi panjang 6 × 2 sama-sama berkeliling 16 cm, tapi luasnya 16 cm² dan 12 cm².' },
          ],
          quiz: [
            { type: 'multiple-choice', prompt: 'Luas segitiga dengan alas 8 cm dan tinggi 5 cm adalah …', options: [{ id: 'a', label: '20 cm²' }, { id: 'b', label: '40 cm²' }, { id: 'c', label: '13 cm²' }], answer: 'a', hint: '1/2 × 8 × 5' },
            { type: 'multiple-choice', prompt: 'Luas jajargenjang dengan alas 7 cm dan tinggi 4 cm adalah …', options: [{ id: 'a', label: '28 cm²' }, { id: 'b', label: '11 cm²' }, { id: 'c', label: '14 cm²' }], answer: 'a', hint: 'Alas × tinggi.' },
            { type: 'multiple-choice', prompt: 'Persegi 4 cm × 4 cm dan persegi panjang 6 cm × 2 cm punya keliling sama. Luasnya …', options: [{ id: 'a', label: 'Berbeda: 16 cm² dan 12 cm²' }, { id: 'b', label: 'Sama-sama 16 cm²' }, { id: 'c', label: 'Sama-sama 12 cm²' }], answer: 'a', hint: 'Hitung panjang × lebar masing-masing.' },
          ],
        }],
    },
    {
      id: 'bab6',
      title: 'Sudut',
      lessons: [{
        id: 'mat-6-sudut',
        title: 'Siku-Siku, Lancip, Tumpul',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Lihat pojok buku tulismu. Sudutnya tegak seperti huruf L — itu sudut siku-siku, besarnya 90°.' },
          { speaker: 'mentor', text: 'Sudut yang lebih kecil dari siku-siku disebut sudut lancip. Yang lebih besar dari siku-siku (tapi kurang dari 180°) disebut sudut tumpul.' },
          { speaker: 'student', text: 'Alat untuk mengukur sudut namanya apa?' },
          { speaker: 'mentor', mood: 'happy', text: 'Busur derajat! Satuannya derajat (°).' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Pasangkan dengan jenis sudutnya!',
            pairs: [
              { left: 'Pojok buku tulis', right: 'Siku-siku (90°)' },
              { left: 'Jarum jam pukul 02.00', right: 'Lancip' },
              { left: 'Jarum jam pukul 04.00', right: 'Tumpul' },
            ],
            hint: 'Pukul 03.00 jarum jam membentuk siku-siku. Pukul 02.00 lebih sempit, pukul 04.00 lebih lebar.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Sudut yang besarnya 45° termasuk sudut …',
            options: [{ id: 'a', label: 'Tumpul' }, { id: 'b', label: 'Lancip' }, { id: 'c', label: 'Siku-siku' }],
            answer: 'b',
            hint: '45° lebih kecil dari 90°.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Alat untuk mengukur besar sudut adalah …',
            options: [{ id: 'a', label: 'Busur derajat' }, { id: 'b', label: 'Jangka' }, { id: 'c', label: 'Timbangan' }],
            answer: 'a',
            hint: 'Bentuknya setengah lingkaran dengan angka 0 sampai 180.',
          },
        ],
      }, {
          id: 'mat-6-ukur',
          title: 'Mengukur Sudut',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Untuk mengukur sudut, letakkan titik tengah busur tepat di titik sudut.' },
            { speaker: 'mentor', text: 'Impitkan satu garis sudut dengan angka 0, lalu baca angka yang dilewati garis lainnya.' },
            { speaker: 'student', text: 'Kalau garisnya lurus sekali?' },
            { speaker: 'mentor', mood: 'happy', text: 'Itu sudut lurus, besarnya 180°. Dua sudut siku-siku digabung juga 180°.' },
          ],
          quiz: [
            { type: 'sequence', prompt: 'Urutkan cara mengukur sudut dengan busur!', steps: ['Letakkan titik tengah busur di titik sudut', 'Impitkan satu garis dengan angka 0', 'Baca angka pada garis yang lain'], hint: 'Posisikan busur dulu, baru membaca angkanya.' },
            { type: 'multiple-choice', prompt: 'Besar sudut lurus adalah …', options: [{ id: 'a', label: '180°' }, { id: 'b', label: '90°' }, { id: 'c', label: '360°' }], answer: 'a', hint: 'Dua sudut siku-siku digabung.' },
            { type: 'multiple-choice', prompt: 'Sudut 120° termasuk sudut …', options: [{ id: 'a', label: 'Tumpul' }, { id: 'b', label: 'Lancip' }, { id: 'c', label: 'Siku-siku' }], answer: 'a', hint: 'Lebih dari 90° tapi kurang dari 180°.' },
          ],
        }],
    },
    {
      id: 'bab7',
      title: 'Membandingkan Ciri-Ciri Bangun Datar',
      lessons: [{
        id: 'mat-7-ciri-bangun',
        title: 'Segitiga & Segi Empat',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Segitiga sama sisi punya 3 sisi sama panjang. Segitiga sama kaki punya 2 sisi sama panjang.' },
          { speaker: 'mentor', text: 'Persegi: 4 sisi sama panjang dan 4 sudut siku-siku. Persegi panjang: sisi yang berhadapan sama panjang, 4 sudut siku-siku.' },
          { speaker: 'student', mood: 'wow', text: 'Belah ketupat juga sisinya sama panjang semua, kan?' },
          { speaker: 'mentor', mood: 'happy', text: 'Iya, tapi sudutnya tidak harus siku-siku. Trapesium punya sepasang sisi sejajar, layang-layang punya dua pasang sisi berdekatan yang sama panjang.' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Pasangkan bangun dengan cirinya!',
            pairs: [
              { left: 'Persegi', right: '4 sisi sama, 4 sudut siku-siku' },
              { left: 'Trapesium', right: 'Sepasang sisi sejajar' },
              { left: 'Segitiga sama sisi', right: '3 sisi sama panjang' },
              { left: 'Belah ketupat', right: '4 sisi sama, sudut tidak harus siku-siku' },
            ],
            hint: 'Persegi dan belah ketupat sama-sama bersisi sama — bedanya ada di sudut.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Segitiga yang dua sisinya sama panjang disebut segitiga …',
            options: [{ id: 'a', label: 'Sama sisi' }, { id: 'b', label: 'Sama kaki' }, { id: 'c', label: 'Siku-siku' }],
            answer: 'b',
            hint: 'Dua sisi yang sama itu seperti dua kaki.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Bangun yang sisi-sisi berhadapannya sejajar dan sama panjang, tetapi sudutnya tidak siku-siku, adalah …',
            options: [{ id: 'a', label: 'Jajargenjang' }, { id: 'b', label: 'Persegi panjang' }, { id: 'c', label: 'Layang-layang' }],
            answer: 'a',
            hint: 'Bentuknya seperti persegi panjang yang "didorong" miring.',
          },
        ],
      }],
    },
    {
      id: 'bab8',
      title: 'Data',
      lessons: [{
        id: 'mat-8-data',
        title: 'Mengumpulkan & Menyajikan Data',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Kita ingin tahu buah kesukaan teman sekelas. Caranya: bertanya, lalu mencatat dengan turus.' },
          { speaker: 'mentor', text: 'Hasilnya bisa disajikan dalam tabel, piktogram (memakai gambar), atau diagram batang.' },
          { speaker: 'student', text: 'Kalau di diagram batang, buah paling disukai yang mana?' },
          { speaker: 'mentor', mood: 'happy', text: 'Yang batangnya paling tinggi! Diagram membuat data mudah dibaca sekilas.' },
        ],
        quiz: [
          {
            type: 'sequence',
            prompt: 'Urutkan langkah membuat diagram buah kesukaan!',
            steps: ['Tentukan pertanyaan', 'Tanya teman dan catat dengan turus', 'Hitung dan masukkan ke tabel', 'Gambar diagram batang'],
            hint: 'Data harus dikumpulkan dulu sebelum disajikan.',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkan cara menyajikan data!',
            pairs: [
              { left: 'Memakai gambar sebagai lambang', right: 'Piktogram' },
              { left: 'Memakai batang setinggi jumlahnya', right: 'Diagram batang' },
              { left: 'Memakai baris dan kolom', right: 'Tabel' },
            ],
            hint: '"Pikto" artinya gambar.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Turus: Mangga |||| ||, Jeruk |||, Pisang ||||. Buah yang paling banyak disukai adalah …',
            options: [{ id: 'a', label: 'Jeruk' }, { id: 'b', label: 'Pisang' }, { id: 'c', label: 'Mangga' }],
            answer: 'c',
            hint: 'Hitung garisnya satu per satu: Mangga 6, Jeruk 3, Pisang 4.',
          },
        ],
      }],
    },
    {
      id: 'bab9',
      title: 'Bilangan Cacah Sampai 1.000.000',
      lessons: [{
        id: 'mat-9-juta',
        title: 'Menuju Satu Juta',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Setelah 999.999 datanglah 1.000.000, dibaca "satu juta".' },
          { speaker: 'mentor', text: 'Nilai tempat bertambah satu: ratus ribuan. Pada 615.204, angka 6 bernilai 600.000.' },
          { speaker: 'student', mood: 'wow', text: 'Banyak sekali nolnya!' },
          { speaker: 'mentor', mood: 'happy', text: 'Tenang, caranya sama seperti sebelumnya — baca per kelompok tiga angka dari kiri.' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'Nilai angka 6 pada bilangan 615.204 adalah …',
            options: [{ id: 'a', label: '60.000' }, { id: 'b', label: '600.000' }, { id: 'c', label: '6.000' }],
            answer: 'b',
            hint: 'Angka 6 berada di tempat ratus ribuan.',
          },
          {
            type: 'multiple-choice',
            prompt: '250.000 + 40.000 + 3.000 = …',
            options: [{ id: 'a', label: '293.000' }, { id: 'b', label: '254.300' }, { id: 'c', label: '2.930.000' }],
            answer: 'a',
            hint: 'Jumlahkan ratus ribuan, puluh ribuan, lalu ribuan.',
          },
          {
            type: 'sequence',
            prompt: 'Urutkan dari yang terkecil!',
            steps: ['98.765', '100.000', '456.789', '1.000.000'],
            hint: 'Bilangan yang punya lebih banyak angka biasanya lebih besar.',
          },
        ],
      }],
    },
  ],
};
