/**
 * Buku Ringkas Matematika Kelas V — konsep tiap bab dengan contoh langkah demi langkah.
 * Sumber: sumber/matematika/matematika-buku-siswa-kelas5.pdf. Id bab sama dengan subjects/matematika.js.
 */
export default {
  id: 'matematika',
  chapters: [
    {
      id: 'bab1',
      title: 'Bilangan Cacah Sampai 100.000',
      pages: [
        {
          heading: 'Membaca dan menulis bilangan',
          text: [
            'Bilangan cacah adalah 0, 1, 2, 3, dan seterusnya. Sekarang kita belajar sampai 100.000 (seratus ribu).',
            'Bilangan besar dibaca per kelompok. 45.208 dibaca "empat puluh lima ribu dua ratus delapan". Titik membantu kita memisahkan ribuan.',
          ],
        },
        {
          heading: 'Nilai tempat',
          text: ['Setiap angka punya tempat. Lihat bilangan 45.208:'],
          points: ['4 di tempat puluh ribuan → nilainya 40.000', '5 di tempat ribuan → nilainya 5.000', '2 di tempat ratusan → nilainya 200', '0 di tempat puluhan → nilainya 0', '8 di tempat satuan → nilainya 8'],
          note: 'Memecah 45.208 menjadi 40.000 + 5.000 + 200 + 8 disebut dekomposisi. Menggabungkannya kembali disebut komposisi.',
        },
        {
          heading: 'Membandingkan dan berhitung',
          text: [
            'Untuk membandingkan, lihat angka paling kiri dulu. Kalau sama, lihat angka berikutnya. Jadi 34.657 lebih besar dari 34.567 karena di tempat ratusan 6 > 5.',
            'Saat menjumlah atau mengurang bersusun, mulai dari satuan. Kalau hasil penjumlahan lebih dari 9, simpan ke tempat sebelah kiri. Kalau angka atas lebih kecil saat mengurang, pinjam dari tempat sebelah kiri.',
          ],
        },
      ],
      words: [
        { term: 'Nilai tempat', meaning: 'Kedudukan angka: satuan, puluhan, ratusan, ribuan, puluh ribuan.' },
        { term: 'Dekomposisi', meaning: 'Memecah bilangan menurut nilai tempatnya.' },
        { term: 'Komposisi', meaning: 'Menyusun kembali bagian-bagian menjadi satu bilangan.' },
        { term: '> dan <', meaning: '"Lebih dari" dan "kurang dari".' },
      ],
    },
    {
      id: 'bab2',
      title: 'KPK dan FPB',
      pages: [
        {
          heading: 'Kelipatan dan KPK',
          text: [
            'Kelipatan sebuah bilangan didapat dengan mengalikan bilangan itu dengan 1, 2, 3, dan seterusnya. Kelipatan 3: 3, 6, 9, 12, 15, …',
            'Kelipatan yang sama dari dua bilangan disebut kelipatan persekutuan. Yang paling kecil disebut KPK (Kelipatan Persekutuan Terkecil).',
          ],
          note: 'Yohana berlatih tiap 3 hari, Nisa tiap 4 hari. Kelipatan 3 dan 4 yang sama paling kecil adalah 12, jadi mereka berlatih bersama lagi 12 hari kemudian.',
        },
        {
          heading: 'Faktor dan FPB',
          text: [
            'Faktor adalah bilangan yang bisa membagi habis. Faktor 12: 1, 2, 3, 4, 6, 12. Faktor 18: 1, 2, 3, 6, 9, 18.',
            'Faktor yang sama disebut faktor persekutuan (1, 2, 3, 6). Yang paling besar adalah FPB (Faktor Persekutuan Terbesar). Jadi FPB 12 dan 18 adalah 6.',
          ],
        },
        {
          heading: 'Bilangan prima dan pohon faktor',
          text: [
            'Bilangan prima hanya bisa dibagi 1 dan dirinya sendiri: 2, 3, 5, 7, 11, 13, …',
            'Dengan pohon faktor, kita memecah bilangan menjadi perkalian bilangan prima. Misalnya 12 = 2 × 2 × 3. Cara ini memudahkan mencari KPK dan FPB bilangan yang besar.',
          ],
          points: ['KPK berguna untuk soal "kapan bersamaan lagi?"', 'FPB berguna untuk soal "dibagi sama banyak, paling banyak berapa kelompok?"'],
        },
      ],
      words: [
        { term: 'Kelipatan', meaning: 'Hasil kali bilangan dengan 1, 2, 3, dan seterusnya.' },
        { term: 'Faktor', meaning: 'Bilangan yang membagi habis bilangan lain.' },
        { term: 'KPK', meaning: 'Kelipatan Persekutuan Terkecil.' },
        { term: 'FPB', meaning: 'Faktor Persekutuan Terbesar.' },
        { term: 'Bilangan prima', meaning: 'Bilangan yang hanya punya faktor 1 dan dirinya sendiri.' },
      ],
    },
    {
      id: 'bab3',
      title: 'Bilangan Pecahan',
      pages: [
        {
          heading: 'Mengenal pecahan',
          text: [
            'Pecahan menunjukkan bagian dari keseluruhan. Kalau sebuah kue dipotong 4 sama besar dan kamu makan 3 potong, kamu makan 3/4 kue.',
            'Angka atas disebut pembilang (banyak bagian yang diambil). Angka bawah disebut penyebut (banyak bagian seluruhnya).',
          ],
        },
        {
          heading: 'Membandingkan pecahan',
          text: [
            'Kalau pembilangnya sama, penyebut yang lebih kecil berarti potongannya lebih besar: 1/2 > 1/4.',
            'Pecahan senilai adalah pecahan yang nilainya sama walau angkanya berbeda. 1/2 = 2/4 = 3/6. Caranya: kalikan pembilang dan penyebut dengan bilangan yang sama.',
          ],
        },
        {
          heading: 'Menjumlah dan mengurang pecahan',
          text: [
            'Jika penyebutnya sama, penyebut tetap dan hanya pembilang yang dihitung: 1/5 + 2/5 = 3/5, dan 4/7 − 1/7 = 3/7.',
            'Jika penyebutnya berbeda, samakan dulu penyebutnya dengan pecahan senilai. 1/2 + 1/4 = 2/4 + 1/4 = 3/4.',
          ],
        },
        {
          heading: 'Pecahan campuran',
          text: ['Pecahan campuran terdiri atas bilangan bulat dan pecahan, misalnya 1 1/2 (satu satu per dua).', 'Mengubah ke pecahan biasa: bilangan bulat × penyebut + pembilang. 2 1/4 = (2 × 4 + 1)/4 = 9/4. Sebaliknya, 7/3 = 2 1/3 karena 7 : 3 = 2 sisa 1.'],
        },
      ],
      words: [
        { term: 'Pembilang', meaning: 'Angka di atas garis pecahan.' },
        { term: 'Penyebut', meaning: 'Angka di bawah garis pecahan.' },
        { term: 'Pecahan senilai', meaning: 'Pecahan berbeda angka tapi sama nilainya.' },
      ],
    },
    {
      id: 'bab4',
      title: 'Keliling Bangun Datar',
      pages: [
        {
          heading: 'Apa itu keliling?',
          text: [
            'Keliling bangun datar adalah jumlah panjang semua sisinya. Bayangkan semut berjalan menyusuri pinggir bangun sampai kembali ke titik awal — panjang jalannya itulah keliling.',
          ],
          points: ['Segitiga 3 cm, 4 cm, 5 cm → keliling 3 + 4 + 5 = 12 cm'],
        },
        {
          heading: 'Cara cepat',
          text: ['Beberapa bangun punya sisi yang sama panjang, jadi bisa dihitung lebih cepat:'],
          points: ['Persegi: keliling = 4 × sisi. Sisi 5 cm → 20 cm.', 'Persegi panjang: keliling = 2 × (panjang + lebar). 8 cm × 3 cm → 22 cm.'],
          note: 'Keliling dipakai untuk menghitung panjang pagar, pita bingkai, atau lintasan lari.',
        },
      ],
      words: [
        { term: 'Keliling', meaning: 'Jumlah panjang semua sisi bangun datar.' },
        { term: 'Sisi', meaning: 'Garis yang membatasi bangun datar.' },
      ],
    },
    {
      id: 'bab5',
      title: 'Luas Daerah Bangun Datar',
      pages: [
        {
          heading: 'Apa itu luas?',
          text: [
            'Luas daerah adalah ukuran besar-kecilnya daerah di dalam bangun datar. Luas bisa dihitung dengan menghitung persegi satuan (kotak kecil) yang menutupi bangun itu.',
            'Satuan luas ditulis dengan pangkat dua, misalnya cm² (sentimeter persegi) atau m² (meter persegi).',
          ],
        },
        {
          heading: 'Rumus luas',
          text: ['Daripada menghitung kotak satu per satu, kita pakai perkalian:'],
          points: ['Persegi panjang: luas = panjang × lebar. 6 cm × 4 cm = 24 cm²', 'Persegi: luas = sisi × sisi. Sisi 3 m → 9 m²'],
          note: 'Jangan tertukar! Keliling menjumlah sisi, luas mengalikan panjang dan lebar.',
        },
        {
          heading: 'Luas segitiga, jajargenjang, dan hubungannya dengan keliling',
          text: ['Jajargenjang bisa dipotong dan digeser menjadi persegi panjang, jadi luasnya = alas × tinggi. Segitiga adalah setengah persegi panjang, jadi luasnya = 1/2 × alas × tinggi.'],
          points: ['Persegi 4 cm × 4 cm: keliling 16 cm, luas 16 cm²', 'Persegi panjang 6 cm × 2 cm: keliling 16 cm, luas 12 cm²'],
          note: 'Keliling sama belum tentu luasnya sama!',
        },
      ],
      words: [
        { term: 'Luas', meaning: 'Ukuran daerah di dalam bangun datar.' },
        { term: 'Persegi satuan', meaning: 'Kotak kecil berukuran 1 × 1 untuk mengukur luas.' },
        { term: 'cm²', meaning: 'Sentimeter persegi, satuan luas.' },
      ],
    },
    {
      id: 'bab6',
      title: 'Sudut',
      pages: [
        {
          heading: 'Mengenal sudut',
          text: [
            'Sudut terbentuk dari dua garis yang bertemu di satu titik. Besar sudut diukur dengan busur derajat, satuannya derajat (°).',
          ],
          points: ['Sudut siku-siku: tepat 90°, seperti pojok buku.', 'Sudut lancip: kurang dari 90°.', 'Sudut tumpul: lebih dari 90° tetapi kurang dari 180°.'],
        },
        {
          heading: 'Sudut di sekitar kita',
          text: [
            'Jarum jam membentuk sudut. Pukul 03.00 membentuk sudut siku-siku, pukul 02.00 membentuk sudut lancip, dan pukul 04.00 membentuk sudut tumpul.',
            'Untuk mengukur, letakkan titik tengah busur tepat di titik sudut, satu garis berimpit dengan angka 0, lalu baca angka di garis yang lain.',
          ],
        },
      ],
      words: [
        { term: 'Busur derajat', meaning: 'Alat untuk mengukur besar sudut.' },
        { term: 'Siku-siku', meaning: 'Sudut yang besarnya 90°.' },
        { term: 'Lancip', meaning: 'Sudut yang kurang dari 90°.' },
        { term: 'Tumpul', meaning: 'Sudut antara 90° dan 180°.' },
      ],
    },
    {
      id: 'bab7',
      title: 'Membandingkan Ciri-Ciri Bangun Datar',
      pages: [
        {
          heading: 'Segitiga',
          text: ['Segitiga punya 3 sisi dan 3 sudut. Jenisnya dilihat dari panjang sisi dan besar sudut:'],
          points: ['Sama sisi: ketiga sisi sama panjang.', 'Sama kaki: dua sisi sama panjang.', 'Siku-siku: punya satu sudut 90°.'],
        },
        {
          heading: 'Segi empat',
          text: ['Segi empat punya 4 sisi. Perhatikan cirinya:'],
          points: [
            'Persegi: 4 sisi sama panjang, 4 sudut siku-siku.',
            'Persegi panjang: sisi berhadapan sama panjang, 4 sudut siku-siku.',
            'Jajargenjang: sisi berhadapan sejajar dan sama panjang, sudutnya tidak siku-siku.',
            'Belah ketupat: 4 sisi sama panjang, sudut tidak harus siku-siku.',
            'Trapesium: punya sepasang sisi sejajar.',
            'Layang-layang: dua pasang sisi berdekatan sama panjang.',
          ],
        },
      ],
      words: [
        { term: 'Sejajar', meaning: 'Dua garis yang tidak pernah bertemu walau diperpanjang.' },
        { term: 'Sama kaki', meaning: 'Segitiga dengan dua sisi sama panjang.' },
        { term: 'Trapesium', meaning: 'Segi empat dengan sepasang sisi sejajar.' },
      ],
    },
    {
      id: 'bab8',
      title: 'Data',
      pages: [
        {
          heading: 'Mengumpulkan data',
          text: [
            'Data adalah kumpulan keterangan, misalnya buah kesukaan teman sekelas. Data dikumpulkan dengan bertanya (survei) atau mengamati, lalu dicatat dengan turus.',
            'Turus ditulis sebagai garis-garis kecil. Setiap lima garis biasanya dikelompokkan supaya mudah dihitung.',
          ],
        },
        {
          heading: 'Menyajikan data',
          text: ['Data yang sudah dihitung bisa disajikan supaya mudah dibaca:'],
          points: ['Tabel: memakai baris dan kolom.', 'Piktogram: memakai gambar sebagai lambang jumlah.', 'Diagram batang: memakai batang yang tingginya sesuai jumlah.'],
          note: 'Pada diagram batang, data paling banyak adalah batang yang paling tinggi.',
        },
      ],
      words: [
        { term: 'Data', meaning: 'Kumpulan keterangan atau fakta.' },
        { term: 'Turus', meaning: 'Garis-garis untuk mencatat hitungan.' },
        { term: 'Piktogram', meaning: 'Penyajian data memakai gambar.' },
        { term: 'Diagram batang', meaning: 'Penyajian data memakai batang.' },
      ],
    },
    {
      id: 'bab9',
      title: 'Bilangan Cacah Sampai 1.000.000',
      pages: [
        {
          heading: 'Menuju satu juta',
          text: [
            'Setelah 999.999 datanglah 1.000.000, dibaca "satu juta". Nilai tempat bertambah: ratus ribuan dan jutaan.',
            'Pada 615.204, angka 6 bernilai 600.000 (ratus ribuan), angka 1 bernilai 10.000, dan angka 5 bernilai 5.000.',
          ],
        },
        {
          heading: 'Membaca bilangan besar',
          text: [
            'Bacalah per kelompok tiga angka dari kiri. 293.000 dibaca "dua ratus sembilan puluh tiga ribu".',
            'Cara membandingkan dan mengurutkan sama seperti sebelumnya: bilangan dengan lebih banyak angka biasanya lebih besar, dan bandingkan dari angka paling kiri.',
          ],
        },
      ],
      words: [
        { term: 'Ratus ribuan', meaning: 'Tempat keenam dari kanan, nilainya ratusan ribu.' },
        { term: 'Juta', meaning: 'Seribu kali seribu: 1.000.000.' },
      ],
    },
  ],
};
