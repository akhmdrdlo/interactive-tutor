/**
 * Basa Sunda "Tuturus Catur" Kelas V.
 * Sumber: sumber/basa-sunda/tuturus-catur-kelas5.pdf — 8 tuturus.
 * Dialog ku basa Sunda loma; petunjuk dibéré conto sangkan budak teu buntu.
 */
export default {
  id: 'basa-sunda',
  source: 'Tuturus Catur — Pangajaran Basa Sunda Pikeun SD/MI Kelas V',
  chapters: [
    {
      id: 't1',
      label: 'Tuturus 1',
      title: 'Kaulinan Barudak',
      lessons: [{
        id: 'sunda-1-kaulinan',
        title: 'Kalimah Aktif, Pasif & Pangajak',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Wilujeng sumping! Gugun, Adun, jeung Maman resep ulin kaulinan barudak: congklak, gatrik, ucing sumput, jeung boy-boyan.' },
          { speaker: 'mentor', text: 'Kalimah aktif: jejerna ngalakukeun pagawéan, conto "Adun maénkeun langlayangan." Kalimah pasif: jejerna kakeunaan pagawéan, "Langlayangan dimaénkeun ku Adun."' },
          { speaker: 'student', mood: 'wow', text: 'Ari "Hayu urang ulin congklak!" kalimah naon?' },
          { speaker: 'mentor', mood: 'happy', text: 'Éta kalimah pangajak — eusina ngajak batur migawé babarengan. Tungtungna maké tanda seru (!).' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Pasangkeun kalimah jeung rupana!',
            pairs: [
              { left: 'Maman maénkeun gatrik.', right: 'Kalimah aktif' },
              { left: 'Gatrik dimaénkeun ku Maman.', right: 'Kalimah pasif' },
              { left: 'Hayu urang ulin boy-boyan!', right: 'Kalimah pangajak' },
            ],
            hint: 'Kecap pagawéan nu make di- biasana kalimah pasif. "Hayu" ngajak batur.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Ciri kalimah pangajak dina tungtung kalimah maké tanda …',
            options: [{ id: 'a', label: 'Titik (.)' }, { id: 'b', label: 'Seru (!)' }, { id: 'c', label: 'Pananya (?)' }],
            answer: 'b',
            hint: 'Conto: "Hayu urang ulin!"',
          },
          {
            type: 'multiple-choice',
            prompt: 'Nu kaasup kaulinan barudak Sunda nya éta …',
            options: [{ id: 'a', label: 'Congklak' }, { id: 'b', label: 'Catur internasional' }, { id: 'c', label: 'Bola basket' }],
            answer: 'a',
            hint: 'Kaulinan budak lembur nu dimaénkeun dina papan nu aya liangan.',
          },
        ],
      }],
    },
    {
      id: 't2',
      label: 'Tuturus 2',
      title: 'Kajadian dina Kahirupan',
      lessons: [{
        id: 'sunda-2-pangalaman',
        title: 'Pangalaman & Kalimah Wawaran',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Pangalaman nya éta sagala hal nu kalakonan atawa kasaksian ku urang.' },
          { speaker: 'mentor', text: 'Pangalaman biasa kajadian unggal poé, conto indit ka sakola. Pangalaman luar biasa mah ngan sakali-kali, malah bisa sakali saumur hirup.' },
          { speaker: 'student', text: 'Ari kalimah wawaran téh naon?' },
          { speaker: 'mentor', mood: 'happy', text: 'Kalimah nu eusina méré béja atawa informasi, tungtungna maké tanda titik. Conto: "Kuring indit ka sakola isuk-isuk."' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Pangalaman biasa atawa luar biasa?',
            pairs: [
              { left: 'Sarapan saméméh sakola', right: 'Pangalaman biasa' },
              { left: 'Meunang juara lomba tingkat nasional', right: 'Pangalaman luar biasa' },
              { left: 'Mandi unggal isuk', right: 'Pangalaman biasa' },
            ],
            hint: 'Pangalaman biasa mah rutin, kajadian unggal poé.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Kalimah wawaran fungsina pikeun …',
            options: [{ id: 'a', label: 'Méré béja atawa informasi' }, { id: 'b', label: 'Nitah batur' }, { id: 'c', label: 'Nanya' }],
            answer: 'a',
            hint: 'Wawaran = béja.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Nu kaasup kecap barang nya éta …',
            options: [{ id: 'a', label: 'Lumpat' }, { id: 'b', label: 'Buku' }, { id: 'c', label: 'Geulis' }],
            answer: 'b',
            hint: 'Kecap barang nuduhkeun ngaran barang. Lumpat mah pagawéan, geulis mah sipat.',
          },
        ],
      }],
    },
    {
      id: 't3',
      label: 'Tuturus 3',
      title: 'Hirup Rukun Sauyunan',
      lessons: [{
        id: 'sunda-3-pupuh',
        title: 'Mikawanoh Pupuh Magatru',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Pupuh téh karangan anu kauger ku guru wilangan jeung guru lagu. Salah sahijina nya éta pupuh Magatru.' },
          { speaker: 'student', mood: 'wow', text: 'Naon guru wilangan jeung guru lagu téh?' },
          { speaker: 'mentor', mood: 'happy', text: 'Guru wilangan: jumlah engang dina unggal padalisan. Guru lagu: sora vokal di tungtung padalisan.' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Pasangkeun istilah jeung hartina!',
            pairs: [
              { left: 'Guru wilangan', right: 'Jumlah engang unggal padalisan' },
              { left: 'Guru lagu', right: 'Sora vokal di tungtung padalisan' },
              { left: 'Padalisan', right: 'Baris dina pupuh' },
            ],
            hint: 'Wilangan = itungan/jumlah.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Pupuh Magatru kaasup kana karangan …',
            options: [{ id: 'a', label: 'Wangun ugeran (puisi)' }, { id: 'b', label: 'Wawancara' }, { id: 'c', label: 'Warta koran' }],
            answer: 'a',
            hint: 'Pupuh kauger ku aturan engang jeung sora tungtung.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Hirup rukun sauyunan hartina …',
            options: [{ id: 'a', label: 'Hirup akur jeung silih bantu' }, { id: 'b', label: 'Hirup sorangan waé' }, { id: 'c', label: 'Sok paséa' }],
            answer: 'a',
            hint: 'Rukun = akur.',
          },
        ],
      }],
    },
    {
      id: 't4',
      label: 'Tuturus 4',
      title: 'Pentingna Ngajaga Kasehatan',
      lessons: [{
        id: 'sunda-4-sinonim',
        title: 'Kecap Saharti & Kecap Sabalikna',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Sangkan séhat, urang kudu rajin olahraga, dahar nu bergizi, jeung saré cukup.' },
          { speaker: 'mentor', text: 'Kecap saharti (sinonim) nya éta kecap nu hartina sarua atawa méh sarua. Conto: sayémbara = pasanggiri.' },
          { speaker: 'student', text: 'Ari kecap sabalikna?' },
          { speaker: 'mentor', mood: 'happy', text: 'Kecap nu hartina lalawanan (antonim). Conto: gedé >< leutik, beurat >< hampang.' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Pasangkeun kecap jeung lawanna!',
            pairs: [
              { left: 'Gedé', right: 'Leutik' },
              { left: 'Beurat', right: 'Hampang' },
              { left: 'Panas', right: 'Tiis' },
            ],
            hint: 'Kecap sabalikna = lawan kecap.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Kecap saharti tina "sayémbara" nya éta …',
            options: [{ id: 'a', label: 'Pasanggiri' }, { id: 'b', label: 'Sasarengan' }, { id: 'c', label: 'Sapopoé' }],
            answer: 'a',
            hint: 'Duanana hartina lomba.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Cara ngajaga kasehatan nu bener nya éta …',
            options: [{ id: 'a', label: 'Saré cukup jeung dahar nu bergizi' }, { id: 'b', label: 'Jajan sambarangan unggal poé' }, { id: 'c', label: 'Begadang nepi ka peuting' }],
            answer: 'a',
            hint: 'Awak séhat butuh istirahat jeung kadaharan nu alus.',
          },
        ],
      }],
    },
    {
      id: 't5',
      label: 'Tuturus 5',
      title: 'Reueus Jadi Bangsa Indonesia',
      lessons: [{
        id: 'sunda-5-kawih',
        title: 'Kawih Manuk Dadali & Kalimah Kaayaan',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Kawih "Manuk Dadali" nyaritakeun manuk panggagahna, perlambang sakti Indonésia jaya.' },
          { speaker: 'student', mood: 'wow', text: 'Manuk Dadali téh manuk naon?' },
          { speaker: 'mentor', mood: 'happy', text: 'Manuk garuda! Dina kawih éta, manuk Dadali resep ngahiji rukun sakabéhna — kawas bangsa Indonésia.' },
          { speaker: 'mentor', text: 'Kalimah kaayaan nya éta kalimah nu caritaanana kecap sipat. Conto: "Dewi geulis." "Adi bageur."' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'Manuk Dadali dina kawih téh ngalambangkeun …',
            options: [{ id: 'a', label: 'Garuda, perlambang Indonésia' }, { id: 'b', label: 'Manuk piaraan' }, { id: 'c', label: 'Manuk peuting' }],
            answer: 'a',
            hint: 'Lambang nagara urang nya éta manuk garuda.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Mana nu kaasup kalimah kaayaan?',
            options: [{ id: 'a', label: 'Kamarna beresih.' }, { id: 'b', label: 'Kuring nyapu kamar.' }, { id: 'c', label: 'Hayu nyapu!' }],
            answer: 'a',
            hint: 'Caritaanana kecap sipat (beresih).',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkeun kecap sipat jeung hartina!',
            pairs: [
              { left: 'Bageur', right: 'Baik hati' },
              { left: 'Pinter', right: 'Pintar' },
              { left: 'Geulis', right: 'Cantik' },
            ],
            hint: 'Ieu kecap-kecap sipat nu sok dipaké dina kalimah kaayaan.',
          },
        ],
      }],
    },
    {
      id: 't6',
      label: 'Tuturus 6',
      title: 'Ngajaga Kalestarian Lingkungan',
      lessons: [{
        id: 'sunda-6-sajak',
        title: 'Mikawanoh Sajak',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Sajak nya éta karangan puisi anu bébas, teu kauger ku guru wilangan jeung guru lagu siga pupuh.' },
          { speaker: 'student', text: 'Sajak bisa ngeunaan lingkungan?' },
          { speaker: 'mentor', mood: 'happy', text: 'Bisa pisan! Loba sajak nu ngajak urang ngamumulé leuweung, walungan, jeung hulu cai (mata air).' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'Béda sajak jeung pupuh nya éta …',
            options: [{ id: 'a', label: 'Sajak leuwih bébas, teu kauger guru wilangan' }, { id: 'b', label: 'Sajak kudu 17 padalisan' }, { id: 'c', label: 'Sajak teu meunang aya judulna' }],
            answer: 'a',
            hint: 'Pupuh mah kauger ku aturan.',
          },
          {
            type: 'multiple-choice',
            prompt: '"Hulu cai" dina basa Indonésia hartina …',
            options: [{ id: 'a', label: 'Mata air' }, { id: 'b', label: 'Air terjun' }, { id: 'c', label: 'Danau' }],
            answer: 'a',
            hint: 'Tempat mimiti cai kaluar, nu engkéna jadi walungan.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Cara ngajaga kalestarian lingkungan nya éta …',
            options: [{ id: 'a', label: 'Miceun runtah ka walungan' }, { id: 'b', label: 'Melak tatangkalan' }, { id: 'c', label: 'Nuaran leuweung' }],
            answer: 'b',
            hint: 'Lestari = tetep aya jeung kajaga.',
          },
        ],
      }],
    },
    {
      id: 't7',
      label: 'Tuturus 7',
      title: 'Kadaharan Séhat anu Ngandung Gizi',
      lessons: [{
        id: 'sunda-7-kantetan',
        title: 'Kecap Kantétan & Kalimah Panyeluk',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Angeun kacang beureum téh kadaharan tradisional anu ngandung gizi.' },
          { speaker: 'mentor', text: 'Kecap kantétan nya éta dua kecap nu ngahiji jadi hiji harti anyar, conto: sapu nyéré, méja makan.' },
          { speaker: 'student', mood: 'happy', text: 'Duh, ngeunah pisan ieu angeun!' },
          { speaker: 'mentor', mood: 'happy', text: 'Éta kalimah panyeluk — kalimah seru nu ngébréhkeun rasa haté, tungtungna maké tanda seru.' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'Mana nu kaasup kalimah panyeluk?',
            options: [{ id: 'a', label: 'Wah, alus pisan bajuna!' }, { id: 'b', label: 'Ema keur masak.' }, { id: 'c', label: 'Rék ka mana?' }],
            answer: 'a',
            hint: 'Kalimah panyeluk ngébréhkeun rasa reuwas, bungah, atawa kagum.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Nu kaasup kecap kantétan nya éta …',
            options: [{ id: 'a', label: 'Sapu nyéré' }, { id: 'b', label: 'Lumpat' }, { id: 'c', label: 'Beureum' }],
            answer: 'a',
            hint: 'Dua kecap nu ngahiji jadi hiji harti.',
          },
          {
            type: 'drag-match',
            prompt: 'Pasangkeun kadaharan jeung kandunganana!',
            pairs: [
              { left: 'Sangu', right: 'Karbohidrat' },
              { left: 'Endog', right: 'Protéin' },
              { left: 'Sayuran', right: 'Vitamin' },
            ],
            hint: 'Sangu = nasi, endog = telur.',
          },
        ],
      }],
    },
    {
      id: 't8',
      label: 'Tuturus 8',
      title: 'Kajadian Bencana Alam',
      lessons: [{
        id: 'sunda-8-carpon',
        title: 'Carpon & Kalimah Langsung',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Carpon téh carita pondok — carita rékaan nu pondok, biasana ngan ngébréhkeun hiji kajadian.' },
          { speaker: 'mentor', text: 'Dina carpon aya kajadian caah déngdéng (banjir bandang) kiriman ti tonggoh.' },
          { speaker: 'student', text: 'Ari kalimah langsung téh kumaha?' },
          { speaker: 'mentor', mood: 'happy', text: 'Kalimah nu nyutat omongan batur maké tanda petik: Ceuk Ema, "Hayu urang ngungsi!" Kalimah teu langsung: Ema ngajak ngungsi.' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Langsung atawa teu langsung?',
            pairs: [
              { left: 'Ceuk Bapa, "Ati-ati di jalan!"', right: 'Kalimah langsung' },
              { left: 'Bapa ngingetan kuring sangkan ati-ati.', right: 'Kalimah teu langsung' },
            ],
            hint: 'Kalimah langsung maké tanda petik (" ").',
          },
          {
            type: 'multiple-choice',
            prompt: '"Caah" dina basa Indonésia hartina …',
            options: [{ id: 'a', label: 'Banjir' }, { id: 'b', label: 'Gempa' }, { id: 'c', label: 'Angin' }],
            answer: 'a',
            hint: 'Caah biasana kajadian dina usum hujan.',
          },
          {
            type: 'sequence',
            prompt: 'Susun naon nu kudu dipigawé lamun aya caah!',
            steps: ['Tong panik', 'Mareuman listrik di imah', 'Ngungsi ka tempat nu luhur', 'Ngadéngékeun béja ti petugas'],
            hint: 'Tenang heula, amankeun imah, tuluy ngungsi.',
          },
        ],
      }],
    },
  ],
};
