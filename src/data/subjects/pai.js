/**
 * Pendidikan Agama Islam dan Budi Pekerti Kelas V (Kemendikbudristek).
 * Sumber: sumber/pai/pai-budi-pekerti-buku-guru-kelas5.pdf (buku siswa hasil scan tanpa teks).
 * Topik tiap bab mengikuti tujuan pembelajaran & pokok materi di buku guru.
 * Catatan untuk guru: mohon periksa kembali istilah dan transliterasi sebelum dipakai di kelas.
 */
export default {
  id: 'pai',
  source: 'Buku Guru PAI dan Budi Pekerti untuk SD Kelas V, Kemendikbudristek',
  chapters: [
    {
      id: 'bab1',
      title: 'Menyayangi Anak Yatim',
      lessons: [{
        id: 'pai-1-almaun',
        title: 'Pesan Q.S. al-Mā‘ūn',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Q.S. al-Mā‘ūn terdiri atas 7 ayat. Surah ini mengajak kita peduli kepada anak yatim dan orang miskin.' },
          { speaker: 'mentor', text: 'Allah menyebut pendusta agama sebagai orang yang menghardik anak yatim dan tidak mendorong memberi makan orang miskin.' },
          { speaker: 'student', mood: 'wow', text: 'Ada pesan lain dalam surah itu?' },
          { speaker: 'mentor', mood: 'happy', text: 'Ada! Jangan lalai dalam salat, jangan riya (pamer), dan jangan enggan menolong dengan barang yang berguna.' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'Q.S. al-Mā‘ūn terdiri atas berapa ayat?',
            options: [{ id: 'a', label: '5 ayat' }, { id: 'b', label: '7 ayat' }, { id: 'c', label: '10 ayat' }],
            answer: 'b',
            hint: 'Jumlahnya sama dengan jumlah hari dalam seminggu.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Sikap yang sesuai pesan Q.S. al-Mā‘ūn adalah …',
            options: [{ id: 'a', label: 'Berbagi makanan dengan teman yatim' }, { id: 'b', label: 'Mengejek teman yang tidak punya ayah' }, { id: 'c', label: 'Pamer saat bersedekah' }],
            answer: 'a',
            hint: 'Surah ini melarang menghardik anak yatim dan melarang riya.',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkan istilah dengan artinya!',
            pairs: [
              { left: 'Yatim', right: 'Anak yang ayahnya sudah wafat' },
              { left: 'Riya', right: 'Beramal supaya dipuji orang' },
              { left: 'Menghardik', right: 'Membentak dengan kasar' },
            ],
            hint: 'Riya berkaitan dengan pamer.',
          },
        ],
      }],
    },
    {
      id: 'bab2',
      title: 'Lebih Dekat dengan Allah',
      lessons: [{
        id: 'pai-2-asmaulhusna',
        title: 'Asmaulhusna',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Asmaulhusna adalah nama-nama Allah yang baik. Kita akan mengenal lima di antaranya.' },
          { speaker: 'mentor', text: 'Al-Qawiyyu: Maha Kuat. Al-Qayyūm: Maha Berdiri Sendiri. Al-Muhyī: Maha Menghidupkan.' },
          { speaker: 'student', text: 'Dua lagi apa, Mochi?' },
          { speaker: 'mentor', mood: 'happy', text: 'Al-Mumīt: Maha Mematikan, dan al-Bā‘iṡ: Maha Membangkitkan. Meyakininya membuat kita rajin beribadah dan tidak sombong.' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Pasangkan asmaulhusna dengan artinya!',
            pairs: [
              { left: 'Al-Qawiyyu', right: 'Maha Kuat' },
              { left: 'Al-Qayyūm', right: 'Maha Berdiri Sendiri' },
              { left: 'Al-Muhyī', right: 'Maha Menghidupkan' },
              { left: 'Al-Bā‘iṡ', right: 'Maha Membangkitkan' },
            ],
            hint: 'Muhyī mirip kata "hidup".',
          },
          {
            type: 'multiple-choice',
            prompt: 'Al-Mumīt artinya Allah Maha …',
            options: [{ id: 'a', label: 'Mematikan' }, { id: 'b', label: 'Pengasih' }, { id: 'c', label: 'Mendengar' }],
            answer: 'a',
            hint: 'Pasangan dari al-Muhyī (Maha Menghidupkan).',
          },
          {
            type: 'multiple-choice',
            prompt: 'Sikap yang menunjukkan keyakinan bahwa Allah al-Qawiyyu adalah …',
            options: [{ id: 'a', label: 'Sombong karena merasa paling kuat' }, { id: 'b', label: 'Tidak sombong dan berdoa memohon kekuatan' }, { id: 'c', label: 'Malas berusaha' }],
            answer: 'b',
            hint: 'Hanya Allah Yang Maha Kuat.',
          },
        ],
      }],
    },
    {
      id: 'bab3',
      title: 'Aku Anak Saleh',
      lessons: [{
        id: 'pai-3-saleh',
        title: 'Saling Menghargai & Menjadi Khalifah',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Anak saleh menghargai orang lain, walaupun berbeda suku, budaya, atau agama.' },
          { speaker: 'mentor', text: 'Manusia juga diciptakan sebagai khalifah di bumi — bertugas menjaga dan merawat alam.' },
          { speaker: 'student', mood: 'wow', text: 'Berarti menyiram tanaman dan tidak buang sampah sembarangan juga termasuk?' },
          { speaker: 'mentor', mood: 'happy', text: 'Betul! Itu contoh perilaku khalifah yang baik.' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'Tugas manusia sebagai khalifah di bumi adalah …',
            options: [{ id: 'a', label: 'Menjaga dan merawat alam' }, { id: 'b', label: 'Merusak hutan' }, { id: 'c', label: 'Membuang sampah sembarangan' }],
            answer: 'a',
            hint: 'Khalifah berarti pemimpin dan pengelola.',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkan contoh dengan sikapnya!',
            pairs: [
              { left: 'Menghormati teman yang sedang beribadah', right: 'Saling menghargai' },
              { left: 'Menanam pohon di halaman sekolah', right: 'Menjadi khalifah' },
              { left: 'Mendengarkan pendapat teman', right: 'Saling menghargai' },
            ],
            hint: 'Khalifah berkaitan dengan menjaga alam.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Temanmu berbeda suku. Sikap anak saleh adalah …',
            options: [{ id: 'a', label: 'Menghindarinya' }, { id: 'b', label: 'Bersahabat dan menghargainya' }, { id: 'c', label: 'Mengejek bahasanya' }],
            answer: 'b',
            hint: 'Perbedaan bukan alasan untuk tidak berteman.',
          },
        ],
      }],
    },
    {
      id: 'bab4',
      title: 'Hidup Lapang dengan Berbagi',
      lessons: [{
        id: 'pai-4-berbagi',
        title: 'Zakat Fitrah, Infak, Sedekah, Hadiah',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Harta kita sejatinya milik Allah, dan sebagian adalah hak orang lain. Ada banyak cara berbagi!' },
          { speaker: 'mentor', text: 'Zakat fitrah wajib bagi setiap muslim, dikeluarkan di bulan Ramadan sebelum salat Idulfitri, berupa makanan pokok.' },
          { speaker: 'student', text: 'Kalau infak dan sedekah?' },
          { speaker: 'mentor', mood: 'happy', text: 'Infak itu memberikan harta di jalan Allah. Sedekah lebih luas — senyum pun bisa jadi sedekah! Hadiah diberikan untuk menyenangkan dan mempererat persahabatan.' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'Zakat fitrah dikeluarkan pada …',
            options: [{ id: 'a', label: 'Bulan Ramadan, sebelum salat Idulfitri' }, { id: 'b', label: 'Hari Iduladha' }, { id: 'c', label: 'Tahun baru' }],
            answer: 'a',
            hint: 'Fitrah berkaitan dengan Idulfitri.',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkan cara berbagi dengan contohnya!',
            pairs: [
              { left: 'Zakat fitrah', right: 'Memberi beras sebelum Idulfitri' },
              { left: 'Sedekah', right: 'Tersenyum dan membantu teman' },
              { left: 'Hadiah', right: 'Memberi kado ulang tahun sahabat' },
            ],
            hint: 'Sedekah tidak selalu berupa uang.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Zakat fitrah berupa …',
            options: [{ id: 'a', label: 'Mainan' }, { id: 'b', label: 'Makanan pokok' }, { id: 'c', label: 'Pakaian bekas' }],
            answer: 'b',
            hint: 'Di Indonesia biasanya berupa beras.',
          },
        ],
      }],
    },
    {
      id: 'bab5',
      title: 'Meneladani Perjuangan Rasulullah',
      lessons: [{
        id: 'pai-5-fathu-makkah',
        title: 'Fathu Makkah & Haji Wada',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Fathu Makkah adalah peristiwa pembebasan kota Makkah oleh Rasulullah saw. dan kaum muslimin.' },
          { speaker: 'mentor', text: 'Rasulullah memasuki Makkah dengan damai dan memaafkan penduduk yang dulu memusuhinya.' },
          { speaker: 'student', mood: 'wow', text: 'Rasulullah pemaaf sekali!' },
          { speaker: 'mentor', mood: 'happy', text: 'Iya. Setelah itu ada Haji Wada, haji perpisahan Rasulullah. Kita teladani sifat sabar, pantang menyerah, dan cinta damai beliau.' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'Fathu Makkah artinya …',
            options: [{ id: 'a', label: 'Pembebasan kota Makkah' }, { id: 'b', label: 'Hijrah ke Madinah' }, { id: 'c', label: 'Pembangunan masjid' }],
            answer: 'a',
            hint: '"Fathu" berarti pembukaan atau pembebasan.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Sikap Rasulullah kepada penduduk Makkah saat Fathu Makkah adalah …',
            options: [{ id: 'a', label: 'Membalas dendam' }, { id: 'b', label: 'Memaafkan mereka' }, { id: 'c', label: 'Mengusir mereka' }],
            answer: 'b',
            hint: 'Rasulullah memasuki Makkah dengan damai.',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkan peristiwa dengan artinya!',
            pairs: [
              { left: 'Fathu Makkah', right: 'Pembebasan kota Makkah' },
              { left: 'Haji Wada', right: 'Haji perpisahan Rasulullah' },
            ],
            hint: '"Wada" berarti perpisahan.',
          },
        ],
      }],
    },
    {
      id: 'bab6',
      title: 'Hidup Damai dalam Kebersamaan',
      lessons: [{
        id: 'pai-6-damai',
        title: 'Toleransi dalam Al-Qur’an',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Q.S. Āli ‘Imrān/3: 64 mengajak mencari kalimatun sawā’, yaitu titik temu atau kesepakatan bersama.' },
          { speaker: 'mentor', text: 'Q.S. al-Baqarah/2: 256 mengajarkan bahwa tidak ada paksaan dalam beragama.' },
          { speaker: 'student', text: 'Jadi kita harus hidup rukun dengan semua orang?' },
          { speaker: 'mentor', mood: 'happy', text: 'Betul! Selesaikan perbedaan dengan musyawarah dan dialog, sambil tetap teguh pada keimanan kita.' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Pasangkan ayat dengan pesannya!',
            pairs: [
              { left: 'Q.S. Āli ‘Imrān/3: 64', right: 'Mencari titik temu (kalimatun sawā’)' },
              { left: 'Q.S. al-Baqarah/2: 256', right: 'Tidak ada paksaan dalam beragama' },
            ],
            hint: 'Kalimatun sawā’ ada di surah Āli ‘Imrān.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Cara menyelesaikan perbedaan pendapat yang dianjurkan Islam adalah …',
            options: [{ id: 'a', label: 'Bertengkar' }, { id: 'b', label: 'Musyawarah dan dialog' }, { id: 'c', label: 'Saling mendiamkan' }],
            answer: 'b',
            hint: 'Cari kesepakatan bersama.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Tetangga berbeda agama sedang merayakan hari raya. Sikap yang tepat adalah …',
            options: [{ id: 'a', label: 'Menghormati dan tidak mengganggu' }, { id: 'b', label: 'Membuat keributan' }, { id: 'c', label: 'Memaksa ikut beribadah' }],
            answer: 'a',
            hint: 'Tidak ada paksaan dalam beragama, dan kita hidup damai bersama.',
          },
        ],
      }],
    },
    {
      id: 'bab7',
      title: 'Ketika Berhentinya Kehidupan',
      lessons: [{
        id: 'pai-7-hari-akhir',
        title: 'Iman kepada Hari Akhir',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Iman kepada hari akhir adalah rukun iman yang kelima.' },
          { speaker: 'mentor', text: 'Kiamat sugra (kecil) adalah berakhirnya kehidupan seseorang atau sebagian makhluk, misalnya kematian dan bencana alam.' },
          { speaker: 'student', mood: 'wow', text: 'Kalau kiamat kubra?' },
          { speaker: 'mentor', mood: 'happy', text: 'Hancurnya seluruh alam semesta. Karena itu kita membiasakan akhlak terpuji — amalan yang paling berat timbangannya di akhirat.' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Pasangkan jenis kiamat dengan artinya!',
            pairs: [
              { left: 'Kiamat sugra', right: 'Berakhirnya hidup seseorang atau sebagian makhluk' },
              { left: 'Kiamat kubra', right: 'Hancurnya seluruh alam semesta' },
            ],
            hint: 'Sugra = kecil, kubra = besar.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Iman kepada hari akhir adalah rukun iman yang ke- …',
            options: [{ id: 'a', label: 'Tiga' }, { id: 'b', label: 'Lima' }, { id: 'c', label: 'Enam' }],
            answer: 'b',
            hint: 'Urutannya: Allah, malaikat, kitab, rasul, hari akhir, qada dan qadar.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Amalan yang paling berat timbangannya di akhirat adalah …',
            options: [{ id: 'a', label: 'Akhlak terpuji' }, { id: 'b', label: 'Banyak mainan' }, { id: 'c', label: 'Pakaian mahal' }],
            answer: 'a',
            hint: 'Berkaitan dengan perilaku baik kita sehari-hari.',
          },
        ],
      }],
    },
    {
      id: 'bab8',
      title: 'Senangnya Berteman',
      lessons: [{
        id: 'pai-8-ukhuwah',
        title: 'Tiga Macam Ukhuwah',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Ukhuwah artinya persaudaraan. Ada tiga macam ukhuwah.' },
          { speaker: 'mentor', text: 'Ukhuwah islamiyah: persaudaraan sesama muslim. Ukhuwah wathaniyah: persaudaraan satu bangsa. Ukhuwah insaniyah: persaudaraan sesama manusia.' },
          { speaker: 'student', text: 'Apa hikmahnya berteman tanpa membedakan?' },
          { speaker: 'mentor', mood: 'happy', text: 'Menghindari perpecahan, mempererat persaudaraan, dicintai banyak orang, dan menjadikan kita rendah hati.' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Pasangkan ukhuwah dengan artinya!',
            pairs: [
              { left: 'Ukhuwah islamiyah', right: 'Persaudaraan sesama muslim' },
              { left: 'Ukhuwah wathaniyah', right: 'Persaudaraan satu bangsa' },
              { left: 'Ukhuwah insaniyah', right: 'Persaudaraan sesama manusia' },
            ],
            hint: 'Wathan = tanah air, insan = manusia.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Membantu korban bencana di negara lain adalah contoh ukhuwah …',
            options: [{ id: 'a', label: 'Wathaniyah' }, { id: 'b', label: 'Insaniyah' }, { id: 'c', label: 'Islamiyah' }],
            answer: 'b',
            hint: 'Kita menolong karena sama-sama manusia ciptaan Allah.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Hikmah berteman tanpa membeda-bedakan adalah …',
            options: [{ id: 'a', label: 'Menghindari perpecahan' }, { id: 'b', label: 'Menjadi sombong' }, { id: 'c', label: 'Dijauhi teman' }],
            answer: 'a',
            hint: 'Persaudaraan membuat kita rukun.',
          },
        ],
      }],
    },
    {
      id: 'bab9',
      title: 'Ibadah Haji dan Kurban',
      lessons: [{
        id: 'pai-9-haji-kurban',
        title: 'Mengenal Haji & Kurban',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Ibadah haji berarti mengunjungi Kakbah dan melakukan serangkaian ibadah sesuai ketentuannya.' },
          { speaker: 'mentor', text: 'Rukun haji: ihram, wukuf di Arafah, tawaf ifadah, sai, dan tahalul (mencukur rambut).' },
          { speaker: 'student', text: 'Kalau kurban dilaksanakan kapan?' },
          { speaker: 'mentor', mood: 'happy', text: 'Pada hari raya Iduladha dan hari tasyrik. Hewannya kambing, domba, sapi, atau unta, lalu dagingnya dibagikan.' },
        ],
        quiz: [
          {
            type: 'sequence',
            prompt: 'Urutkan rukun haji!',
            steps: ['Ihram', 'Wukuf di Arafah', 'Tawaf ifadah', 'Sai', 'Tahalul'],
            hint: 'Haji dimulai dengan niat dan berpakaian ihram, diakhiri dengan mencukur rambut.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Ibadah kurban dilaksanakan pada hari raya …',
            options: [{ id: 'a', label: 'Idulfitri' }, { id: 'b', label: 'Iduladha' }, { id: 'c', label: 'Maulid Nabi' }],
            answer: 'b',
            hint: 'Hari raya ini juga disebut Hari Raya Kurban.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Hewan yang boleh dijadikan kurban adalah …',
            options: [{ id: 'a', label: 'Ayam' }, { id: 'b', label: 'Kambing' }, { id: 'c', label: 'Kelinci' }],
            answer: 'b',
            hint: 'Hewan kurban: kambing, domba, sapi, atau unta.',
          },
        ],
      }],
    },
    {
      id: 'bab10',
      title: 'Perjuangan Khulafaurrasyidin',
      lessons: [{
        id: 'pai-10-khulafa',
        title: 'Empat Khalifah',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Khulafaurrasyidin artinya para pemimpin yang diberi petunjuk. Mereka memimpin setelah Rasulullah wafat.' },
          { speaker: 'mentor', text: 'Urutannya: Abu Bakar ash-Shiddiq, Umar bin Khattab, Usman bin Affan, lalu Ali bin Abi Thalib.' },
          { speaker: 'student', mood: 'wow', text: 'Apa jasa mereka?' },
          { speaker: 'mentor', mood: 'happy', text: 'Abu Bakar memulai pengumpulan Al-Qur’an, Umar menetapkan kalender Hijriah, dan Usman menyeragamkan mushaf Al-Qur’an.' },
        ],
        quiz: [
          {
            type: 'sequence',
            prompt: 'Urutkan Khulafaurrasyidin!',
            steps: ['Abu Bakar ash-Shiddiq', 'Umar bin Khattab', 'Usman bin Affan', 'Ali bin Abi Thalib'],
            hint: 'Abu Bakar adalah khalifah pertama, Ali yang terakhir.',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkan khalifah dengan jasanya!',
            pairs: [
              { left: 'Abu Bakar ash-Shiddiq', right: 'Memulai pengumpulan Al-Qur’an' },
              { left: 'Umar bin Khattab', right: 'Menetapkan kalender Hijriah' },
              { left: 'Usman bin Affan', right: 'Menyeragamkan mushaf Al-Qur’an' },
            ],
            hint: 'Mushaf yang kita baca sekarang disebut Mushaf Usmani.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Khulafaurrasyidin artinya …',
            options: [{ id: 'a', label: 'Para pemimpin yang diberi petunjuk' }, { id: 'b', label: 'Para pedagang' }, { id: 'c', label: 'Para penulis buku' }],
            answer: 'a',
            hint: 'Khulafa = para pemimpin, rasyidin = yang mendapat petunjuk.',
          },
        ],
      }],
    },
  ],
};
