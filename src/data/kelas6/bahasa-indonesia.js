/**
 * Bahasa Indonesia Kelas VI: Anak-Anak yang Mengubah Dunia (Edisi Revisi).
 * Sumber: sumber/kelas6/bahasa-indonesia/Indonesia_BS_KLS_VI_Rev.pdf — 4 bab beserta bagian "Bahas Bahasa".
 */
import { bab, lesson, pg, jodoh, urut } from './_make.js';

export default {
  id: 'bahasa-indonesia-6',
  source: 'Buku Siswa Bahasa Indonesia: Anak-Anak yang Mengubah Dunia untuk SD/MI Kelas VI (Edisi Revisi)',
  chapters: [
    bab('bab1', 'Anak-Anak yang Mengubah Dunia', [
      lesson('bi6-1-eksplanasi', 'Teks Eksplanasi', [
        'Ada anak-anak yang peduli lingkungan: menanam pohon, menghemat air, sampai mendaur ulang sampah plastik. Kisah mereka bisa ditulis sebagai teks eksplanasi.',
        'Teks eksplanasi menjelaskan bagaimana atau mengapa sesuatu terjadi, misalnya mengapa perubahan iklim merusak lahan pertanian.',
        'S:Kata apa yang sering dipakai?',
        '!Kata penghubung sebab-akibat seperti karena, sebab, sehingga, akibatnya. Juga kata penghubung urutan seperti pertama, kemudian, lalu, akhirnya.',
      ], [
        jodoh('Kelompokkan kata penghubungnya!', [['karena', 'Sebab-akibat'], ['sehingga', 'Sebab-akibat'], ['kemudian', 'Urutan waktu'], ['akhirnya', 'Urutan waktu']], 'Kata sebab-akibat menjelaskan alasan; kata urutan menunjukkan langkah.'),
        pg('Lengkapi: "Sampah menyumbat selokan, … banjir terjadi saat hujan deras."', ['sehingga', 'meskipun', 'atau'], 'Kalimat ini berisi sebab lalu akibat.'),
        pg('Teks eksplanasi bertujuan untuk …', ['Menjelaskan proses atau sebab terjadinya sesuatu', 'Menghibur dengan cerita lucu', 'Mengajak membeli produk'], 'Biasanya menjawab pertanyaan "mengapa" dan "bagaimana".'),
      ]),
      lesson('bi6-1-konsonan', 'Kata dengan Konsonan Rangkap', [
        'Konsonan rangkap adalah dua atau tiga huruf konsonan yang berurutan dalam satu kata, dan setiap hurufnya tetap dibaca jelas.',
        'Contohnya kata "proyek", "kompleks", "struktur", dan "transportasi".',
        '?Berarti "ng" dan "ny" juga?',
        '!Bukan. "ng" dan "ny" adalah gabungan huruf yang dibaca satu bunyi. Pada konsonan rangkap, tiap huruf masih terdengar, seperti "pr" pada "praktik".',
      ], [
        pg('Kata yang memiliki konsonan rangkap adalah …', ['Struktur', 'Nyanyian', 'Bunga'], 'Cari tiga huruf konsonan berurutan yang dibaca jelas.'),
        pg('Pada kata "kompleks", konsonan rangkapnya adalah …', ['pl', 'om', 'ek'], 'Dua huruf konsonan yang berdampingan.'),
        pg('Kata "nyamuk" diawali gabungan huruf yang dibaca …', ['Satu bunyi', 'Dua bunyi terpisah', 'Tanpa bunyi'], '"ny" bukan konsonan rangkap.'),
      ]),
    ]),
    bab('bab2', 'Nusantara Berjuta Cerita', [
      lesson('bi6-2-cerita', 'Unsur-Unsur Cerita', [
        'Cerita bisa berupa legenda, cerita rakyat, sejarah, pengalaman pribadi, atau hasil imajinasi. Bisa disampaikan lisan maupun tertulis.',
        'Setiap cerita punya tokoh, latar (tempat dan waktu), alur (jalan cerita), dan amanat (pesan).',
        'S:Kalau cerita misteri drumben tengah malam?',
        '!Itu cerita fiksi yang seru! Tokohnya mencari tahu misteri. Alurnya biasanya dimulai dari pengenalan, masalah, puncak, lalu penyelesaian.',
      ], [
        jodoh('Pasangkan unsur cerita dengan artinya!', [['Tokoh', 'Pelaku dalam cerita'], ['Latar', 'Tempat dan waktu kejadian'], ['Alur', 'Jalan cerita'], ['Amanat', 'Pesan dari cerita']], 'Amanat adalah pelajaran yang bisa kita ambil.'),
        urut('Urutkan bagian alur cerita!', ['Pengenalan tokoh', 'Muncul masalah', 'Puncak masalah', 'Penyelesaian'], 'Cerita dimulai dengan berkenalan dan diakhiri dengan masalah yang selesai.'),
        pg('"Pada suatu malam di halaman sekolah …" adalah contoh unsur …', ['Latar', 'Amanat', 'Tokoh'], 'Kalimat itu menunjukkan waktu dan tempat.'),
      ]),
    ]),
    bab('bab3', 'Temukan Minat, Tunjukkan Bakat', [
      lesson('bi6-3-wawancara', 'Wawancara dan Kalimat Langsung', [
        'Wawancara adalah tanya jawab untuk mendapatkan informasi. Orang yang menjawab pertanyaan disebut narasumber.',
        'Pertanyaan yang baik memakai kata tanya apa, siapa, kapan, di mana, mengapa, dan bagaimana.',
        '?Bagaimana menuliskan ucapan narasumber?',
        '!Kalimat langsung menirukan ucapan dengan tanda petik: Afrilla berkata, "Saya berlatih setiap hari." Kalimat tidak langsung: Afrilla berkata bahwa ia berlatih setiap hari.',
      ], [
        pg('Orang yang memberi jawaban dalam wawancara disebut …', ['Narasumber', 'Pewawancara', 'Penonton'], 'Ia adalah sumber informasi.'),
        pg('Manakah kalimat langsung?', ['Lili berkata, "Aku ingin menjadi perawat."', 'Lili berkata bahwa ia ingin menjadi perawat.', 'Lili ingin menjadi perawat.'], 'Kalimat langsung memakai tanda petik.'),
        pg('Paragraf yang baik memiliki kepaduan, artinya …', ['Kalimat-kalimatnya saling berhubungan', 'Setiap kalimat membahas hal berbeda', 'Hanya terdiri atas satu kata'], 'Semua kalimat mendukung satu gagasan utama.'),
      ]),
    ]),
    bab('bab4', 'Dari Hobi Menjadi Profesi', [
      lesson('bi6-4-laporan', 'Laporan Hasil Observasi', [
        'Teks laporan hasil observasi berisi informasi dari pengamatan langsung, misalnya mengamati cara membuat kue atau kegiatan klub musik.',
        'Dalam laporan, bedakan fakta dan opini. Fakta bisa dibuktikan, sedangkan opini adalah pendapat seseorang.',
        'S:Huruf kapital juga harus benar ya?',
        '!Ya! Huruf kapital dipakai di awal kalimat, nama orang, nama tempat, dan nama hari. Kata keterangan membantu menjelaskan waktu, tempat, dan cara.',
      ], [
        jodoh('Tentukan fakta atau opini!', [['Rizky Ridho bermain untuk tim nasional', 'Fakta'], ['Sepak bola olahraga paling seru', 'Opini'], ['Kue itu dipanggang selama 30 menit', 'Fakta'], ['Musik pop paling enak didengar', 'Opini']], 'Fakta bisa dibuktikan. Kata seperti "paling seru" biasanya pendapat.'),
        pg('Penulisan huruf kapital yang benar adalah …', ['Kami berlatih di Bandung setiap Minggu.', 'kami berlatih di bandung setiap minggu.', 'Kami Berlatih Di Bandung Setiap minggu.'], 'Awal kalimat, nama kota, dan nama hari diawali huruf kapital.'),
        pg('"Ia mengaduk adonan dengan perlahan." Kata keterangan cara pada kalimat itu adalah …', ['Dengan perlahan', 'Ia', 'Adonan'], 'Kata yang menjelaskan bagaimana sesuatu dilakukan.'),
      ]),
    ]),
  ],
};
