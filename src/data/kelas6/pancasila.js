/**
 * Pendidikan Pancasila Kelas VI (Edisi Revisi).
 * Sumber: sumber/kelas6/pancasila/Pendidikan-Pancasila-BS-KLS-VI-Rev.pdf — 7 bab.
 */
import { bab, lesson, pg, jodoh, urut } from './_make.js';

export default {
  id: 'pancasila-6',
  source: 'Buku Siswa Pendidikan Pancasila untuk SD/MI Kelas VI (Edisi Revisi), Kemendikdasmen',
  chapters: [
    bab('bab1', 'Belajar Pancasila dengan Menyenangkan', [
      lesson('pp6-1-nilai', 'Nilai Pancasila Saling Berhubungan', [
        'Nilai-nilai Pancasila adalah kebaikan yang saling berhubungan. Kalau kita taat beribadah, kita juga akan menyayangi sesama manusia.',
        'Contoh pengamalannya: berdoa sebelum belajar (sila 1), menolong teman (sila 2), bermain dengan siapa saja (sila 3), bermusyawarah (sila 4), dan berbagi secara adil (sila 5).',
        'S:Aku bisa bikin program pribadi?',
        '!Bisa! Buat daftar kebiasaan baik untuk setiap sila, lalu tulis surat untuk dirimu sendiri supaya tetap semangat menjalankannya.',
      ], [
        jodoh('Pasangkan sila dengan contoh pengamalannya!', [['Sila ke-1', 'Berdoa sebelum belajar'], ['Sila ke-2', 'Menolong teman yang jatuh'], ['Sila ke-3', 'Bermain dengan teman dari suku mana pun'], ['Sila ke-4', 'Memilih ketua kelas dengan musyawarah'], ['Sila ke-5', 'Membagi tugas piket secara adil']], 'Sila ke-3 tentang persatuan, sila ke-4 tentang musyawarah.'),
        pg('Tidak membeda-bedakan teman adalah pengamalan sila ke …', ['Dua dan tiga', 'Satu saja', 'Lima saja'], 'Kemanusiaan dan persatuan.'),
        pg('Mengapa nilai-nilai Pancasila disebut saling berhubungan?', ['Satu perbuatan baik bisa mencerminkan beberapa sila sekaligus', 'Karena hanya ada satu sila', 'Karena sila-silanya saling bertentangan'], 'Menolong teman dari suku lain mencerminkan lebih dari satu sila.'),
      ]),
    ]),
    bab('bab2', 'Mengamalkan Pancasila untuk Kebahagiaan Bersama', [
      lesson('pp6-2-pemersatu', 'Pancasila Pemersatu Bangsa', [
        'Indonesia terdiri atas ribuan pulau, ratusan suku, dan beragam agama. Pancasila menjadi pandangan hidup yang menyatukan semuanya.',
        'Sebagai siswa, kita mengamalkan Pancasila di rumah, sekolah, dan masyarakat.',
        '?Boleh mengajak teman juga?',
        '!Tentu! Ajak teman dengan kata-kata santun dan contoh nyata, misalnya mengajak kerja bakti membersihkan kelas.',
      ], [
        pg('Pancasila disebut pandangan hidup bangsa artinya …', ['Menjadi pedoman dalam bersikap sehari-hari', 'Hanya dihafalkan saat upacara', 'Hanya untuk orang dewasa'], 'Pandangan hidup = petunjuk cara hidup.'),
        pg('Cara mengajak teman mengamalkan Pancasila yang baik adalah …', ['Memberi contoh dan berbicara dengan santun', 'Memaksa dan memarahi', 'Mengejek teman yang belum melakukannya'], 'Contoh nyata lebih kuat daripada perintah.'),
        jodoh('Pasangkan tempat dengan contoh pengamalan Pancasila!', [['Di rumah', 'Membantu orang tua membersihkan rumah'], ['Di sekolah', 'Menjalankan piket kelas'], ['Di masyarakat', 'Ikut kerja bakti di lingkungan']], 'Setiap tempat punya kesempatan berbuat baik.'),
      ]),
    ]),
    bab('bab3', 'Norma, Hak, dan Kewajiban', [
      lesson('pp6-3-norma', 'Aturan yang Menjaga Kita', [
        'Norma adalah aturan yang mengatur perilaku dalam masyarakat. Ada norma agama, norma kesusilaan, norma kesopanan, dan norma hukum.',
        'Hak adalah sesuatu yang kita terima, misalnya hak mendapat pendidikan. Kewajiban adalah sesuatu yang harus kita lakukan, misalnya belajar dengan sungguh-sungguh.',
        'S:Mana yang didahulukan, hak atau kewajiban?',
        '!Jalankan kewajiban dulu, lalu terima hakmu. Hak dan kewajiban harus seimbang, dan kita juga menghormati hak orang lain.',
      ], [
        jodoh('Pasangkan norma dengan contohnya!', [['Norma agama', 'Beribadah sesuai ajaran agama'], ['Norma kesusilaan', 'Berkata jujur sesuai hati nurani'], ['Norma kesopanan', 'Mengucap permisi saat lewat di depan orang tua'], ['Norma hukum', 'Memakai helm saat naik motor']], 'Norma hukum dibuat negara dan sanksinya tegas.'),
        pg('Contoh kewajiban siswa di sekolah adalah …', ['Menaati tata tertib sekolah', 'Mendapat pelajaran dari guru', 'Bermain di halaman'], 'Kewajiban = sesuatu yang harus dilakukan.'),
        pg('Norma yang sanksinya berupa denda atau penjara adalah norma …', ['Hukum', 'Kesopanan', 'Kesusilaan'], 'Norma ini dibuat oleh negara.'),
      ]),
    ]),
    bab('bab4', 'Belajar Bermusyawarah', [
      lesson('pp6-4-musyawarah', 'Musyawarah untuk Mufakat', [
        'Musyawarah adalah berunding bersama untuk mengambil keputusan. Hasil yang disetujui semua disebut mufakat.',
        'Saat bermusyawarah, sampaikan pendapat dengan sopan, dengarkan pendapat teman, dan hargai perbedaan.',
        '?Kalau tidak ada yang sepakat?',
        '!Kalau mufakat tidak tercapai, bisa dilakukan pemungutan suara (voting). Hasilnya harus diterima dan dijalankan dengan tanggung jawab.',
      ], [
        urut('Urutkan langkah musyawarah di kelas!', ['Pemimpin menyampaikan masalah', 'Peserta menyampaikan pendapat', 'Pendapat dibahas bersama', 'Keputusan diambil dan dijalankan bersama'], 'Musyawarah dimulai dengan mengetahui masalahnya.'),
        pg('Jika musyawarah tidak mencapai mufakat, keputusan dapat diambil dengan …', ['Pemungutan suara (voting)', 'Undian koin', 'Keputusan satu orang saja'], 'Setiap peserta memberikan satu suara.'),
        pg('Sikap yang benar terhadap hasil musyawarah adalah …', ['Menerima dan menjalankannya meski berbeda dengan pendapat kita', 'Menolak karena pendapat kita kalah', 'Membuat keputusan sendiri'], 'Keputusan bersama harus dihormati.'),
      ]),
    ]),
    bab('bab5', 'Menghormati Perbedaan Budaya dan Agama', [
      lesson('pp6-5-beda', 'Indahnya Perbedaan', [
        'Di Indonesia ada banyak agama, seperti Islam, Kristen, Katolik, Hindu, Buddha, dan Konghucu. Ada juga ratusan budaya dan bahasa daerah.',
        'Menghormati perbedaan berarti tidak mengejek, menjaga ketenangan saat orang lain beribadah, dan mau belajar budaya teman.',
        'S:Semboyan kita Bhinneka Tunggal Ika kan?',
        '!Betul! Artinya berbeda-beda tetapi tetap satu jua. Perbedaan membuat kita saling melengkapi.',
      ], [
        pg('Arti semboyan Bhinneka Tunggal Ika adalah …', ['Berbeda-beda tetapi tetap satu jua', 'Bersatu kita teguh', 'Merdeka atau mati'], 'Semboyan ini tertulis di bawah lambang Garuda Pancasila.'),
        pg('Sikap menghormati teman yang sedang beribadah adalah …', ['Tidak membuat keributan di dekatnya', 'Mengajaknya bermain', 'Menyalakan musik keras'], 'Ibadah membutuhkan suasana tenang.'),
        pg('Ketika teman menceritakan budaya daerahnya, sebaiknya kita …', ['Mendengarkan dengan antusias dan menghargainya', 'Menertawakannya', 'Bilang budaya kita paling hebat'], 'Belajar budaya teman membuat kita kaya pengetahuan.'),
      ]),
    ]),
    bab('bab6', 'Provinsiku Bagian dari NKRI', [
      lesson('pp6-6-provinsi', 'Provinsi-Provinsi di Indonesia', [
        'Negara Kesatuan Republik Indonesia (NKRI) terbagi atas 38 provinsi. Setiap provinsi punya ibu kota, budaya, dan kekayaan alam masing-masing.',
        'Provinsi kita, Jawa Barat, beribu kota di Bandung dan dikenal dengan budaya Sunda seperti angklung dan wayang golek.',
        '?Semua provinsi itu sama pentingnya?',
        '!Ya! Setiap provinsi adalah bagian dari NKRI. Kita bangga pada daerah sendiri dan tetap menjaga persatuan dengan provinsi lain.',
      ], [
        jodoh('Pasangkan provinsi dengan ibu kotanya!', [['Jawa Barat', 'Bandung'], ['Jawa Tengah', 'Semarang'], ['Bali', 'Denpasar'], ['Sumatra Utara', 'Medan']], 'Ibu kota Jawa Barat dikenal sebagai Kota Kembang.'),
        pg('Sekarang Indonesia terdiri atas berapa provinsi?', ['38 provinsi', '34 provinsi', '27 provinsi'], 'Jumlahnya bertambah setelah ada provinsi-provinsi baru di Papua.'),
        pg('Alat musik dari bambu yang berasal dari Jawa Barat adalah …', ['Angklung', 'Sasando', 'Tifa'], 'Dimainkan dengan cara digoyangkan.'),
      ]),
    ]),
    bab('bab7', 'Menjaga Persatuan dengan Gotong Royong', [
      lesson('pp6-7-gotong', 'Bersama Lebih Ringan', [
        'Gotong royong adalah bekerja sama untuk kepentingan bersama tanpa mengharapkan imbalan. Pekerjaan berat terasa ringan bila dikerjakan bersama.',
        'Contohnya kerja bakti membersihkan lingkungan, membantu tetangga membangun rumah, dan menghias kelas bersama.',
        'S:Di Sunda ada istilahnya?',
        '!Ada semboyan "sabilulungan" yang artinya bergotong royong. Gotong royong menjaga persatuan dan kesatuan bangsa.',
      ], [
        pg('Ciri gotong royong adalah …', ['Bekerja sama tanpa mengharapkan imbalan', 'Bekerja sendirian', 'Meminta bayaran dari tetangga'], 'Dilakukan bersama-sama dengan ikhlas.'),
        jodoh('Pasangkan kegiatan dengan tempatnya!', [['Kerja bakti membersihkan selokan', 'Lingkungan rumah'], ['Menghias kelas bersama', 'Sekolah'], ['Membereskan rumah bersama keluarga', 'Rumah']], 'Gotong royong bisa dilakukan di mana saja.'),
        pg('Manfaat gotong royong bagi bangsa adalah …', ['Memperkuat persatuan dan kesatuan', 'Membuat orang saling curiga', 'Membuat pekerjaan semakin berat'], 'Bersatu kita teguh!'),
      ]),
    ]),
  ],
};
