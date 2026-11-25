/**
 * Matematika Kelas VI (Kurikulum Merdeka).
 * Sumber: sumber/kelas6/matematika/Matematika_BS_KLS_VI.pdf — Bab 1 Pecahan dan Desimal, Bab 2 Rasio,
 * Bab 3 Kubus dan Balok, Bab 4 Peluang.
 */
import { bab, lesson, pg, jodoh, urut } from './_make.js';

export default {
  id: 'matematika-6',
  source: 'Buku Siswa Matematika untuk SD/MI Kelas VI, Kemendikbudristek',
  chapters: [
    bab('bab1', 'Pecahan dan Desimal', [
      lesson('mat6-1-kali', 'Perkalian Pecahan', [
        'Ibu memasak 3 loyang kue. Tiap loyang memakai 2/5 kg tepung. Berapa tepung semuanya? Kita hitung 3 × 2/5.',
        'Kalikan bilangan asli dengan pembilangnya, penyebutnya tetap: 3 × 2/5 = 6/5 = 1 1/5 kg.',
        '?Kalau pecahan dikali pecahan?',
        '!Kalikan pembilang dengan pembilang, penyebut dengan penyebut. Contohnya 1/2 × 3/4 = 3/8.',
      ], [
        pg('Berapa hasil 4 × 2/9?', ['8/9', '6/9', '8/36'], 'Kalikan 4 dengan pembilangnya saja. Penyebutnya tetap.'),
        pg('Berapa hasil 2/3 × 3/5?', ['6/15 atau 2/5', '5/8', '6/8'], 'Pembilang × pembilang, penyebut × penyebut.'),
        pg('Setiap hari Raka minum 3/4 liter susu. Berapa liter susu yang ia minum selama 4 hari?', ['3 liter', '12 liter', '7/4 liter'], '4 × 3/4 = 12/4. Sederhanakan!'),
      ]),
      lesson('mat6-1-bagi', 'Pembagian Pecahan', [
        'Membagi pecahan dengan bilangan asli sama seperti membagi bagian kue untuk beberapa teman: 3/4 : 3 = 3/4 × 1/3 = 1/4.',
        'Kunci pembagian pecahan: ubah tanda bagi menjadi kali, lalu balik pecahan pembaginya.',
        'S:Kalau 2 : 1/3 jadinya berapa?',
        '!2 : 1/3 = 2 × 3/1 = 6. Artinya, dalam 2 buah kue ada 6 potong yang masing-masing besarnya 1/3.',
      ], [
        pg('Berapa hasil 4/5 : 2?', ['2/5', '8/5', '4/7'], 'Ubah menjadi 4/5 × 1/2.'),
        pg('Berapa hasil 3 : 1/4?', ['12', '3/4', '1/12'], 'Balik 1/4 menjadi 4/1, lalu kalikan.'),
        urut('Urutkan langkah menghitung 2/3 : 4/5!', ['Ubah tanda bagi menjadi kali', 'Balik pecahan pembagi menjadi 5/4', 'Kalikan: 2/3 × 5/4 = 10/12', 'Sederhanakan menjadi 5/6'], 'Ingat kunci: ubah, balik, kalikan, sederhanakan.'),
      ]),
      lesson('mat6-1-desimal', 'Bilangan Desimal', [
        'Pecahan bisa diubah menjadi desimal. Caranya, ubah penyebutnya menjadi 10, 100, atau 1.000.',
        'Contohnya 3/4 = 75/100 = 0,75 dan 1/2 = 5/10 = 0,5.',
        '?Bagaimana membandingkan 0,6 dan 0,45?',
        '!Bandingkan angka di belakang koma dari kiri. 0,6 sama dengan 0,60. Karena 60 lebih dari 45, maka 0,6 lebih besar!',
      ], [
        jodoh('Pasangkan pecahan dengan bentuk desimalnya!', [['1/2', '0,5'], ['3/4', '0,75'], ['1/4', '0,25'], ['2/5', '0,4']], 'Ubah penyebutnya menjadi 10 atau 100.'),
        urut('Urutkan dari yang terkecil!', ['0,25', '0,4', '0,52', '0,7'], 'Samakan banyak angka di belakang koma: 0,25; 0,40; 0,52; 0,70.'),
        pg('Bentuk desimal dari 7/10 adalah …', ['0,7', '7,10', '0,07'], 'Persepuluhan berarti satu angka di belakang koma.'),
      ]),
    ]),
    bab('bab2', 'Rasio', [
      lesson('mat6-2-rasio', 'Mengenal Rasio', [
        'Rasio adalah perbandingan dua besaran. Kalau di kelas ada 12 siswa laki-laki dan 15 siswa perempuan, rasionya 12 : 15.',
        'Rasio bisa disederhanakan seperti pecahan. 12 : 15 sama dengan 4 : 5 karena keduanya dibagi 3.',
        'S:Rasio satuan itu apa?',
        '!Rasio satuan membandingkan dengan 1 satuan. Kalau 3 buku harganya Rp15.000, maka 1 buku harganya Rp5.000.',
      ], [
        pg('Di kebun ada 8 pohon mangga dan 12 pohon jeruk. Rasio paling sederhana mangga : jeruk adalah …', ['2 : 3', '8 : 20', '3 : 2'], 'Bagi kedua bilangan dengan 4.'),
        pg('Harga 4 pensil Rp10.000. Berapa harga 1 pensil?', ['Rp2.500', 'Rp4.000', 'Rp40.000'], 'Rasio satuan: bagi harga dengan banyak pensil.'),
        jodoh('Pasangkan rasio yang senilai!', [['1 : 2', '3 : 6'], ['2 : 5', '4 : 10'], ['3 : 4', '9 : 12'], ['5 : 1', '10 : 2']], 'Rasio senilai didapat dengan mengalikan kedua bilangan dengan angka yang sama.'),
      ]),
      lesson('mat6-2-terap', 'Rasio dalam Kehidupan', [
        'Rasio bagian terhadap bagian membandingkan dua kelompok, misalnya 3 kelereng merah : 5 kelereng biru.',
        'Rasio bagian terhadap keseluruhan membandingkan satu kelompok dengan semuanya: kelereng merah 3 dari 8, atau 3 : 8.',
        '?Rasio bisa untuk waktu juga?',
        '!Bisa! Kalau 2 menit bisa membaca 1 halaman, maka 10 menit bisa membaca 5 halaman. Rasionya tetap 2 : 1.',
      ], [
        pg('Ada 4 kucing dan 6 kelinci. Rasio kucing terhadap seluruh hewan adalah …', ['4 : 10', '4 : 6', '6 : 10'], 'Seluruh hewan = 4 + 6.'),
        pg('Membuat 1 gelas es teh butuh 2 sendok gula. Berapa sendok gula untuk 5 gelas?', ['10 sendok', '7 sendok', '3 sendok'], 'Rasio gelas : gula = 1 : 2.'),
        pg('Sinta berjalan 3 km dalam 1 jam. Berapa km dalam 3 jam?', ['9 km', '6 km', '1 km'], 'Kalikan kedua bagian rasio dengan 3.'),
      ]),
    ]),
    bab('bab3', 'Kubus dan Balok', [
      lesson('mat6-3-bangun', 'Membangun dan Mengurai Kubus', [
        'Kubus punya 6 sisi berbentuk persegi yang sama besar, 12 rusuk, dan 8 titik sudut. Contohnya dadu.',
        'Balok juga punya 6 sisi, 12 rusuk, dan 8 titik sudut, tetapi sisinya berbentuk persegi panjang. Contohnya kotak susu.',
        'S:Jaring-jaring itu apa?',
        '!Jaring-jaring adalah bangun ruang yang dibuka lalu dibentangkan datar. Kubus punya 11 jenis jaring-jaring yang berbeda!',
      ], [
        jodoh('Lengkapi ciri kubus!', [['Banyak sisi', '6'], ['Banyak rusuk', '12'], ['Banyak titik sudut', '8'], ['Bentuk sisi', 'Persegi']], 'Bayangkan sebuah dadu.'),
        pg('Benda yang berbentuk balok adalah …', ['Kotak susu', 'Bola', 'Kaleng'], 'Sisinya berbentuk persegi panjang.'),
        pg('Jaring-jaring kubus terdiri atas berapa persegi?', ['6', '4', '8'], 'Sama dengan banyak sisi kubus.'),
      ]),
      lesson('mat6-3-lokasi', 'Melihat dari Berbagai Arah dan Lokasi', [
        'Bangunan dari kubus kecil terlihat berbeda jika dilihat dari depan, samping, dan atas. Inilah visualisasi spasial.',
        'Untuk menunjukkan lokasi, kita bisa memakai denah berpetak dengan huruf dan angka, misalnya petak C4.',
        '?Seperti di peta harta karun!',
        '!Tepat! Huruf menunjukkan kolom, angka menunjukkan baris. Dengan begitu tempat bisa ditemukan dengan tepat.',
      ], [
        pg('Sebuah susunan kubus kecil dilihat dari atas. Pandangan ini disebut tampak …', ['Atas', 'Depan', 'Samping'], 'Seperti burung yang melihat dari langit.'),
        pg('Pada denah berpetak, petak B3 berada di …', ['Kolom B, baris 3', 'Kolom 3, baris B', 'Baris B, kolom B'], 'Huruf untuk kolom, angka untuk baris.'),
        pg('Sebuah balok tersusun dari 3 lapis. Tiap lapis berisi 4 kubus kecil. Berapa kubus kecil semuanya?', ['12', '7', '16'], '3 lapis × 4 kubus.'),
      ]),
    ]),
    bab('bab4', 'Peluang', [
      lesson('mat6-4-peluang', 'Mustahil, Mungkin, atau Pasti?', [
        'Peluang adalah kemungkinan sesuatu terjadi. Skala peluang dimulai dari 0 (mustahil) sampai 1 (pasti).',
        'Mendapat angka 7 saat melempar satu dadu biasa itu mustahil. Matahari terbit besok itu pasti. Hujan hari ini? Mungkin!',
        'S:Kalau melempar koin?',
        '!Koin punya 2 sisi, jadi peluang muncul gambar adalah 1 dari 2, atau 1/2. Peluangnya sama besar dengan muncul angka.',
      ], [
        jodoh('Pasangkan kejadian dengan peluangnya!', [['Dadu menunjukkan angka 7', 'Mustahil'], ['Koin menunjukkan gambar', 'Sama besar (1/2)'], ['Dadu menunjukkan angka 1–6', 'Pasti'], ['Besok turun hujan', 'Mungkin']], 'Dadu biasa hanya punya angka 1 sampai 6.'),
        pg('Dalam kantong ada 3 bola merah dan 1 bola biru. Warna yang lebih mungkin terambil adalah …', ['Merah', 'Biru', 'Sama besar'], 'Bandingkan banyak bolanya.'),
        pg('Peluang muncul angka genap pada satu dadu adalah …', ['3 dari 6', '1 dari 6', '6 dari 6'], 'Angka genap pada dadu: 2, 4, 6.'),
      ]),
    ]),
  ],
};
