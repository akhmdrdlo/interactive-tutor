/**
 * Bahasa Inggris Kelas VI: English for Nusantara Kids.
 * Sumber: sumber/kelas6/bahasa-inggris/Inggris_FN_BS_KLS_VI.pdf — 6 chapters.
 * Dialog Mochi tetap memakai bahasa Inggris sederhana dengan sedikit bantuan bahasa Indonesia.
 */
import { bab, lesson, pg, jodoh, urut } from './_make.js';

export default {
  id: 'bahasa-inggris-6',
  source: 'Buku Siswa Bahasa Inggris: English for Nusantara Kids untuk SD/MI Kelas VI, Kemendikbudristek 2024',
  chapters: [
    bab('bab1', 'Healthy Vegetables', [
      lesson('en6-1-veg', 'My Favorite Vegetable', [
        'Hello! Let’s talk about vegetables. Carrots are orange. Spinach and broccoli are green. Tomatoes are red.',
        'Vegetables are healthy. They have vitamins to keep our body strong.',
        '?What is your favorite vegetable, Mochi?',
        '!My favorite vegetable is corn. It is yellow and sweet! Now you say: "My favorite vegetable is …"',
      ], [
        jodoh('Match the vegetable with its color!', [['Carrot', 'Orange'], ['Spinach', 'Green'], ['Tomato', 'Red'], ['Eggplant', 'Purple']], 'Wortel berwarna oranye, terong berwarna ungu.'),
        pg('"Bayam" in English is …', ['Spinach', 'Cabbage', 'Cucumber'], 'Popeye likes to eat it!'),
        pg('Choose the correct sentence.', ['My favorite vegetable is broccoli.', 'My favorite vegetable are broccoli.', 'Favorite my vegetable is broccoli.'], 'One vegetable uses "is".'),
      ]),
    ]),
    bab('bab2', 'Our Hygiene Habits', [
      lesson('en6-2-hygiene', 'Let’s Wash Our Hands!', [
        'Hygiene means keeping our body clean. Clean hands keep germs away.',
        'Wash your hands before eating and after using the toilet. Brush your teeth twice a day. Take a bath every day.',
        'S:How do I wash my hands?',
        '!First, wet your hands. Next, use soap and rub. Then, rinse with water. Finally, dry your hands. Easy!',
      ], [
        urut('Put the hand-washing steps in order!', ['Wet your hands', 'Use soap and rub', 'Rinse with water', 'Dry your hands'], 'Basahi, sabuni, bilas, keringkan.'),
        pg('We should brush our teeth …', ['twice a day', 'once a month', 'never'], 'Pagi dan sebelum tidur.'),
        jodoh('Match the habit with the thing we use!', [['Brush my teeth', 'Toothbrush'], ['Wash my hair', 'Shampoo'], ['Dry my body', 'Towel'], ['Cut my nails', 'Nail clipper']], 'Towel = handuk, nail clipper = gunting kuku.'),
      ]),
    ]),
    bab('bab3', 'A Trip to the Zoo', [
      lesson('en6-3-zoo', 'Animals at the Zoo', [
        'Today we go to the zoo! I can see an elephant, a giraffe, an orangutan, and a Komodo dragon.',
        'We describe animals with "It has …". The giraffe has a long neck. The elephant has a long trunk.',
        '?What animal is from Indonesia?',
        '!The Komodo dragon and the orangutan! The Komodo dragon lives on Komodo Island. Let’s protect them.',
      ], [
        jodoh('Match the animal with its body part!', [['Giraffe', 'A long neck'], ['Elephant', 'A long trunk'], ['Zebra', 'Black and white stripes'], ['Peacock', 'Colorful feathers']], 'Trunk = belalai, stripes = belang.'),
        pg('"It is a big lizard. It lives on Komodo Island." What animal is it?', ['Komodo dragon', 'Orangutan', 'Penguin'], 'Lizard = kadal.'),
        pg('Choose the correct sentence.', ['The elephant has big ears.', 'The elephant have big ears.', 'The elephant is has big ears.'], 'He, she, it → has.'),
      ]),
    ]),
    bab('bab4', 'Let’s Play!', [
      lesson('en6-4-play', 'What Do We Do First?', [
        'Let’s play traditional games: congklak, kites, and hide and seek!',
        'To explain how to play, we use sequence words: first, next, then, finally.',
        'S:How do we fly a kite?',
        '!First, hold the kite. Next, run against the wind. Then, let the string out slowly. Finally, watch it fly high!',
      ], [
        urut('Put the steps for flying a kite in order!', ['First, hold the kite', 'Next, run against the wind', 'Then, let the string out slowly', 'Finally, watch it fly high'], 'First → next → then → finally.'),
        pg('The word that shows the last step is …', ['Finally', 'First', 'Next'], 'Kata untuk langkah terakhir.'),
        pg('"Petak umpet" in English is …', ['Hide and seek', 'Tug of war', 'Jump rope'], 'One friend hides, one friend seeks.'),
      ]),
    ]),
    bab('bab5', 'Having Fun in Our After-School Club', [
      lesson('en6-5-club', 'Our Last Camping Trip', [
        'After school, I join the drawing club. My friend joins the football club. What club do you join?',
        'Last week our scout club went camping. When we tell a past story, verbs change: go → went, see → saw, eat → ate.',
        '?What did you do at the camp?',
        '!We built a tent, we saw many stars, and we ate roasted corn. It was so fun!',
      ], [
        jodoh('Match the verb with its past form!', [['go', 'went'], ['see', 'saw'], ['eat', 'ate'], ['play', 'played']], 'Some verbs just add -ed, some change completely.'),
        pg('Yesterday we … a tent near the river.', ['built', 'build', 'building'], 'Yesterday = past. Build → built.'),
        pg('"I join the drawing club" means I like to …', ['draw pictures', 'play football', 'cook food'], 'Drawing = menggambar.'),
      ]),
    ]),
    bab('bab6', 'Our School Project', [
      lesson('en6-6-project', 'Planning Our Project', [
        'Our class is going to make a school project: a recycled garden from plastic bottles!',
        'We talk about plans with "We are going to …". We are going to collect bottles. We are going to plant flowers.',
        'S:Who does what?',
        '!Let’s share the jobs. Rani is going to cut the bottles. I am going to paint them. Working together is fun!',
      ], [
        pg('Choose the sentence about a plan.', ['We are going to plant flowers.', 'We planted flowers yesterday.', 'We plant flowers every day.'], 'Rencana = "going to".'),
        urut('Put the project steps in order!', ['Collect plastic bottles', 'Cut the bottles', 'Paint the bottles', 'Plant the flowers'], 'You need bottles before you can cut them.'),
        pg('"Bekerja sama" in English is …', ['Work together', 'Work alone', 'Go home'], 'Together = bersama.'),
      ]),
    ]),
  ],
};
