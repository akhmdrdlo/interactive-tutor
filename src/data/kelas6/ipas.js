/**
 * IPAS Kelas VI (Edisi Revisi, Pusat Perbukuan 2025).
 * Sumber: sumber/kelas6/ipas/IPAS_BS_KLS_VI_Rev_.pdf — 6 bab, diringkas per subbab.
 */
import { bab, lesson, pg, jodoh, urut } from './_make.js';

export default {
  id: 'ipas-6',
  source: 'Buku Siswa IPAS untuk SD/MI Kelas VI (Edisi Revisi), Pusat Perbukuan 2025',
  chapters: [
    bab('bab1', 'Makanan Bergizi untuk Kesehatan Pencernaanmu', [
      lesson('ipas6-1-cerna', 'Perjalanan Makanan di Tubuh', [
        'Tubuh kita tidak bisa langsung memakai makanan. Makanan harus diolah dulu supaya zat gizinya bisa diserap. Itulah tugas sistem pencernaan!',
        'Makanan dikunyah di mulut dan dibasahi air liur. Lalu lewat kerongkongan menuju lambung, tempat makanan diaduk bersama getah lambung.',
        '?Terus zat gizinya diserap di mana, Mochi?',
        '!Di usus halus! Sisanya masuk ke usus besar, airnya diserap, lalu ampasnya dibuang lewat anus.',
      ], [
        urut('Urutkan perjalanan makanan di saluran pencernaan!', ['Mulut', 'Kerongkongan', 'Lambung', 'Usus halus', 'Usus besar', 'Anus'], 'Makanan masuk dari mulut dan keluar sebagai ampas di ujung terakhir.'),
        pg('Di organ manakah sari-sari makanan paling banyak diserap?', ['Usus halus', 'Kerongkongan', 'Usus besar'], 'Organ ini panjang dan berkelok, letaknya sesudah lambung.', 'Dinding usus halus punya jonjot-jonjot yang menyerap sari makanan ke darah.'),
        pg('Mengapa kita perlu mengunyah makanan sampai halus?', ['Supaya makanan lebih mudah dicerna', 'Supaya makanan cepat dingin', 'Supaya perut cepat lapar lagi'], 'Ingat percobaan meremas makanan dalam kantong plastik berisi air hangat.'),
      ]),
      lesson('ipas6-1-gizi', 'Piring Bergizi Seimbang', [
        'Gizi dalam makanan memberi energi dan bahan untuk tumbuh. Seperti motor yang butuh bahan bakar yang tepat, tubuh juga butuh makanan yang sesuai.',
        'Menu seimbang berisi makanan pokok (karbohidrat), lauk-pauk (protein), sayur-mayur, dan buah-buahan. Satu jenis makanan saja tidak cukup!',
        'S:Kalau makanan cepat saji boleh nggak?',
        'Junk food tinggi gula, garam, dan lemak. Sesekali boleh, tapi kalau terlalu sering bisa membuat pencernaan dan tubuh tidak sehat.',
      ], [
        jodoh('Pasangkan zat gizi dengan contoh makanannya!', [['Karbohidrat', 'Nasi dan singkong'], ['Protein', 'Telur dan tempe'], ['Vitamin', 'Jeruk dan bayam'], ['Lemak', 'Alpukat dan kacang']], 'Karbohidrat dari makanan pokok, protein dari lauk-pauk.'),
        pg('Junk food disebut kurang sehat bila sering dimakan karena …', ['Tinggi gula, garam, dan lemak', 'Banyak serat dan vitamin', 'Rasanya selalu pahit'], 'Pikirkan rasa gurih dan manis yang berlebihan.'),
        pg('Kebiasaan yang menjaga pencernaan tetap sehat adalah …', ['Makan sayur, buah, dan minum air putih cukup', 'Sering menahan buang air besar', 'Makan sambil berlari'], 'Serat dari sayur dan buah membantu usus bekerja lancar.'),
      ]),
    ]),
    bab('bab2', 'Tarik dan Embuskan', [
      lesson('ipas6-2-napas', 'Perjalanan Udara di Tubuhmu', [
        'Saat menarik napas, udara masuk lewat hidung. Rambut halus dan lendir di hidung menyaring debu.',
        'Udara lalu melewati tenggorokan, batang tenggorok (trakea), cabang tenggorok (bronkus), lalu sampai di paru-paru.',
        '?Di paru-paru ngapain udaranya?',
        '!Di gelembung kecil bernama alveolus, oksigen masuk ke darah dan karbon dioksida keluar. Itu disebut pertukaran gas!',
      ], [
        urut('Urutkan jalan udara saat kita menarik napas!', ['Hidung', 'Tenggorokan', 'Trakea', 'Bronkus', 'Alveolus di paru-paru'], 'Mulai dari lubang tempat udara masuk, berakhir di gelembung kecil paru-paru.'),
        pg('Pertukaran oksigen dan karbon dioksida terjadi di …', ['Alveolus', 'Hidung', 'Trakea'], 'Gelembung-gelembung kecil di dalam paru-paru.'),
        pg('Rambut halus di hidung berguna untuk …', ['Menyaring debu dari udara', 'Menghangatkan makanan', 'Mencium bau saja'], 'Bayangkan saringan di pintu masuk udara.'),
      ]),
      lesson('ipas6-2-udara', 'Udara Bersih, Paru-Paru Sehat', [
        'Asap kendaraan dan pabrik mengandung polutan, misalnya karbon monoksida. Udara yang kotor bisa membuat batuk, sesak napas, dan sakit paru-paru.',
        'Kapasitas paru-paru adalah kemampuan paru-paru menampung udara. Olahraga teratur seperti berenang, bersepeda, dan joging bisa memperbesarnya.',
        'S:Berarti merokok merusak paru-paru ya?',
        '!Betul. Asap rokok berbahaya bagi perokok dan orang di sekitarnya. Menanam pohon dan memakai masker saat udara kotor juga melindungi pernapasan.',
      ], [
        jodoh('Pasangkan kebiasaan dengan dampaknya bagi pernapasan!', [['Rutin bersepeda', 'Kapasitas paru-paru bertambah'], ['Menghirup asap rokok', 'Paru-paru bisa rusak'], ['Membakar sampah', 'Udara jadi tercemar'], ['Menanam pohon', 'Udara lebih segar']], 'Ada kebiasaan yang membantu dan ada yang merugikan.'),
        pg('Gas berbahaya dari asap kendaraan bermotor adalah …', ['Karbon monoksida', 'Oksigen', 'Uap air'], 'Gas ini tidak berwarna dan tidak berbau, tapi beracun.'),
        pg('Apa arti kapasitas paru-paru?', ['Kemampuan paru-paru menampung udara', 'Jumlah gigi di mulut', 'Kecepatan makanan dicerna'], 'Bayangkan paru-paru seperti balon yang ditiup.'),
      ]),
    ]),
    bab('bab3', 'Jejak Sang Pahlawan', [
      lesson('ipas6-3-pahlawan', 'Pahlawan dari Berbagai Daerah', [
        'Dulu, bangsa asing seperti Belanda datang dan menjajah Nusantara. Rakyat di banyak daerah melawan untuk mempertahankan tanah airnya.',
        'Pangeran Diponegoro memimpin Perang Jawa, Cut Nyak Dien berjuang di Aceh, Pattimura di Maluku, dan Sultan Hasanuddin di Makassar.',
        '?Dari Jawa Barat ada pahlawan juga?',
        '!Ada! Dewi Sartika mendirikan sekolah untuk perempuan di Bandung. Perjuangan tidak selalu dengan senjata, bisa juga lewat pendidikan.',
      ], [
        jodoh('Pasangkan pahlawan dengan daerah perjuangannya!', [['Cut Nyak Dien', 'Aceh'], ['Pattimura', 'Maluku'], ['Sultan Hasanuddin', 'Makassar'], ['Dewi Sartika', 'Bandung, Jawa Barat']], 'Hasanuddin dijuluki Ayam Jantan dari Timur.'),
        pg('Dewi Sartika berjuang memajukan bangsa melalui …', ['Pendidikan untuk perempuan', 'Perang di laut', 'Perdagangan rempah'], 'Ia mendirikan sekolah.'),
        pg('Sikap yang bisa kita teladani dari para pahlawan adalah …', ['Rela berkorban dan cinta tanah air', 'Mudah menyerah', 'Mementingkan diri sendiri'], 'Pahlawan berjuang untuk orang banyak.'),
      ]),
    ]),
    bab('bab4', 'Kearifan Lokal untuk Persatuan Bangsa', [
      lesson('ipas6-4-kearifan', 'Warisan Leluhur yang Bijak', [
        'Kearifan lokal adalah cara hidup bijak warisan leluhur yang membantu masyarakat hidup rukun dan menjaga alam.',
        'Contohnya subak, sistem pengairan sawah di Bali. Sasi di Maluku melarang mengambil hasil laut atau hutan pada waktu tertentu supaya tidak habis.',
        'S:Di Sunda ada juga kan?',
        '!Ada leuit, lumbung padi masyarakat Baduy untuk cadangan pangan, dan Seren Taun, upacara syukur panen. Keberagaman ini membuat Indonesia kaya dan bersatu.',
      ], [
        jodoh('Pasangkan kearifan lokal dengan asal daerahnya!', [['Subak', 'Bali'], ['Sasi', 'Maluku'], ['Leuit', 'Baduy, Banten'], ['Seren Taun', 'Masyarakat Sunda']], 'Subak berhubungan dengan sawah berundak di Pulau Dewata.'),
        pg('Tujuan tradisi sasi adalah …', ['Menjaga hasil alam supaya tidak habis', 'Menghias rumah adat', 'Mengadakan lomba lari'], 'Ada waktu ketika hasil laut tidak boleh diambil.'),
        pg('Menghargai kearifan lokal daerah lain dapat memperkuat …', ['Persatuan bangsa', 'Permusuhan antardaerah', 'Rasa malas belajar'], 'Bhinneka Tunggal Ika: berbeda-beda tetapi tetap satu.'),
      ]),
    ]),
    bab('bab5', 'Energi untuk Masa Depan', [
      lesson('ipas6-5-energi', 'Energi Fosil dan Energi Terbarukan', [
        'Minyak bumi, batu bara, dan gas alam berasal dari sisa makhluk hidup yang terkubur jutaan tahun. Inilah energi fosil, dan jumlahnya bisa habis.',
        'Energi terbarukan tidak akan habis: cahaya matahari, angin, air, panas bumi, dan biomassa.',
        '?Energinya bisa jadi listrik?',
        '!Bisa! Ada PLTS dari matahari, PLTA dari air, PLTB dari angin, dan PLTP dari panas bumi. Energi bersih membuat udara tetap bersih.',
      ], [
        jodoh('Pasangkan pembangkit listrik dengan sumber energinya!', [['PLTS', 'Cahaya matahari'], ['PLTA', 'Aliran air'], ['PLTB', 'Tiupan angin'], ['PLTP', 'Panas bumi']], 'Huruf terakhirnya adalah petunjuk: Surya, Air, Bayu, Panas bumi.'),
        pg('Manakah yang termasuk energi tak terbarukan?', ['Batu bara', 'Cahaya matahari', 'Angin'], 'Energi ini terbentuk jutaan tahun dan bisa habis.'),
        pg('Cara menghemat energi di rumah adalah …', ['Mematikan lampu yang tidak dipakai', 'Menyalakan TV tanpa ditonton', 'Membuka kulkas lama-lama'], 'Listrik yang terbuang sia-sia tetap menghabiskan energi.'),
      ]),
    ]),
    bab('bab6', 'Mengembara di Jagat Raya', [
      lesson('ipas6-6-rotasi', 'Matahari, Bumi, dan Bulan', [
        'Bumi berputar pada porosnya. Gerakan ini disebut rotasi dan butuh waktu sekitar 24 jam, sehingga terjadi siang dan malam.',
        'Bumi juga mengelilingi Matahari. Gerakan ini disebut revolusi dan butuh sekitar 365 hari, yaitu satu tahun.',
        '?Kalau gerhana gimana terjadinya?',
        '!Gerhana matahari terjadi saat Bulan berada di antara Matahari dan Bumi. Gerhana bulan terjadi saat Bumi berada di antara Matahari dan Bulan.',
      ], [
        jodoh('Pasangkan peristiwa dengan penyebabnya!', [['Siang dan malam', 'Rotasi Bumi'], ['Pergantian tahun', 'Revolusi Bumi'], ['Gerhana matahari', 'Bulan di antara Matahari dan Bumi'], ['Gerhana bulan', 'Bumi di antara Matahari dan Bulan']], 'Rotasi = berputar pada poros, revolusi = mengelilingi Matahari.'),
        pg('Berapa lama Bumi berotasi satu kali?', ['Sekitar 24 jam', 'Sekitar 7 hari', 'Sekitar 1 tahun'], 'Sama dengan satu hari satu malam.'),
        pg('Matahari terlihat terbit dari arah timur karena …', ['Bumi berotasi dari barat ke timur', 'Matahari berjalan mengelilingi Bumi', 'Bulan menutupi Matahari'], 'Sebenarnya Bumi-lah yang berputar.'),
      ]),
      lesson('ipas6-6-tatasurya', 'Tata Surya dan Teknologi Antariksa', [
        'Tata surya terdiri atas Matahari sebagai pusat, delapan planet, satelit, asteroid, dan komet.',
        'Urutan planet dari yang terdekat dengan Matahari: Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, dan Neptunus.',
        'S:Bulan itu planet bukan?',
        '!Bulan adalah satelit alami Bumi. Manusia juga membuat satelit buatan untuk cuaca, komunikasi, dan peta, serta teleskop untuk mengamati bintang.',
      ], [
        urut('Urutkan planet dari yang paling dekat dengan Matahari!', ['Merkurius', 'Venus', 'Bumi', 'Mars', 'Jupiter'], 'Bumi adalah planet ketiga.'),
        pg('Planet terbesar di tata surya adalah …', ['Jupiter', 'Merkurius', 'Mars'], 'Planet ini berada tepat sesudah Mars.'),
        pg('Bulan disebut satelit alami karena …', ['Mengelilingi Bumi dan tidak dibuat manusia', 'Memancarkan cahaya sendiri', 'Lebih besar dari Matahari'], 'Satelit buatan dibuat manusia, satelit alami terbentuk sendiri.'),
      ]),
    ]),
  ],
};
