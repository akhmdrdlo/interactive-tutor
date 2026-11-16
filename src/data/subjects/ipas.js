/**
 * IPAS Kelas V (Edisi Revisi, Kemendikbudristek 2024).
 * Sumber: sumber/ipas/ipas-buku-siswa-kelas5-revisi.pdf — isi diringkas dari tiap bab.
 */
export default {
  id: 'ipas',
  source: 'Buku Siswa IPAS untuk SD/MI Kelas V (Edisi Revisi), Kemendikbudristek 2024',
  chapters: [
    {
      id: 'bab1',
      title: 'Di Mana Indonesia Berada?',
      lessons: [{
        id: 'ipas-1-letak',
        title: 'Negara Kepulauan di Khatulistiwa',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Indonesia adalah negara kepulauan terbesar di dunia. Pulau itu daratan yang dikelilingi air dan tetap muncul saat air pasang.' },
          { speaker: 'student', mood: 'wow', text: 'Terus ujung-ujung Indonesia ada di mana, Mochi?' },
          { speaker: 'mentor', text: 'Paling utara Pulau Miangas, paling selatan Pulau Rote, paling barat Pulau Rondo, dan paling timur Merauke. Indonesia juga dilewati garis khatulistiwa!' },
          { speaker: 'mentor', mood: 'happy', text: 'Karena lautnya luas, Indonesia disebut negara maritim. Karena banyak penduduknya bertani, disebut juga negara agraris.' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'Negara yang sebagian besar penduduknya bekerja sebagai petani disebut negara …',
            options: [{ id: 'a', label: 'Agraris' }, { id: 'b', label: 'Maritim' }, { id: 'c', label: 'Kepulauan' }],
            answer: 'a',
            hint: 'Maritim berhubungan dengan laut. Yang berhubungan dengan sawah dan kebun apa, ya?',
            explain: 'Indonesia termasuk negara agraris terbesar di Asia.',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkan arah dengan pulau ujung Indonesia!',
            pairs: [
              { left: 'Paling utara', right: 'Pulau Miangas' },
              { left: 'Paling selatan', right: 'Pulau Rote' },
              { left: 'Paling barat', right: 'Pulau Rondo' },
              { left: 'Paling timur', right: 'Merauke' },
            ],
            hint: 'Rondo ada di Aceh, Merauke di Papua. Miangas dekat Sulawesi Utara.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Peta dunia yang bentuknya dibuat mirip bumi disebut …',
            options: [{ id: 'a', label: 'Atlas' }, { id: 'b', label: 'Globe (bola dunia)' }, { id: 'c', label: 'Denah' }],
            answer: 'b',
            hint: 'Bentuknya bulat seperti bola.',
          },
        ],
      }, {
          id: 'ipas-1-peta',
          title: 'Membaca Peta',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Peta adalah gambaran permukaan bumi pada bidang datar yang diperkecil dengan skala dan dilihat dari atas.' },
            { speaker: 'mentor', text: 'Legenda menjelaskan arti warna dan simbol di peta. Mata angin menunjukkan arah utara, selatan, timur, dan barat.' },
            { speaker: 'student', mood: 'wow', text: 'Jadi warna biru di peta itu laut?' },
            { speaker: 'mentor', mood: 'happy', text: 'Betul! Hijau biasanya dataran rendah, cokelat pegunungan. Jelajahi Peta Indonesia di meja belajar, yuk!' },
          ],
          quiz: [
            { type: 'drag-match', prompt: 'Pasangkan bagian peta dengan gunanya!', pairs: [{ left: 'Legenda', right: 'Menjelaskan arti warna dan simbol' }, { left: 'Skala', right: 'Menunjukkan perbandingan ukuran' }, { left: 'Mata angin', right: 'Menunjukkan arah' }], hint: 'Skala berhubungan dengan ukuran yang diperkecil.' },
            { type: 'multiple-choice', prompt: 'Di peta, warna biru biasanya menunjukkan …', options: [{ id: 'a', label: 'Perairan' }, { id: 'b', label: 'Gunung' }, { id: 'c', label: 'Kota' }], answer: 'a', hint: 'Warnanya seperti air laut.' },
            { type: 'multiple-choice', prompt: 'Indonesia diapit oleh dua samudra, yaitu …', options: [{ id: 'a', label: 'Samudra Hindia dan Samudra Pasifik' }, { id: 'b', label: 'Samudra Atlantik dan Arktik' }, { id: 'c', label: 'Laut Jawa dan Laut Banda' }], answer: 'a', hint: 'Satu di barat daya, satu di timur laut Indonesia.' },
          ],
        }],
    },
    {
      id: 'bab2',
      title: 'Majulah Daerahku!',
      lessons: [{
        id: 'ipas-2-ekonomi',
        title: 'Produksi, Distribusi, Konsumsi',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Untuk memenuhi kebutuhan, manusia melakukan kegiatan ekonomi: produksi, distribusi, dan konsumsi.' },
          { speaker: 'mentor', text: 'Produksi itu membuat barang. Distribusi itu mengirim atau menjual barang. Konsumsi itu memakai barang.' },
          { speaker: 'student', mood: 'wow', text: 'Berarti waktu aku jajan di kantin, aku juga pelaku ekonomi?' },
          { speaker: 'mentor', mood: 'happy', text: 'Betul! Setiap orang adalah pelaku ekonomi. Ingat, konsumsi menghasilkan sampah — jadi jadilah pelaku ekonomi yang bijak.' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Pasangkan kegiatan dengan jenisnya!',
            pairs: [
              { left: 'Petani menanam padi', right: 'Produksi' },
              { left: 'Truk mengantar beras ke pasar', right: 'Distribusi' },
              { left: 'Ibu memasak nasi untuk keluarga', right: 'Konsumsi' },
            ],
            hint: 'Membuat → produksi, mengirim → distribusi, memakai → konsumsi.',
          },
          {
            type: 'sequence',
            prompt: 'Urutkan perjalanan sebungkus roti!',
            steps: ['Pabrik membuat roti', 'Roti dikirim ke toko', 'Kamu membeli dan makan roti', 'Bungkusnya dibuang ke tempat sampah'],
            hint: 'Kegiatan ekonomi: produksi dulu, lalu distribusi, lalu konsumsi. Sampah muncul paling akhir.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Kebutuhan yang harus dipenuhi setiap hari, seperti makan dan pakaian, disebut kebutuhan …',
            options: [{ id: 'a', label: 'Tersier' }, { id: 'b', label: 'Primer' }, { id: 'c', label: 'Sekunder' }],
            answer: 'b',
            hint: 'Kata ini berarti "utama" atau "pertama".',
          },
        ],
      }],
    },
    {
      id: 'bab3',
      title: 'Harmoni dalam Ekosistem',
      lessons: [{
        id: 'ipas-3-ekosistem',
        title: 'Rantai Makanan',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Makhluk hidup disebut komponen biotik. Benda tak hidup seperti air, tanah, dan matahari disebut komponen abiotik.' },
          { speaker: 'mentor', text: 'Individu yang sejenis membentuk populasi. Beragam populasi di satu habitat membentuk komunitas. Semuanya berinteraksi dalam ekosistem.' },
          { speaker: 'student', text: 'Kalau tumbuhan dimakan ulat, itu interaksi juga?' },
          { speaker: 'mentor', mood: 'happy', text: 'Iya! Hubungan makan dan dimakan disebut rantai makanan. Tumbuhan membuat makanannya sendiri, jadi disebut produsen.' },
        ],
        quiz: [
          {
            type: 'sequence',
            prompt: 'Susun rantai makanan di sawah!',
            steps: ['Padi', 'Tikus', 'Ular', 'Elang'],
            hint: 'Mulai dari produsen (tumbuhan), lalu siapa yang memakannya.',
          },
          {
            type: 'drag-match',
            prompt: 'Biotik atau abiotik?',
            pairs: [
              { left: 'Jamur', right: 'Biotik' },
              { left: 'Batu', right: 'Abiotik' },
              { left: 'Ikan', right: 'Biotik' },
              { left: 'Air', right: 'Abiotik' },
            ],
            hint: 'Biotik = hidup (tumbuh, makan, berkembang biak).',
          },
          {
            type: 'multiple-choice',
            prompt: 'Lingkungan tempat tinggal makhluk hidup disebut …',
            options: [{ id: 'a', label: 'Populasi' }, { id: 'b', label: 'Habitat' }, { id: 'c', label: 'Komunitas' }],
            answer: 'b',
            hint: 'Populasi dan komunitas adalah kumpulan makhluk hidup, bukan tempatnya.',
          },
        ],
      }, {
          id: 'ipas-3-jaring',
          title: 'Jaring-Jaring Makanan',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Di alam, rantai makanan saling bersambung. Kumpulan rantai makanan disebut jaring-jaring makanan.' },
            { speaker: 'mentor', text: 'Pada jaring-jaring makanan, satu hewan bisa punya peran berbeda. Tikus dimakan ular, tapi juga dimakan elang.' },
            { speaker: 'student', text: 'Hewan pemangsa itu namanya apa?' },
            { speaker: 'mentor', mood: 'happy', text: 'Predator! Kalau satu hewan hilang, hewan lain ikut terganggu. Itulah pentingnya menjaga keseimbangan.' },
          ],
          quiz: [
            { type: 'multiple-choice', prompt: 'Kumpulan beberapa rantai makanan yang saling berhubungan disebut …', options: [{ id: 'a', label: 'Jaring-jaring makanan' }, { id: 'b', label: 'Habitat' }, { id: 'c', label: 'Populasi' }], answer: 'a', hint: 'Bentuknya seperti jaring laba-laba.' },
            { type: 'drag-match', prompt: 'Pasangkan hewan dengan jenis makanannya!', pairs: [{ left: 'Kambing', right: 'Herbivora' }, { left: 'Harimau', right: 'Karnivora' }, { left: 'Ayam', right: 'Omnivora' }], hint: 'Herbivora = tumbuhan, karnivora = daging, omnivora = keduanya.' },
            { type: 'multiple-choice', prompt: 'Jika semua ular di sawah diburu habis, yang terjadi adalah …', options: [{ id: 'a', label: 'Tikus makin banyak dan padi rusak' }, { id: 'b', label: 'Padi makin subur' }, { id: 'c', label: 'Tidak ada perubahan' }], answer: 'a', hint: 'Ular memakan tikus. Kalau ular hilang, siapa yang mengendalikan tikus?' },
          ],
        }],
    },
    {
      id: 'bab4',
      title: 'Air Sumber Kehidupan',
      lessons: [{
        id: 'ipas-4-siklus-air',
        title: 'Siklus Air',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Air di bumi terus berputar dalam siklus air. Panas matahari membuat air menguap — namanya evaporasi.' },
          { speaker: 'mentor', text: 'Tumbuhan juga melepas uap air lewat daun, itu transpirasi. Uap air lalu mendingin dan mengembun jadi awan: kondensasi.' },
          { speaker: 'student', mood: 'wow', text: 'Lalu awannya jadi hujan?' },
          { speaker: 'mentor', mood: 'happy', text: 'Tepat! Jatuhnya hujan disebut presipitasi. Air hujan meresap ke tanah lewat infiltrasi. Yuk hemat air dan jangan cemari sungai!' },
        ],
        quiz: [
          {
            type: 'sequence',
            prompt: 'Urutkan tahapan siklus air!',
            steps: ['Evaporasi (air menguap)', 'Kondensasi (uap mengembun jadi awan)', 'Presipitasi (hujan turun)', 'Infiltrasi (air meresap ke tanah)'],
            hint: 'Air harus menguap dulu sebelum bisa menjadi awan.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Pakaian basah yang dijemur menjadi kering. Peristiwa ini contoh …',
            options: [{ id: 'a', label: 'Kondensasi' }, { id: 'b', label: 'Evaporasi' }, { id: 'c', label: 'Presipitasi' }],
            answer: 'b',
            hint: 'Airnya pergi dari pakaian karena panas matahari.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Salah satu penyebab air bersih makin berkurang adalah …',
            options: [{ id: 'a', label: 'Pencemaran air' }, { id: 'b', label: 'Menanam pohon' }, { id: 'c', label: 'Membuat daerah resapan' }],
            answer: 'a',
            hint: 'Menanam pohon dan daerah resapan justru menjaga air.',
          },
        ],
      }],
    },
    {
      id: 'bab5',
      title: 'Daerahku yang Bersejarah',
      lessons: [{
        id: 'ipas-5-warisan',
        title: 'Warisan Budaya',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: '"Bangsa yang besar adalah bangsa yang tidak melupakan sejarahnya." Setiap daerah punya cerita masa lalu dan warisan budaya.' },
          { speaker: 'mentor', text: 'Warisan budaya benda bisa kita lihat dan raba, misalnya candi atau alat musik tifa. Warisan tak benda contohnya lagu, tarian, dan jamu.' },
          { speaker: 'student', mood: 'wow', text: 'Jamu itu warisan budaya juga?' },
          { speaker: 'mentor', mood: 'happy', text: 'Iya, diakui UNESCO tahun 2023! Ada juga akulturasi, yaitu percampuran dua budaya — contohnya Masjid Menara Kudus.' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Warisan budaya benda atau tak benda?',
            pairs: [
              { left: 'Alat musik tifa', right: 'Benda' },
              { left: 'Lagu Sajojo', right: 'Tak benda' },
              { left: 'Masjid Menara Kudus', right: 'Benda' },
              { left: 'Jamu tradisional', right: 'Tak benda' },
            ],
            hint: 'Benda = bisa dilihat dan diraba sebagai barang. Tak benda = pengetahuan, lagu, atau kebiasaan.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Percampuran dua budaya yang membentuk budaya baru disebut …',
            options: [{ id: 'a', label: 'Akulturasi' }, { id: 'b', label: 'Proklamasi' }, { id: 'c', label: 'Ekosistem' }],
            answer: 'a',
            hint: 'Contohnya bangunan Masjid Menara Kudus yang memadukan budaya Jawa dan Hindu.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Penjajahan Hindia Belanda diawali dengan berdirinya VOC pada tahun …',
            options: [{ id: 'a', label: '1945' }, { id: 'b', label: '1602' }, { id: 'c', label: '1928' }],
            answer: 'b',
            hint: 'Jauh sebelum Indonesia merdeka — di awal tahun 1600-an.',
          },
        ],
      }, {
          id: 'ipas-5-kerajaan',
          title: 'Kerajaan di Nusantara',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Prasasti Yupa dari abad ke-4 menceritakan Kerajaan Kutai, kerajaan Hindu tertua di Indonesia.' },
            { speaker: 'mentor', text: 'Candi Borobudur adalah peninggalan Kerajaan Mataram Kuno di masa Dinasti Syailendra.' },
            { speaker: 'student', mood: 'wow', text: 'Kalau Sriwijaya dan Majapahit?' },
            { speaker: 'mentor', mood: 'happy', text: 'Pada masa Sriwijaya, pedagang Arab sudah berdatangan. Majapahit akhirnya ditaklukkan Kerajaan Demak tahun 1527.' },
          ],
          quiz: [
            { type: 'drag-match', prompt: 'Pasangkan kerajaan dengan peninggalan atau ceritanya!', pairs: [{ left: 'Kutai', right: 'Prasasti Yupa' }, { left: 'Mataram Kuno', right: 'Candi Borobudur' }, { left: 'Demak', right: 'Menaklukkan Majapahit tahun 1527' }], hint: 'Borobudur dibangun Dinasti Syailendra.' },
            { type: 'multiple-choice', prompt: 'Kerajaan Hindu tertua di Indonesia adalah …', options: [{ id: 'a', label: 'Kutai' }, { id: 'b', label: 'Demak' }, { id: 'c', label: 'Majapahit' }], answer: 'a', hint: 'Buktinya Prasasti Yupa dari abad ke-4.' },
            { type: 'multiple-choice', prompt: 'Benda bertulisan dari masa lalu yang dipahat di batu disebut …', options: [{ id: 'a', label: 'Prasasti' }, { id: 'b', label: 'Candi' }, { id: 'c', label: 'Peta' }], answer: 'a', hint: 'Contohnya Yupa dan Madhawapura.' },
          ],
        }],
    },
    {
      id: 'bab6',
      title: 'Perubahan pada Diriku',
      lessons: [{
        id: 'ipas-6-puber',
        title: 'Bersiap Menghadapi Masa Puber',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Masa puber adalah masa peralihan sebelum menjadi dewasa. Tubuh, perasaan, dan cara bergaul kita ikut berubah.' },
          { speaker: 'student', text: 'Kadang perasaanku cepat berubah. Itu normal nggak, Mochi?' },
          { speaker: 'mentor', mood: 'happy', text: 'Normal sekali! Itu perubahan emosional. Ceritakan pada orang dewasa yang kamu percaya, ya.' },
          { speaker: 'mentor', text: 'Ingat juga: tubuhmu adalah privasimu. Jaga kebersihan, makan bergizi, tidur cukup, dan hormati privasi teman.' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'Masa puber adalah …',
            options: [{ id: 'a', label: 'Masa peralihan sebelum dewasa' }, { id: 'b', label: 'Masa bayi' }, { id: 'c', label: 'Masa tua' }],
            answer: 'a',
            hint: 'Masa ini biasa disebut masa remaja.',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkan contoh dengan jenis perubahannya!',
            pairs: [
              { left: 'Tubuh bertambah tinggi', right: 'Perubahan fisik' },
              { left: 'Perasaan mudah berubah', right: 'Perubahan emosional' },
              { left: 'Ingin lebih banyak bergaul', right: 'Perubahan sosial' },
            ],
            hint: 'Fisik = tubuh, emosional = perasaan, sosial = hubungan dengan orang lain.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Temanmu menceritakan perubahan yang ia alami. Sikap yang tepat adalah …',
            options: [{ id: 'a', label: 'Menyebarkan ceritanya ke kelas' }, { id: 'b', label: 'Menjaga rahasianya dan mendengarkan' }, { id: 'c', label: 'Menertawakannya' }],
            answer: 'b',
            hint: 'Kalau teman bercerita, artinya kamu orang yang ia percaya.',
          },
        ],
      }],
    },
    {
      id: 'bab7',
      title: 'Bermain dengan Cahaya',
      lessons: [
        {
          id: 'ipas-7-cahaya',
          title: 'Sifat-Sifat Cahaya',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Matahari adalah sumber cahaya terbesar di bumi. Kita bisa melihat benda karena ada cahaya.' },
            { speaker: 'mentor', text: 'Cahaya merambat lurus, bisa dipantulkan, menembus benda bening, tapi tidak bisa menembus benda gelap seperti tembok.' },
            { speaker: 'student', mood: 'wow', text: 'Pelangi juga karena cahaya?' },
            { speaker: 'mentor', mood: 'happy', text: 'Benar! Cahaya putih dapat diuraikan menjadi warna-warna pelangi.' },
          ],
          quiz: [
            {
              type: 'drag-match',
              prompt: 'Pasangkan benda dengan sifatnya terhadap cahaya!',
              pairs: [
                { left: 'Kaca jendela', right: 'Bening — semua cahaya menembus' },
                { left: 'Kertas minyak', right: 'Buram — sebagian cahaya menembus' },
                { left: 'Tembok', right: 'Gelap — tidak ditembus cahaya' },
              ],
              hint: 'Bisakah kamu melihat jelas ke balik benda itu?',
            },
            {
              type: 'multiple-choice',
              prompt: 'Bayangan terbentuk di belakang boneka yang disinari senter karena …',
              options: [{ id: 'a', label: 'Cahaya merambat lurus dan terhalang boneka' }, { id: 'b', label: 'Boneka mengeluarkan cahaya' }, { id: 'c', label: 'Senternya rusak' }],
              answer: 'a',
              hint: 'Cahaya merambat lurus. Apa jadinya kalau ada benda di jalannya?',
            },
            {
              type: 'sequence',
              prompt: 'Urutkan percobaan membuat bayangan!',
              steps: ['Siapkan senter dan boneka', 'Matikan lampu kamar', 'Sinari boneka dengan senter', 'Amati bayangan di dinding'],
              hint: 'Siapkan alat dulu, baru lakukan percobaannya.',
            },
          ],
        },
        {
          id: 'ipas-7-warna',
          title: 'Misteri Bayangan & Warna',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Bayangan bisa berubah ukuran! Semakin dekat benda ke sumber cahaya, bayangannya semakin besar.' },
            { speaker: 'student', mood: 'wow', text: 'Kalau bendanya dijauhkan dari senter?' },
            { speaker: 'mentor', text: 'Bayangannya mengecil. Coba sendiri di Lab Bayangan di meja belajar!' },
            { speaker: 'mentor', mood: 'happy', text: 'Saat cahaya putih melewati kaca prisma, cahaya ditekuk dan diuraikan menjadi warna-warna pelangi.' },
          ],
          quiz: [
            { type: 'multiple-choice', prompt: 'Senter didekatkan ke boneka. Bayangan boneka di dinding menjadi …', options: [{ id: 'a', label: 'Lebih besar' }, { id: 'b', label: 'Lebih kecil' }, { id: 'c', label: 'Hilang' }], answer: 'a', hint: 'Benda yang dekat sumber cahaya menghalangi lebih banyak cahaya.' },
            { type: 'multiple-choice', prompt: 'Benda yang dapat menguraikan cahaya putih menjadi warna pelangi adalah …', options: [{ id: 'a', label: 'Kaca prisma' }, { id: 'b', label: 'Tembok' }, { id: 'c', label: 'Kertas karton' }], answer: 'a', hint: 'Bendanya bening dan berbentuk segitiga.' },
            { type: 'sequence', prompt: 'Urutkan warna pelangi dari atas!', steps: ['Merah', 'Jingga', 'Kuning', 'Hijau', 'Biru'], hint: 'Ingat urutan mejikuhibiniu: me-ji-ku-hi-bi.' },
          ],
        },
      ],
    },
    {
      id: 'bab8',
      title: 'Ramai karena Bunyi',
      lessons: [
        {
          id: 'ipas-7-bunyi',
          title: 'Bunyi di Sekitar Kita',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Bunyi adalah energi yang terjadi karena getaran benda. Benda yang menghasilkan bunyi disebut sumber bunyi.' },
            { speaker: 'student', text: 'Kenapa astronaut tidak bisa mengobrol langsung di luar angkasa?' },
            { speaker: 'mentor', mood: 'happy', text: 'Karena di sana hampa udara! Bunyi butuh zat perantara untuk merambat — padat, cair, atau gas. Telepon kaleng memakai benang sebagai perantara.' },
            { speaker: 'mentor', text: 'Bunyi juga bisa memantul. Gema adalah bunyi pantul yang terdengar setelah bunyi asli selesai, biasanya di tempat luas.' },
          ],
          quiz: [
            {
              type: 'multiple-choice',
              prompt: 'Bunyi terjadi karena …',
              options: [{ id: 'a', label: 'Getaran benda' }, { id: 'b', label: 'Cahaya matahari' }, { id: 'c', label: 'Benda diam' }],
              answer: 'a',
              hint: 'Sentuh lehermu saat bernyanyi — terasa bergetar, kan?',
            },
            {
              type: 'multiple-choice',
              prompt: 'Pada telepon kaleng, bunyi merambat melalui …',
              options: [{ id: 'a', label: 'Benang (benda padat)' }, { id: 'b', label: 'Ruang hampa' }, { id: 'c', label: 'Cahaya' }],
              answer: 'a',
              hint: 'Apa yang menghubungkan kedua kaleng?',
            },
            {
              type: 'multiple-choice',
              prompt: 'Bunyi pantul yang terdengar setelah bunyi asli selesai disebut …',
              options: [{ id: 'a', label: 'Gaung' }, { id: 'b', label: 'Gema' }, { id: 'c', label: 'Nada' }],
              answer: 'b',
              hint: 'Seperti saat kamu berteriak di lembah dan suaramu kembali terdengar utuh.',
            },
          ],
        },
        {
          id: 'ipas-8-pantul',
          title: 'Memantulkan & Meredam Bunyi',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Bunyi bisa memantul saat mengenai dinding keras. Pantulan bunyi menimbulkan gema dan gaung.' },
            { speaker: 'mentor', text: 'Gema terdengar setelah bunyi asli selesai, biasanya di tempat luas seperti lembah. Gaung terdengar hampir bersamaan dengan bunyi asli, sehingga suara jadi kurang jelas.' },
            { speaker: 'student', mood: 'wow', text: 'Kenapa dinding bioskop dipasangi busa?' },
            { speaker: 'mentor', mood: 'happy', text: 'Untuk meredam bunyi! Benda lunak seperti busa, karpet, dan gorden menyerap bunyi supaya tidak memantul.' },
          ],
          quiz: [
            {
              type: 'drag-match',
              prompt: 'Pasangkan istilah dengan artinya!',
              pairs: [
                { left: 'Gema', right: 'Bunyi pantul terdengar setelah bunyi asli selesai' },
                { left: 'Gaung', right: 'Bunyi pantul terdengar hampir bersamaan' },
                { left: 'Meredam', right: 'Menyerap bunyi agar tidak memantul' },
              ],
              hint: 'Gema = di lembah yang luas. Gaung = di ruangan tertutup yang kosong.',
            },
            {
              type: 'multiple-choice',
              prompt: 'Benda yang paling baik untuk meredam bunyi adalah …',
              options: [{ id: 'a', label: 'Busa dan karpet' }, { id: 'b', label: 'Kaca jendela' }, { id: 'c', label: 'Lantai keramik' }],
              answer: 'a',
              hint: 'Benda lunak menyerap bunyi, benda keras memantulkannya.',
            },
            {
              type: 'multiple-choice',
              prompt: 'Bunyi dapat merambat melalui …',
              options: [{ id: 'a', label: 'Zat padat, cair, dan gas' }, { id: 'b', label: 'Ruang hampa saja' }, { id: 'c', label: 'Cahaya saja' }],
              answer: 'a',
              hint: 'Telepon kaleng (padat), suara di kolam renang (cair), suara di udara (gas).',
            },
          ],
        },
      ],
    },
  ],
};
