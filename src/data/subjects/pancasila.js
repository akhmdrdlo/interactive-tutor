/**
 * Pendidikan Pancasila Kelas V (Kemendikbudristek).
 * Sumber: sumber/pancasila/pendidikan-pancasila-buku-siswa-kelas5.pdf — 4 bab.
 */
export default {
  id: 'pancasila',
  source: 'Buku Siswa Pendidikan Pancasila untuk SD/MI Kelas V, Kemendikbudristek',
  chapters: [
    {
      id: 'bab1',
      title: 'Pancasila dalam Kehidupanku',
      lessons: [{
        id: 'pkn-1-sejarah',
        title: 'Sejarah Kelahiran Pancasila',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Tanggal 1 Juni 1945, Sukarno berpidato tentang lima prinsip dasar negara di sidang BPUPK. Tanggal itu menjadi Hari Lahir Pancasila.' },
          { speaker: 'mentor', text: 'Gagasan para pendiri bangsa terus dibahas. Tanggal 22 Juni 1945, Panitia Sembilan menghasilkan naskah Piagam Jakarta.' },
          { speaker: 'student', text: 'Kapan Pancasila resmi jadi dasar negara?' },
          { speaker: 'mentor', mood: 'happy', text: 'Tanggal 18 Agustus 1945 dalam sidang PPKI. Pancasila lahir dari semangat gotong royong para pendiri bangsa!' },
        ],
        quiz: [
          {
            type: 'sequence',
            prompt: 'Urutkan peristiwa lahirnya Pancasila!',
            steps: ['1 Juni 1945 — pidato Sukarno di sidang BPUPK', '22 Juni 1945 — Piagam Jakarta oleh Panitia Sembilan', '18 Agustus 1945 — Pancasila ditetapkan oleh PPKI'],
            hint: 'Perhatikan tanggal dan bulannya: Juni dulu, baru Agustus.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Hari Lahir Pancasila diperingati setiap tanggal …',
            options: [{ id: 'a', label: '17 Agustus' }, { id: 'b', label: '1 Juni' }, { id: 'c', label: '1 Oktober' }],
            answer: 'b',
            hint: 'Tanggal ketika Sukarno menyampaikan pidato tentang lima prinsip dasar negara.',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkan perilaku dengan nilai Pancasila!',
            pairs: [
              { left: 'Berdoa sebelum belajar', right: 'Beriman dan bertakwa' },
              { left: 'Membersihkan kelas bersama', right: 'Gotong royong' },
              { left: 'Berteman dengan semua suku', right: 'Persatuan' },
            ],
            hint: 'Pikirkan untuk siapa atau dengan siapa perilaku itu dilakukan.',
          },
        ],
      }],
    },
    {
      id: 'bab2',
      title: 'Norma dalam Kehidupanku',
      lessons: [
        {
          id: 'pkn-2-norma',
          title: 'Empat Macam Norma',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Di Indonesia ada empat norma: norma agama, norma kesusilaan, norma kesopanan, dan norma hukum.' },
            { speaker: 'mentor', text: 'Norma agama bersumber dari kitab suci. Norma kesusilaan dari hati nurani. Norma kesopanan dari kebiasaan masyarakat.' },
            { speaker: 'student', mood: 'wow', text: 'Norma hukum bersumber dari mana?' },
            { speaker: 'mentor', mood: 'happy', text: 'Dari peraturan perundang-undangan, dan sanksinya tegas. Menaati norma membuat hidup bersama jadi tertib dan nyaman.' },
          ],
          quiz: [
            {
              type: 'drag-match',
              prompt: 'Pasangkan norma dengan sumbernya!',
              pairs: [
                { left: 'Norma agama', right: 'Kitab suci' },
                { left: 'Norma kesusilaan', right: 'Hati nurani' },
                { left: 'Norma kesopanan', right: 'Kebiasaan masyarakat' },
                { left: 'Norma hukum', right: 'Peraturan perundang-undangan' },
              ],
              hint: 'Kesusilaan berhubungan dengan suara hati; hukum dibuat oleh negara.',
            },
            {
              type: 'multiple-choice',
              prompt: 'Berbicara sopan kepada orang yang lebih tua adalah contoh menaati norma …',
              options: [{ id: 'a', label: 'Hukum' }, { id: 'b', label: 'Kesopanan' }, { id: 'c', label: 'Agama' }],
              answer: 'b',
              hint: 'Cara bersikap ini berasal dari kebiasaan dan tata cara hidup masyarakat.',
            },
            {
              type: 'multiple-choice',
              prompt: 'Norma yang memiliki sanksi paling tegas dari negara adalah norma …',
              options: [{ id: 'a', label: 'Hukum' }, { id: 'b', label: 'Kesusilaan' }, { id: 'c', label: 'Kesopanan' }],
              answer: 'a',
              hint: 'Norma ini mengikat seluruh warga negara.',
            },
          ],
        },
        {
          id: 'pkn-2-musyawarah',
          title: 'Hak, Kewajiban & Musyawarah',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Hak adalah kewenangan untuk mendapatkan atau melakukan sesuatu. Kewajiban adalah sesuatu yang harus dilaksanakan.' },
            { speaker: 'student', text: 'Belajar itu hak atau kewajiban?' },
            { speaker: 'mentor', mood: 'happy', text: 'Mendapat pendidikan adalah hakmu, belajar dengan sungguh-sungguh adalah kewajibanmu!' },
            { speaker: 'mentor', text: 'Kalau ada perbedaan pendapat, kita bermusyawarah: cara mendapat keputusan yang adil lewat kesepakatan bersama, seperti memilih ketua RT.' },
          ],
          quiz: [
            {
              type: 'drag-match',
              prompt: 'Hak atau kewajiban?',
              pairs: [
                { left: 'Mendapat pendidikan', right: 'Hak' },
                { left: 'Mengerjakan tugas piket', right: 'Kewajiban' },
                { left: 'Bermain di waktu istirahat', right: 'Hak' },
                { left: 'Menaati tata tertib sekolah', right: 'Kewajiban' },
              ],
              hint: 'Hak = yang boleh kita dapatkan. Kewajiban = yang harus kita kerjakan.',
            },
            {
              type: 'sequence',
              prompt: 'Urutkan langkah musyawarah memilih ketua kelas!',
              steps: ['Mengusulkan calon ketua', 'Setiap calon menyampaikan pendapat', 'Bermusyawarah untuk mufakat', 'Menghormati hasil keputusan'],
              hint: 'Musyawarah selalu diakhiri dengan menerima keputusan bersama.',
            },
            {
              type: 'multiple-choice',
              prompt: 'Temanmu terpilih jadi ketua kelas, padahal kamu memilih orang lain. Sikapmu sebaiknya …',
              options: [{ id: 'a', label: 'Menerima dan mendukung keputusan' }, { id: 'b', label: 'Marah dan tidak mau membantu' }, { id: 'c', label: 'Mengajak teman memprotes' }],
              answer: 'a',
              hint: 'Hasil musyawarah adalah keputusan bersama yang perlu dihormati.',
            },
          ],
        },
        {
          id: 'pkn-2-praktik',
          title: 'Menerapkan Norma',
          reward: 10,
          cards: [
            { speaker: 'mentor', text: 'Norma bukan hanya dihafal, tapi dipraktikkan di rumah, sekolah, dan masyarakat.' },
            { speaker: 'student', text: 'Contohnya bagaimana, Mochi?' },
            { speaker: 'mentor', text: 'Mengembalikan uang kembalian yang berlebih adalah norma kesusilaan. Antre dengan tertib adalah norma kesopanan.' },
            { speaker: 'mentor', mood: 'happy', text: 'Memakai helm saat dibonceng motor adalah norma hukum. Berdoa sebelum makan adalah norma agama.' },
          ],
          quiz: [
            { type: 'drag-match', prompt: 'Pasangkan perilaku dengan normanya!', pairs: [{ left: 'Berdoa sebelum makan', right: 'Norma agama' }, { left: 'Mengembalikan kembalian yang berlebih', right: 'Norma kesusilaan' }, { left: 'Antre dengan tertib', right: 'Norma kesopanan' }, { left: 'Memakai helm saat dibonceng', right: 'Norma hukum' }], hint: 'Hukum berasal dari aturan negara, kesusilaan dari hati nurani.' },
            { type: 'multiple-choice', prompt: 'Kamu melihat teman membuang sampah sembarangan. Sikap yang tepat adalah …', options: [{ id: 'a', label: 'Mengingatkan dengan sopan' }, { id: 'b', label: 'Ikut membuang sampah' }, { id: 'c', label: 'Membentaknya' }], answer: 'a', hint: 'Ingatkan dengan cara yang baik.' },
            { type: 'multiple-choice', prompt: 'Di rumah, kewajibanmu sebagai anak adalah …', options: [{ id: 'a', label: 'Membantu orang tua dan menjaga kerapian' }, { id: 'b', label: 'Bermain sepanjang hari' }, { id: 'c', label: 'Tidur sampai siang' }], answer: 'a', hint: 'Kewajiban adalah hal yang harus dikerjakan.' },
          ],
        },
      ],
    },
    {
      id: 'bab3',
      title: 'Keragaman Budaya Indonesiaku',
      lessons: [{
        id: 'pkn-3-budaya',
        title: 'Budaya Daerah Indonesia',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Setiap provinsi punya budaya khas: rumah tradisional, tarian, alat musik, lagu daerah, dan makanan.' },
          { speaker: 'mentor', text: 'Contohnya alat musik Sasando dari Nusa Tenggara Timur, Sate Madura dari Jawa Timur, dan lagu Rasa Sayange dari Maluku.' },
          { speaker: 'student', mood: 'wow', text: 'Kalau di Jawa Barat, ada angklung!' },
          { speaker: 'mentor', mood: 'happy', text: 'Betul! Keragaman itu kekayaan bangsa. Kita bisa melestarikannya dengan mempelajari, memakai, dan membanggakan budaya daerah.' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Pasangkan budaya dengan daerah asalnya!',
            pairs: [
              { left: 'Alat musik Sasando', right: 'Nusa Tenggara Timur' },
              { left: 'Sate Madura', right: 'Jawa Timur' },
              { left: 'Tari Saronde', right: 'Gorontalo' },
              { left: 'Makanan Seruit', right: 'Lampung' },
            ],
            hint: 'Madura adalah pulau di Jawa Timur. Sasando dimainkan di Pulau Rote, NTT.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Cara melestarikan budaya daerah yang tepat adalah …',
            options: [{ id: 'a', label: 'Belajar tarian atau alat musik daerah' }, { id: 'b', label: 'Mengejek budaya daerah lain' }, { id: 'c', label: 'Melupakan bahasa daerah' }],
            answer: 'a',
            hint: 'Melestarikan artinya menjaga supaya tetap ada.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Teman barumu berasal dari suku yang berbeda. Sikap yang sesuai Pancasila adalah …',
            options: [{ id: 'a', label: 'Menjauhinya' }, { id: 'b', label: 'Berteman dan saling menghargai' }, { id: 'c', label: 'Menertawakan logatnya' }],
            answer: 'b',
            hint: 'Ingat semboyan Bhinneka Tunggal Ika: berbeda-beda tetapi tetap satu.',
          },
        ],
      }],
    },
    {
      id: 'bab4',
      title: 'Aku dan Lingkungan Sekitarku',
      lessons: [{
        id: 'pkn-4-gotong-royong',
        title: 'Gotong Royong di Lingkungan',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Wilayah Indonesia beragam: ada pegunungan, pantai, dataran rendah, dan rawa yang berlumpur serta selalu tergenang air.' },
          { speaker: 'mentor', text: 'Karakteristik wilayah memengaruhi cara warga hidup dan bekerja sama.' },
          { speaker: 'student', text: 'Contoh gotong royong di kampungku apa saja, ya?' },
          { speaker: 'mentor', mood: 'happy', text: 'Kerja bakti membersihkan selokan, membantu tetangga yang terkena musibah, atau menanam pohon bersama. Lakukan dengan tahap persiapan, pelaksanaan, dan evaluasi!' },
        ],
        quiz: [
          {
            type: 'sequence',
            prompt: 'Urutkan tahapan kegiatan gotong royong!',
            steps: ['Persiapan', 'Pelaksanaan', 'Evaluasi'],
            hint: 'Rencanakan dulu, kerjakan, lalu nilai hasilnya.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Wilayah yang berlumpur dan selalu digenangi air disebut …',
            options: [{ id: 'a', label: 'Pegunungan' }, { id: 'b', label: 'Rawa' }, { id: 'c', label: 'Gurun' }],
            answer: 'b',
            hint: 'Tumbuhan bakau dan eceng gondok sering tumbuh di sana.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Manakah yang termasuk gotong royong?',
            options: [{ id: 'a', label: 'Kerja bakti membersihkan selokan' }, { id: 'b', label: 'Bermain gim sendirian' }, { id: 'c', label: 'Membuang sampah ke sungai' }],
            answer: 'a',
            hint: 'Gotong royong dikerjakan bersama-sama untuk kepentingan banyak orang.',
          },
        ],
      }],
    },
  ],
};
