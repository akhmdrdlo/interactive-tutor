/**
 * Bahasa Inggris "My Next Words" Grade 5 (Kemendikbudristek).
 * Sumber: sumber/bahasa-inggris/my-next-words-buku-guru-kelas5.pdf (buku siswa hasil scan tanpa teks).
 * Dialog memakai bahasa Inggris dasar; petunjuk (hint) dwibahasa agar anak tidak buntu.
 */
export default {
  id: 'bahasa-inggris',
  source: 'My Next Words Grade 5 — Teacher\'s Book & Student\'s Book, Kemendikbudristek',
  chapters: [
    {
      id: 'unit1',
      label: 'Unit 1',
      title: 'What delicious bakso!',
      lessons: [{
        id: 'eng-1-taste',
        title: 'Tastes of Food',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Hello! Today we learn about tastes: sweet, sour, salty, and bitter.' },
          { speaker: 'mentor', text: 'Honey is sweet. Limes are sour. Salty fish is salty. Coffee is bitter.' },
          { speaker: 'student', mood: 'wow', text: 'How does ice cream taste?' },
          { speaker: 'mentor', mood: 'happy', text: 'Ice cream tastes sweet! And bakso tastes delicious. What delicious bakso!' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Match the food with its taste!',
            pairs: [
              { left: 'Honey', right: 'Sweet' },
              { left: 'Lime', right: 'Sour' },
              { left: 'Salty fish', right: 'Salty' },
              { left: 'Coffee', right: 'Bitter' },
            ],
            hint: 'Sweet = manis, sour = asam, salty = asin, bitter = pahit.',
          },
          {
            type: 'multiple-choice',
            prompt: 'How do mangoes (unripe) taste?',
            options: [{ id: 'a', label: 'Sour' }, { id: 'b', label: 'Salty' }, { id: 'c', label: 'Bitter' }],
            answer: 'a',
            hint: 'Mangga muda rasanya asam.',
          },
          {
            type: 'multiple-choice',
            prompt: '"Ice cream tastes ___."',
            options: [{ id: 'a', label: 'bitter' }, { id: 'b', label: 'sweet' }, { id: 'c', label: 'salty' }],
            answer: 'b',
            hint: 'Es krim rasanya manis.',
          },
        ],
      }],
    },
    {
      id: 'unit2',
      label: 'Unit 2',
      title: 'I want an ice cream cone',
      lessons: [{
        id: 'eng-2-units',
        title: 'A Glass of, A Bowl of',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'We use special words to count food and drinks.' },
          { speaker: 'mentor', text: 'A glass of water. A bowl of soup. A plate of rice. A slice of cake. A bottle of milk.' },
          { speaker: 'student', text: 'I want a cone of ice cream, please!' },
          { speaker: 'mentor', mood: 'happy', text: 'Great! You can say: "I want an ice cream cone."' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Match the words!',
            pairs: [
              { left: 'A glass of', right: 'water' },
              { left: 'A bowl of', right: 'soup' },
              { left: 'A slice of', right: 'cake' },
              { left: 'A plate of', right: 'rice' },
            ],
            hint: 'Glass = gelas, bowl = mangkuk, slice = potong, plate = piring.',
          },
          {
            type: 'multiple-choice',
            prompt: '"I want a ___ of milk." (susu dalam botol)',
            options: [{ id: 'a', label: 'bottle' }, { id: 'b', label: 'slice' }, { id: 'c', label: 'plate' }],
            answer: 'a',
            hint: 'Botol = bottle.',
          },
          {
            type: 'sequence',
            prompt: 'Arrange the sentence!',
            steps: ['I', 'want', 'a bowl of', 'noodles'],
            hint: 'Mulai dengan "I", lalu kata kerja "want".',
          },
        ],
      }],
    },
    {
      id: 'unit3',
      label: 'Unit 3',
      title: 'How much is it?',
      lessons: [{
        id: 'eng-3-price',
        title: 'Hundreds & Thousands',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'At the canteen, we ask: "How much is it?"' },
          { speaker: 'mentor', text: 'Rp5.000 is five thousand rupiahs. Rp500 is five hundred rupiahs.' },
          { speaker: 'student', mood: 'wow', text: 'How much is the bakso?' },
          { speaker: 'mentor', mood: 'happy', text: 'It is fifteen thousand rupiahs — Rp15.000!' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Match the price!',
            pairs: [
              { left: 'Rp500', right: 'five hundred' },
              { left: 'Rp5.000', right: 'five thousand' },
              { left: 'Rp15.000', right: 'fifteen thousand' },
              { left: 'Rp50.000', right: 'fifty thousand' },
            ],
            hint: 'Hundred = ratus, thousand = ribu. Fifteen = 15, fifty = 50.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Which question asks about price?',
            options: [{ id: 'a', label: 'How much is it?' }, { id: 'b', label: 'How are you?' }, { id: 'c', label: 'What is it?' }],
            answer: 'a',
            hint: '"How much" = berapa (harga).',
          },
          {
            type: 'multiple-choice',
            prompt: '"Two thousand rupiahs" = …',
            options: [{ id: 'a', label: 'Rp200' }, { id: 'b', label: 'Rp2.000' }, { id: 'c', label: 'Rp20.000' }],
            answer: 'b',
            hint: 'Thousand = ribu.',
          },
        ],
      }],
    },
    {
      id: 'unit4',
      label: 'Unit 4',
      title: 'I\'ve got a stomachache',
      lessons: [{
        id: 'eng-4-sick',
        title: 'What\'s Wrong with You?',
        reward: 10,
        cards: [
          { speaker: 'student', text: 'Ouch! My tummy hurts.' },
          { speaker: 'mentor', text: 'What\'s wrong with you?' },
          { speaker: 'student', text: 'I\'ve got a stomachache.' },
          { speaker: 'mentor', mood: 'happy', text: 'Oh no! Other words: headache (sakit kepala), toothache (sakit gigi), cough (batuk). Get well soon!' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Match the sickness!',
            pairs: [
              { left: 'Stomachache', right: 'Sakit perut' },
              { left: 'Headache', right: 'Sakit kepala' },
              { left: 'Toothache', right: 'Sakit gigi' },
              { left: 'Cough', right: 'Batuk' },
            ],
            hint: 'Stomach = perut, head = kepala, tooth = gigi.',
          },
          {
            type: 'multiple-choice',
            prompt: '"What\'s wrong with you?" "I\'ve got a ___." (sakit gigi)',
            options: [{ id: 'a', label: 'headache' }, { id: 'b', label: 'toothache' }, { id: 'c', label: 'stomachache' }],
            answer: 'b',
            hint: 'Tooth = gigi.',
          },
          {
            type: 'multiple-choice',
            prompt: 'What do you say to a sick friend?',
            options: [{ id: 'a', label: 'Get well soon!' }, { id: 'b', label: 'Good night!' }, { id: 'c', label: 'Happy birthday!' }],
            answer: 'a',
            hint: 'Artinya "semoga cepat sembuh".',
          },
        ],
      }],
    },
    {
      id: 'unit5',
      label: 'Unit 5',
      title: 'What a nice skirt!',
      lessons: [{
        id: 'eng-5-clothes',
        title: 'Clothes',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Let\'s learn clothes: skirt, T-shirt, dress, trousers, hat, and shoes.' },
          { speaker: 'mentor', text: 'What is she wearing? She is wearing a pink skirt.' },
          { speaker: 'student', mood: 'happy', text: 'What a nice skirt!' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Match the clothes!',
            pairs: [
              { left: 'Skirt', right: 'Rok' },
              { left: 'T-shirt', right: 'Kaus' },
              { left: 'Hat', right: 'Topi' },
              { left: 'Shoes', right: 'Sepatu' },
            ],
            hint: 'Kamu bisa ganti rok dan kaus di lemari kamarmu!',
          },
          {
            type: 'multiple-choice',
            prompt: '"What is she ___?" "She is wearing a dress."',
            options: [{ id: 'a', label: 'eating' }, { id: 'b', label: 'wearing' }, { id: 'c', label: 'drinking' }],
            answer: 'b',
            hint: 'Wear = memakai.',
          },
          {
            type: 'sequence',
            prompt: 'Arrange the sentence!',
            steps: ['She', 'is wearing', 'a yellow', 'T-shirt'],
            hint: 'Subjek dulu, lalu "is wearing", lalu warna, lalu bajunya.',
          },
        ],
      }],
    },
    {
      id: 'unit6',
      label: 'Unit 6',
      title: 'Parts of our body that work together',
      lessons: [{
        id: 'eng-6-body',
        title: 'I Use My …',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'Our body parts work together. We use our eyes to see and our ears to hear.' },
          { speaker: 'mentor', text: 'We use our nose to smell, our hands to hold, and our legs to walk.' },
          { speaker: 'student', mood: 'wow', text: 'How does the elephant eat the grass?' },
          { speaker: 'mentor', mood: 'happy', text: 'He uses his trunk to eat the grass!' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Match the body part with its use!',
            pairs: [
              { left: 'Eyes', right: 'to see' },
              { left: 'Ears', right: 'to hear' },
              { left: 'Nose', right: 'to smell' },
              { left: 'Legs', right: 'to walk' },
            ],
            hint: 'See = melihat, hear = mendengar, smell = mencium, walk = berjalan.',
          },
          {
            type: 'multiple-choice',
            prompt: '"Made uses his ___ to kick the ball."',
            options: [{ id: 'a', label: 'leg' }, { id: 'b', label: 'ear' }, { id: 'c', label: 'nose' }],
            answer: 'a',
            hint: 'Menendang bola memakai kaki.',
          },
          {
            type: 'multiple-choice',
            prompt: 'The elephant uses his ___ to eat the grass.',
            options: [{ id: 'a', label: 'tail' }, { id: 'b', label: 'trunk' }, { id: 'c', label: 'ear' }],
            answer: 'b',
            hint: 'Trunk = belalai.',
          },
        ],
      }],
    },
    {
      id: 'unit7',
      label: 'Unit 7',
      title: 'How tall are you?',
      lessons: [{
        id: 'eng-7-describe',
        title: 'Describing Things',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'We describe people, animals, and things: tall, short, big, small, long.' },
          { speaker: 'student', text: 'How tall are you, Mochi?' },
          { speaker: 'mentor', mood: 'happy', text: 'I am short — only 25 centimeters! The giraffe is tall. Its neck is long.' },
        ],
        quiz: [
          {
            type: 'drag-match',
            prompt: 'Match the opposites!',
            pairs: [
              { left: 'Tall', right: 'Short' },
              { left: 'Big', right: 'Small' },
              { left: 'Long', right: 'Short' },
            ],
            hint: 'Opposite = lawan kata. Tall >< short, long >< short.',
          },
          {
            type: 'multiple-choice',
            prompt: 'The giraffe has a ___ neck.',
            options: [{ id: 'a', label: 'short' }, { id: 'b', label: 'long' }, { id: 'c', label: 'small' }],
            answer: 'b',
            hint: 'Leher jerapah panjang.',
          },
          {
            type: 'multiple-choice',
            prompt: 'An ant is ___.',
            options: [{ id: 'a', label: 'big' }, { id: 'b', label: 'tall' }, { id: 'c', label: 'small' }],
            answer: 'c',
            hint: 'Semut itu kecil.',
          },
        ],
      }],
    },
    {
      id: 'unit8',
      label: 'Unit 8',
      title: 'The giraffe is taller than the deer',
      lessons: [{
        id: 'eng-8-comparative',
        title: 'Taller Than, Bigger Than',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'To compare two things, add -er and "than": tall → taller than.' },
          { speaker: 'mentor', text: 'The giraffe is taller than the deer. The elephant is bigger than the cat.' },
          { speaker: 'student', mood: 'wow', text: 'The mouse is smaller than the cat!' },
          { speaker: 'mentor', mood: 'happy', text: 'Perfect! Big becomes bigger — remember the double "g".' },
        ],
        quiz: [
          {
            type: 'multiple-choice',
            prompt: 'The giraffe is ___ than the deer.',
            options: [{ id: 'a', label: 'tall' }, { id: 'b', label: 'taller' }, { id: 'c', label: 'tallest' }],
            answer: 'b',
            hint: 'Membandingkan dua hal → tambahkan -er.',
          },
          {
            type: 'drag-match',
            prompt: 'Match the words!',
            pairs: [
              { left: 'tall', right: 'taller' },
              { left: 'big', right: 'bigger' },
              { left: 'small', right: 'smaller' },
            ],
            hint: 'Big menjadi bigger (huruf g dobel).',
          },
          {
            type: 'sequence',
            prompt: 'Arrange the sentence!',
            steps: ['The elephant', 'is', 'bigger than', 'the cat'],
            hint: 'Subjek + is + perbandingan + benda kedua.',
          },
        ],
      }],
    },
    {
      id: 'unit9',
      label: 'Unit 9',
      title: 'The elephant is the biggest',
      lessons: [{
        id: 'eng-9-superlative',
        title: 'The Biggest, The Tallest',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'To compare three or more things, use "the" + -est: the tallest, the smallest.' },
          { speaker: 'mentor', text: 'The elephant is the biggest. The giraffe is the tallest. The ant is the smallest.' },
          { speaker: 'student', mood: 'happy', text: 'Big → bigger → the biggest!' },
        ],
        quiz: [
          {
            type: 'sequence',
            prompt: 'Order the words: normal → comparative → superlative',
            steps: ['big', 'bigger', 'the biggest'],
            hint: 'Satu benda → dua benda → tiga atau lebih.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Of all the animals, the elephant is ___.',
            options: [{ id: 'a', label: 'big' }, { id: 'b', label: 'bigger' }, { id: 'c', label: 'the biggest' }],
            answer: 'c',
            hint: '"Of all" = dari semua → pakai bentuk -est.',
          },
          {
            type: 'drag-match',
            prompt: 'Match the animal with the sentence!',
            pairs: [
              { left: 'Giraffe', right: 'the tallest' },
              { left: 'Ant', right: 'the smallest' },
              { left: 'Elephant', right: 'the biggest' },
            ],
            hint: 'Jerapah paling tinggi, semut paling kecil, gajah paling besar.',
          },
        ],
      }],
    },
    {
      id: 'unit10',
      label: 'Unit 10',
      title: 'I like playing "balap karung"',
      lessons: [{
        id: 'eng-10-dates',
        title: 'Dates & Games',
        reward: 10,
        cards: [
          { speaker: 'mentor', text: 'On August 17th, we celebrate Independence Day with fun games like "balap karung".' },
          { speaker: 'student', mood: 'happy', text: 'I like playing balap karung!' },
          { speaker: 'mentor', text: 'When is your birthday? You can answer: "It is on March 22nd."' },
        ],
        quiz: [
          {
            type: 'sequence',
            prompt: 'Order the months!',
            steps: ['January', 'March', 'August', 'December'],
            hint: 'January adalah bulan pertama, December bulan terakhir.',
          },
          {
            type: 'multiple-choice',
            prompt: 'Indonesian Independence Day is on …',
            options: [{ id: 'a', label: 'August 17th' }, { id: 'b', label: 'December 31st' }, { id: 'c', label: 'January 1st' }],
            answer: 'a',
            hint: 'Tujuh belas Agustus!',
          },
          {
            type: 'multiple-choice',
            prompt: '"I like ___ balap karung."',
            options: [{ id: 'a', label: 'play' }, { id: 'b', label: 'playing' }, { id: 'c', label: 'plays' }],
            answer: 'b',
            hint: 'Setelah "like" kita pakai kata kerja + -ing.',
          },
        ],
      }],
    },
  ],
};
