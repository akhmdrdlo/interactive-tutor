/**
 * Buku Cerita Interaktif: tokoh-tokoh menjelaskan materi sulit lewat obrolan dua arah.
 *
 * Jenis adegan:
 *   { say: 'raka', text, mood? }                     — tokoh berbicara (mochi | student | id teman)
 *   { ask: { prompt, options: [{ label, reply: [adegan say…] }] } }
 *                                                     — anak memilih pertanyaan; tokoh menjawab; boleh tanya lagi
 *   { quiz: {…skema kuis…} }                         — tokoh balik bertanya
 *   { toy: 'pizza', slices, target: [n, d], text }   — mainan kecil di tengah cerita
 */
export const STORIES = [
  {
    id: 'kue-raka',
    subject: 'matematika',
    title: 'Kue Ulang Tahun Kak Raka',
    blurb: 'Belajar pecahan sambil membagi kue.',
    cast: ['raka', 'nisa'],
    reward: 6,
    scenes: [
      { say: 'raka', text: 'Hari ini ulang tahunku! Aku mau membagi kue ini untuk 8 orang, sama besar.' },
      { say: 'nisa', mood: 'wow', text: 'Berarti tiap orang dapat satu potong dari delapan, ya?' },
      { say: 'raka', text: 'Tepat! Satu potong dari delapan ditulis 1/8. Angka atas namanya pembilang, angka bawah penyebut.' },
      { ask: { prompt: 'Mau tanya apa ke Kak Raka?', options: [
        { label: 'Kenapa penyebutnya 8?', reply: [{ say: 'raka', text: 'Karena kuenya dipotong menjadi 8 bagian sama besar. Penyebut = banyak bagian seluruhnya.' }] },
        { label: 'Kalau aku makan 3 potong?', reply: [{ say: 'raka', text: 'Kamu makan 3/8 kue. Pembilangnya 3 karena kamu mengambil 3 bagian.' }] },
        { label: 'Apa 1/2 lebih besar dari 1/8?', reply: [{ say: 'raka', mood: 'happy', text: 'Iya! Makin kecil penyebutnya, makin besar potongannya. Setengah kue jauh lebih besar dari seperdelapan.' }] },
      ] } },
      { toy: 'pizza', slices: 8, target: [3, 8], text: 'Coba warnai bagian kue yang dimakan Nisa: 3/8!' },
      { say: 'nisa', mood: 'happy', text: 'Aku makan 3/8, Kak Raka makan 2/8. Kalau digabung jadi berapa?' },
      { say: 'raka', text: 'Penyebutnya sama, jadi tinggal jumlahkan pembilangnya: 3/8 + 2/8 = 5/8.' },
      { quiz: { type: 'multiple-choice', prompt: 'Kak Raka bertanya: 3/8 + 2/8 = …', options: [{ id: 'a', label: '5/8' }, { id: 'b', label: '5/16' }, { id: 'c', label: '6/8' }], answer: 'a', hint: 'Penyebutnya tetap 8.' } },
      { say: 'raka', text: 'Sekarang ada 1 kue utuh dan setengah kue lagi. Itu ditulis 1 1/2 — pecahan campuran!' },
      { quiz: { type: 'multiple-choice', prompt: '1 1/2 kalau ditulis sebagai pecahan biasa adalah …', options: [{ id: 'a', label: '3/2' }, { id: 'b', label: '2/3' }, { id: 'c', label: '1/2' }], answer: 'a', hint: '1 × 2 + 1 = 3, penyebutnya tetap 2.' } },
      { say: 'nisa', mood: 'happy', text: 'Ternyata pecahan itu enak — seperti kue!' },
    ],
  },
  {
    id: 'tetes-air',
    subject: 'ipas',
    title: 'Petualangan Dinda si Tetes Air',
    blurb: 'Ikut berkeliling dalam siklus air.',
    cast: ['dinda'],
    reward: 6,
    scenes: [
      { say: 'dinda', text: 'Bayangkan aku setetes air di danau. Matahari bersinar terik… badanku terasa ringan!' },
      { say: 'mochi', text: 'Itu evaporasi! Air menguap karena panas matahari.' },
      { ask: { prompt: 'Tanya Dinda:', options: [
        { label: 'Kenapa air bisa menguap?', reply: [{ say: 'dinda', text: 'Panas matahari memberi energi, jadi air berubah dari cair menjadi uap yang naik ke udara.' }] },
        { label: 'Tumbuhan juga mengeluarkan uap?', reply: [{ say: 'dinda', text: 'Iya! Tumbuhan melepas uap air lewat daunnya. Namanya transpirasi.' }] },
      ] } },
      { say: 'dinda', mood: 'wow', text: 'Di atas sana dingin sekali. Aku berkumpul dengan teman-teman uap lain dan jadi awan!' },
      { say: 'mochi', text: 'Uap air yang mendingin dan mengembun jadi awan disebut kondensasi.' },
      { say: 'dinda', text: 'Awannya makin berat… wuuush, aku jatuh sebagai hujan! Itu presipitasi.' },
      { say: 'dinda', mood: 'happy', text: 'Aku meresap ke dalam tanah — infiltrasi — lalu mengalir lagi ke danau. Petualanganku berulang terus!' },
      { quiz: { type: 'sequence', prompt: 'Dinda bertanya: urutkan perjalananku!', steps: ['Evaporasi', 'Kondensasi', 'Presipitasi', 'Infiltrasi'], hint: 'Menguap dulu, jadi awan, turun hujan, lalu meresap.' } },
      { say: 'dinda', text: 'Tapi kalau sungai penuh sampah, aku jadi kotor dan tidak bisa diminum.' },
      { quiz: { type: 'multiple-choice', prompt: 'Apa yang bisa kamu lakukan untuk menjaga air?', options: [{ id: 'a', label: 'Tidak membuang sampah ke sungai' }, { id: 'b', label: 'Membiarkan keran terbuka' }, { id: 'c', label: 'Menebang pohon' }], answer: 'a', hint: 'Air bersih harus dijaga dari pencemaran.' } },
    ],
  },
  {
    id: 'mesin-waktu',
    subject: 'ipas',
    title: 'Mesin Waktu Teh Euis',
    blurb: 'Melompat ke masa lalu Nusantara.',
    cast: ['euis'],
    reward: 6,
    scenes: [
      { say: 'euis', text: 'Wilujeng sumping di mesin waktu! Pegangan, ya — kita mundur ke abad ke-4.' },
      { say: 'euis', text: 'Lihat batu bertulisan ini: Prasasti Yupa dari Kerajaan Kutai, kerajaan Hindu tertua di Indonesia.' },
      { ask: { prompt: 'Tanya Teh Euis:', options: [
        { label: 'Prasasti itu apa?', reply: [{ say: 'euis', text: 'Tulisan dari masa lalu yang dipahat di batu. Dari prasasti kita tahu cerita kerajaan zaman dulu.' }] },
        { label: 'Bagaimana Hindu-Buddha masuk?', reply: [{ say: 'euis', text: 'Lewat para pedagang dan penyebar agama yang singgah di Nusantara.' }] },
      ] } },
      { say: 'euis', mood: 'happy', text: 'Wuuush! Sekarang kita di depan Candi Borobudur, dibangun Mataram Kuno pada masa Dinasti Syailendra.' },
      { say: 'student', mood: 'wow', text: 'Besar sekali! Lalu kapan Islam datang?' },
      { say: 'euis', text: 'Diperkirakan sejak abad ke-7, pada masa Sriwijaya. Pedagang Arab sudah berdatangan.' },
      { say: 'euis', text: 'Tahun 1602 berdiri VOC, perusahaan dagang Belanda. Lama-lama mereka ikut mengendalikan kerajaan, lalu muncul perlawanan.' },
      { say: 'euis', mood: 'happy', text: 'Dan akhirnya… 17 Agustus 1945, Indonesia merdeka! Hatur nuhun ka para pahlawan.' },
      { quiz: { type: 'sequence', prompt: 'Teh Euis bertanya: urutkan perjalanan mesin waktu kita!', steps: ['Prasasti Yupa (Kutai)', 'Candi Borobudur (Mataram Kuno)', 'VOC berdiri (1602)', 'Indonesia merdeka (1945)'], hint: 'Kutai abad ke-4, merdeka 1945.' } },
    ],
  },
  {
    id: 'pilih-sikap',
    subject: 'pancasila',
    title: 'Pilih Sikapmu, Nisa!',
    blurb: 'Bantu Nisa memilih sikap yang sesuai norma.',
    cast: ['nisa'],
    reward: 6,
    scenes: [
      { say: 'nisa', text: 'Hari ini aku banyak menghadapi pilihan. Bantu aku memilih, ya!' },
      { say: 'nisa', text: 'Di kantin, kembalian yang diberikan ibu kantin ternyata kelebihan Rp2.000.' },
      { quiz: { type: 'multiple-choice', prompt: 'Apa yang sebaiknya Nisa lakukan?', options: [{ id: 'a', label: 'Mengembalikan kelebihannya' }, { id: 'b', label: 'Diam saja dan membeli permen' }, { id: 'c', label: 'Memberi tahu teman lalu dibagi' }], answer: 'a', hint: 'Suara hati kita tahu mana yang jujur.', explain: 'Itu norma kesusilaan: berasal dari hati nurani.' } },
      { say: 'nisa', mood: 'happy', text: 'Ibu kantin senang sekali! Lalu saat pulang, ayah memboncengku naik motor.' },
      { ask: { prompt: 'Tanya Nisa:', options: [
        { label: 'Kamu pakai helm?', reply: [{ say: 'nisa', text: 'Pasti! Memakai helm itu aturan lalu lintas — norma hukum, sanksinya tegas.' }] },
        { label: 'Kenapa harus ada aturan?', reply: [{ say: 'mochi', text: 'Supaya hidup bersama tertib, aman, dan adil untuk semua orang.' }] },
      ] } },
      { say: 'nisa', text: 'Sore harinya, warga bermusyawarah memilih ketua kerja bakti. Calon yang kupilih kalah.' },
      { quiz: { type: 'multiple-choice', prompt: 'Sikap Nisa yang tepat adalah …', options: [{ id: 'a', label: 'Menerima dan ikut kerja bakti' }, { id: 'b', label: 'Marah dan tidak mau ikut' }, { id: 'c', label: 'Mengajak teman memprotes' }], answer: 'a', hint: 'Hasil musyawarah adalah keputusan bersama.' } },
      { quiz: { type: 'drag-match', prompt: 'Pasangkan sikap Nisa hari ini dengan normanya!', pairs: [{ left: 'Mengembalikan kembalian', right: 'Kesusilaan' }, { left: 'Memakai helm', right: 'Hukum' }, { left: 'Berdoa sebelum makan', right: 'Agama' }], hint: 'Hukum dibuat negara, kesusilaan dari hati nurani.' } },
      { say: 'nisa', mood: 'happy', text: 'Terima kasih sudah membantuku memilih sikap yang baik!' },
    ],
  },
];
