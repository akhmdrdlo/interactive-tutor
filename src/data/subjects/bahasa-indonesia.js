/**
 * Bahasa Indonesia "Bergerak Bersama" Kelas V (Kemendikbud).
 * Sumber: sumber/bahasa-indonesia/bahasa-indonesia-buku-siswa-kelas5.pdf — 8 bab.
 */
export default {
  id: 'bahasa-indonesia',
  source: 'Buku Siswa Bahasa Indonesia "Bergerak Bersama" untuk SD Kelas V, Kemendikbud',
  chapters: [
    {
      id: 'bab1',
      label: 'Bab I',
      title: 'Aku yang Unik',
      lessons: [{
        id: 'bind-1-sinonim',
        title: 'Sinonim, Antonim & Imbuhan pe-',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Rana dan Rani kembar identik, tapi tetap unik! Kata-kata juga punya "kembaran" lho.' },
          { speaker: 'mentor', text: 'Sinonim adalah persamaan makna kata: pintar = pandai. Antonim adalah lawan makna: mahal >< murah, cepat >< lambat.' },
          { speaker: 'student', mood: 'wow', text: 'Kalau "pemalu" itu dari kata apa?' },
          { speaker: 'mentor', mood: 'happy', text: 'Dari "malu" + imbuhan pe-. Imbuhan adalah tambahan pada kata dasar di awal, tengah, atau akhir kata.' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Pasangkan kata dengan sinonimnya!',
            pairs: [
              { left: 'Pintar', right: 'Pandai' },
              { left: 'Gembira', right: 'Senang' },
              { left: 'Indah', right: 'Elok' },
            ],
            hint: 'Sinonim = kata yang maknanya sama atau mirip.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Antonim dari kata "cepat" adalah …',
            options: [{ id: 'a', label: 'Kilat' }, { id: 'b', label: 'Lambat' }, { id: 'c', label: 'Lekas' }],
            answer: 'b',
            hint: 'Antonim = lawan kata.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Kata "pemberani" terbentuk dari imbuhan pe- dan kata dasar …',
            options: [{ id: 'a', label: 'Berani' }, { id: 'b', label: 'Beri' }, { id: 'c', label: 'Rani' }],
            answer: 'a',
            hint: 'Lepaskan awalan "pem-" di depannya.',
          },
        ],
      }],
    },
    {
      id: 'bab2',
      label: 'Bab II',
      title: 'Buku Jendela Dunia',
      lessons: [{
        id: 'bind-2-fiksi',
        title: 'Fiksi, Nonfiksi & Majas',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Buku fiksi berisi hasil imajinasi pengarang. Buku nonfiksi berisi hasil penelitian dan data — seperti "Serba-Serbi Kelinci".' },
          { speaker: 'mentor', text: 'Cerita dibangun oleh unsur intrinsik: tokoh, latar, alur, dan amanat.' },
          { speaker: 'student', text: 'Kalau "si jago merah" itu maksudnya apa?' },
          { speaker: 'mentor', mood: 'happy', text: 'Itu majas, gaya bahasa kiasan. "Si jago merah" artinya api!' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Fiksi atau nonfiksi?',
            pairs: [
              { left: 'Dongeng kancil yang bisa bicara', right: 'Fiksi' },
              { left: 'Buku fakta tentang kelinci', right: 'Nonfiksi' },
              { left: 'Biografi Sultan Hasanuddin', right: 'Nonfiksi' },
            ],
            hint: 'Fiksi = karangan imajinasi. Nonfiksi = berdasarkan kenyataan.',
          },
          {
            type: 'multiple-choice',
            prompt: '"Si jago merah melahap rumah itu." Si jago merah artinya …',
            options: [{ id: 'a', label: 'Ayam jago' }, { id: 'b', label: 'Api' }, { id: 'c', label: 'Pemadam kebakaran' }],
            answer: 'b',
            hint: 'Ini majas — kata kiasan. Apa yang berwarna merah dan bisa "melahap" rumah?',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkan unsur intrinsik dengan artinya!',
            pairs: [
              { left: 'Tokoh', right: 'Pelaku dalam cerita' },
              { left: 'Latar', right: 'Tempat dan waktu cerita' },
              { left: 'Amanat', right: 'Pesan dari cerita' },
            ],
            hint: 'Latar menjawab "di mana" dan "kapan".',
          },
        ],
      }],
    },
    {
      id: 'bab3',
      label: 'Bab III',
      title: 'Ekspresi Diri Melalui Hobi',
      lessons: [{
        id: 'bind-3-prosedur',
        title: 'Teks Prosedur & Imbuhan me-',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Teks prosedur adalah tulisan berisi petunjuk berurutan untuk menghasilkan suatu karya, misalnya cara membuat nasi goreng.' },
          { speaker: 'mentor', text: 'Teks prosedur banyak memakai kata kerja. Imbuhan me- mengubah kata dasar menjadi kata kerja: tulis → menulis.' },
          { speaker: 'student', mood: 'wow', text: 'Kalau "ambilkan" dan "dengarkan"?' },
          { speaker: 'mentor', mood: 'happy', text: 'Itu akhiran -kan. Ada juga akhiran -lah seperti "duduklah". Semuanya membentuk kata kerja!' },
        ],
        quiz: [
          {
            type: 'sequence',
            prompt: 'Susun teks prosedur membuat tempat pensil dari kardus bekas!',
            steps: ['Siapkan kardus bekas, gunting, dan lem', 'Gunting kardus sesuai pola', 'Lem bagian-bagiannya menjadi kotak', 'Hias tempat pensil sesuai selera'],
            hint: 'Alat dan bahan disiapkan dulu, menghias dilakukan paling akhir.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Kata dasar "tulis" diberi imbuhan me- menjadi …',
            options: [{ id: 'a', label: 'Metulis' }, { id: 'b', label: 'Menulis' }, { id: 'c', label: 'Menyulis' }],
            answer: 'b',
            hint: 'Huruf "t" di awal kata luluh saat diberi me-.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Tujuan teks prosedur adalah …',
            options: [{ id: 'a', label: 'Memberi petunjuk langkah-langkah' }, { id: 'b', label: 'Menceritakan dongeng' }, { id: 'c', label: 'Menyampaikan pendapat' }],
            answer: 'a',
            hint: 'Contohnya resep masakan.',
          },
        ],
      }],
    },
    {
      id: 'bab4',
      label: 'Bab IV',
      title: 'Belajar Berwirausaha',
      lessons: [{
        id: 'bind-4-ide-pokok',
        title: 'Ide Pokok & Sikap Wirausaha',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Nadya membangun usaha minuman susu. Ia suka mencari tahu — itu salah satu sikap seorang wirausaha.' },
          { speaker: 'mentor', text: 'Untuk menemukan ide pokok, baca dulu paragrafnya, lalu tentukan inti yang dibahas.' },
          { speaker: 'student', text: 'Apa saja sikap wirausaha yang baik?' },
          { speaker: 'mentor', mood: 'happy', text: 'Bersemangat, jujur, berkomitmen, bekerja sama dalam tim, dan bekerja keras!' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'Langkah pertama menentukan ide pokok paragraf adalah …',
            options: [{ id: 'a', label: 'Membaca paragrafnya terlebih dahulu' }, { id: 'b', label: 'Menebak dari judul buku' }, { id: 'c', label: 'Menghitung jumlah kalimat' }],
            answer: 'a',
            hint: 'Kita perlu tahu isi teksnya dulu.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Sikap manakah yang BUKAN sikap wirausaha yang baik?',
            options: [{ id: 'a', label: 'Jujur' }, { id: 'b', label: 'Mudah menyerah' }, { id: 'c', label: 'Bekerja keras' }],
            answer: 'b',
            hint: 'Nadya menganggap tantangan sebagai jalan menuju sukses.',
          },
          {
            type: 'sequence',
            prompt: 'Urutkan langkah memulai usaha kecil di kelas!',
            steps: ['Cari tahu barang yang dibutuhkan teman', 'Buat rencana dan hitung modal', 'Buat dan jual barangnya', 'Catat hasilnya dan evaluasi'],
            hint: 'Wirausaha perlu tahu keinginan orang lain lebih dulu.',
          },
        ],
      }],
    },
    {
      id: 'bab5',
      label: 'Bab V',
      title: 'Menjadi Warga Dunia',
      lessons: [{
        id: 'bind-5-fakta-opini',
        title: 'Fakta, Opini & Singkatan',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Fakta adalah keadaan atau peristiwa yang benar-benar terjadi. Opini adalah pendapat seseorang.' },
          { speaker: 'student', text: '"Jarak rumahku ke sekolah 5 kilometer" itu fakta, ya?' },
          { speaker: 'mentor', mood: 'happy', text: 'Benar, bisa diukur! Sedangkan "Bahasa Indonesia pelajaran paling menyenangkan" adalah opini.' },
          { speaker: 'mentor', text: 'Singkatan dan akronim adalah kependekan kata yang panjang. Misalnya BDR = Belajar Dari Rumah, dan surel = surat elektronik.' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Fakta atau opini?',
            pairs: [
              { left: 'Jarak rumahku ke sekolah 5 kilometer.', right: 'Fakta' },
              { left: 'Matematika pelajaran paling seru.', right: 'Opini' },
              { left: 'Indonesia merdeka tahun 1945.', right: 'Fakta' },
              { left: 'Rasa nasi goreng ini paling enak.', right: 'Opini' },
            ],
            hint: 'Fakta bisa dibuktikan. Opini tergantung pendapat orang.',
          },
          {
            type: 'multiple-choice',
            prompt: '"Surel" adalah akronim dari …',
            options: [{ id: 'a', label: 'Surat elektronik' }, { id: 'b', label: 'Surat rela' }, { id: 'c', label: 'Suara elektronik' }],
            answer: 'a',
            hint: 'Surel dipakai untuk berkirim surat lewat internet.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Teks yang menjelaskan kejadian alam seperti pelangi atau gerhana disebut teks …',
            options: [{ id: 'a', label: 'Prosedur' }, { id: 'b', label: 'Eksplanasi' }, { id: 'c', label: 'Pengumuman' }],
            answer: 'b',
            hint: 'Kata ini mirip "explain" yang berarti menjelaskan.',
          },
        ],
      }, {
          id: 'bind-5-surel-iklan',
          title: 'Surel & Iklan',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Surel (surat elektronik) dikirim lewat internet. Isinya punya bagian yang teratur.' },
            { speaker: 'mentor', text: 'Bagiannya: alamat surel penerima, subjek, salam pembuka, isi, dan salam penutup.' },
            { speaker: 'student', mood: 'wow', text: 'Kalau iklan, tujuannya apa?' },
            { speaker: 'mentor', mood: 'happy', text: 'Iklan menawarkan barang atau mengajak orang melakukan sesuatu. Bahasanya singkat, jelas, dan menarik.' },
          ],
          quiz: [
            { type: 'sequence', prompt: 'Urutkan bagian surel!', steps: ['Alamat surel penerima', 'Subjek', 'Salam pembuka', 'Isi surel', 'Salam penutup'], hint: 'Penerima dan subjek di atas, salam penutup di paling bawah.' },
            { type: 'multiple-choice', prompt: 'Tujuan utama iklan adalah …', options: [{ id: 'a', label: 'Menawarkan atau mengajak' }, { id: 'b', label: 'Menceritakan dongeng' }, { id: 'c', label: 'Menjelaskan proses alam' }], answer: 'a', hint: 'Iklan ingin pembaca tertarik membeli atau ikut serta.' },
            { type: 'multiple-choice', prompt: 'Kalimat iklan yang baik adalah …', options: [{ id: 'a', label: 'Ayo, minum susu segar setiap pagi!' }, { id: 'b', label: 'Susu itu cair.' }, { id: 'c', label: 'Kemarin saya ke pasar.' }], answer: 'a', hint: 'Iklan memakai kalimat ajakan yang singkat dan menarik.' },
          ],
        }],
    },
    {
      id: 'bab6',
      label: 'Bab VI',
      title: 'Cinta Indonesia',
      lessons: [{
        id: 'bind-6-kalimat-perintah',
        title: 'Kalimat Perintah & Pengumuman',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Di Surabaya ada Monumen Kapal Selam dan Gedung Djoeang \'45 — tempat wisata sejarah yang membuat kita makin cinta Indonesia.' },
          { speaker: 'mentor', text: 'Kalimat perintah berisi ajakan, harapan, atau larangan. Contoh: "Ayo, kunjungi museum!" atau "Jangan menyentuh koleksi!"' },
          { speaker: 'student', mood: 'wow', text: 'Kalau papan "Museum buka Selasa—Minggu"?' },
          { speaker: 'mentor', mood: 'happy', text: 'Itu pengumuman: cara menginformasikan sesuatu kepada khalayak umum.' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'Manakah yang termasuk kalimat perintah?',
            options: [{ id: 'a', label: 'Museum itu sangat luas.' }, { id: 'b', label: 'Jagalah kebersihan museum!' }, { id: 'c', label: 'Kapan museum dibuka?' }],
            answer: 'b',
            hint: 'Kalimat perintah sering diakhiri tanda seru dan berisi ajakan atau larangan.',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkan kalimat perintah dengan jenisnya!',
            pairs: [
              { left: 'Ayo, kita ke museum bersama!', right: 'Ajakan' },
              { left: 'Jangan berlari di dalam museum!', right: 'Larangan' },
              { left: 'Semoga kamu senang berkunjung!', right: 'Harapan' },
            ],
            hint: 'Larangan biasanya memakai kata "jangan".',
          },
          {
            type: 'multiple-choice',
            prompt: 'Pengumuman ditujukan kepada …',
            options: [{ id: 'a', label: 'Satu orang sahabat saja' }, { id: 'b', label: 'Khalayak umum' }, { id: 'c', label: 'Diri sendiri' }],
            answer: 'b',
            hint: 'Pengumuman ditempel atau diumumkan supaya banyak orang tahu.',
          },
        ],
      }],
    },
    {
      id: 'bab7',
      label: 'Bab VII',
      title: 'Sayangi Bumi',
      lessons: [{
        id: 'bind-7-ringkasan',
        title: 'Ringkasan & Kalimat Majemuk',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Mbah Sadiman dari Wonogiri menanam ribuan pohon di bukit gundul. Dialah pahlawan penghijauan!' },
          { speaker: 'mentor', text: 'Ringkasan adalah singkatan cerita — hanya berisi bagian-bagian penting.' },
          { speaker: 'student', text: 'Kalimat majemuk bertingkat itu apa?' },
          { speaker: 'mentor', mood: 'happy', text: 'Gabungan induk kalimat dan anak kalimat. Contoh: "Bukit itu hijau kembali karena Mbah Sadiman menanam pohon."' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'Ringkasan yang baik berisi …',
            options: [{ id: 'a', label: 'Semua kalimat dari cerita' }, { id: 'b', label: 'Bagian-bagian penting cerita' }, { id: 'c', label: 'Pendapat pribadi saja' }],
            answer: 'b',
            hint: 'Ringkasan = cerita yang dipendekkan.',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkan bagian kalimat majemuk bertingkat!',
            pairs: [
              { left: 'Bukit itu hijau kembali', right: 'Induk kalimat' },
              { left: 'karena Mbah Sadiman menanam pohon', right: 'Anak kalimat' },
            ],
            hint: 'Anak kalimat biasanya diawali kata penghubung seperti "karena".',
          },
          {
            type: 'multiple-choice',
            prompt: 'Cara menyayangi bumi yang bisa kamu lakukan adalah …',
            options: [{ id: 'a', label: 'Membuang sampah ke sungai' }, { id: 'b', label: 'Menanam pohon dan hemat air' }, { id: 'c', label: 'Membiarkan lampu menyala terus' }],
            answer: 'b',
            hint: 'Seperti yang dilakukan Mbah Sadiman.',
          },
        ],
      }],
    },
    {
      id: 'bab8',
      label: 'Bab VIII',
      title: 'Bergerak Bersama',
      lessons: [{
        id: 'bind-8-akrostik',
        title: 'Membuat Akrostik',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Akrostik adalah puisi yang huruf awal tiap barisnya membentuk sebuah kata.' },
          { speaker: 'student', mood: 'wow', text: 'Berarti aku bisa membuat akrostik dari namaku sendiri?' },
          { speaker: 'mentor', mood: 'happy', text: 'Bisa! Misalnya kata BUMI: Bersama kita menjaga, Untuk masa depan, Mari menanam pohon, Indahkan alam kita.' },
        ],
        quiz: [
          {
            type: 'sequence',
            prompt: 'Susun baris akrostik untuk kata BUMI!',
            steps: ['Bersama kita menjaga', 'Untuk masa depan', 'Mari menanam pohon', 'Indahkan alam kita'],
            hint: 'Lihat huruf pertama tiap baris: B-U-M-I.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Pada akrostik, huruf awal setiap baris membentuk …',
            options: [{ id: 'a', label: 'Sebuah kata' }, { id: 'b', label: 'Angka' }, { id: 'c', label: 'Gambar' }],
            answer: 'a',
            hint: 'Baca huruf pertama dari atas ke bawah.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Baris akrostik yang cocok untuk huruf "S" pada kata SEHAT adalah …',
            options: [{ id: 'a', label: 'Olahraga setiap pagi' }, { id: 'b', label: 'Sarapan bergizi tiap hari' }, { id: 'c', label: 'Tidur cukup malam ini' }],
            answer: 'b',
            hint: 'Barisnya harus diawali huruf S.',
          },
        ],
      }, {
          id: 'bind-8-pantun',
          title: 'Mengenal Pantun',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Pantun adalah puisi lama asli Indonesia. Setiap bait terdiri atas empat baris.' },
            { speaker: 'mentor', text: 'Baris 1 dan 2 disebut sampiran, baris 3 dan 4 disebut isi. Sampiran dan isi tidak perlu berhubungan.' },
            { speaker: 'student', mood: 'happy', text: 'Pergi ke pasar membeli roti, jangan lupa membeli kopi. Rajin belajar setiap hari, supaya pintar di kemudian hari!' },
            { speaker: 'mentor', mood: 'happy', text: 'Pantunmu bagus! Akhir barisnya sama-sama berbunyi -i, jadi rimanya AAAA. Ada juga pantun berima ABAB.' },
          ],
          quiz: [
            { type: 'multiple-choice', prompt: 'Satu bait pantun terdiri atas … baris.', options: [{ id: 'a', label: 'Empat' }, { id: 'b', label: 'Dua' }, { id: 'c', label: 'Enam' }], answer: 'a', hint: 'Dua baris sampiran + dua baris isi.' },
            { type: 'drag-match', prompt: 'Pasangkan bagian pantun dengan letaknya!', pairs: [{ left: 'Sampiran', right: 'Baris 1 dan 2' }, { left: 'Isi', right: 'Baris 3 dan 4' }], hint: 'Isi membawa pesan, ada di bagian akhir.' },
            { type: 'sequence', prompt: 'Susun pantun ini dengan benar!', steps: ['Pergi ke pasar membeli roti,', 'Jangan lupa membeli kopi.', 'Rajin belajar setiap hari,', 'Supaya pintar di kemudian hari.'], hint: 'Sampiran dulu (pasar, roti, kopi), lalu isi (belajar).' },
          ],
        }],
    },
  ],
};
