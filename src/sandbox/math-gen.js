/**
 * Pembuat soal hitung acak sesuai materi Matematika Kelas V.
 * Setiap pemanggilan menghasilkan soal baru, jadi latihan tidak pernah habis.
 * Bentuk soal mengikuti skema kuis (type: 'number' atau 'multiple-choice').
 */

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const fmt = (n) => n.toLocaleString('id-ID');
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const lcm = (a, b) => (a * b) / gcd(a, b);

export const MATH_TOPICS = [
  { id: 'tambah', title: 'Penjumlahan', blurb: 'Bilangan sampai 100.000' },
  { id: 'kurang', title: 'Pengurangan', blurb: 'Bilangan sampai 100.000' },
  { id: 'kali', title: 'Perkalian', blurb: 'Perkalian bersusun sederhana' },
  { id: 'bagi', title: 'Pembagian', blurb: 'Pembagian tanpa sisa' },
  { id: 'nilai-tempat', title: 'Nilai Tempat', blurb: 'Puluh ribuan sampai satuan' },
  { id: 'kpk-fpb', title: 'KPK & FPB', blurb: 'Kelipatan dan faktor' },
  { id: 'pecahan', title: 'Pecahan', blurb: 'Jumlah & kurang berpenyebut sama' },
  { id: 'keliling-luas', title: 'Keliling & Luas', blurb: 'Persegi dan persegi panjang' },
];

const GEN = {
  tambah() {
    const a = rand(1000, 60000);
    const b = rand(100, 99999 - a);
    return { type: 'number', prompt: `${fmt(a)} + ${fmt(b)} = …`, answer: a + b, hint: 'Jumlahkan dari satuan dulu. Jangan lupa menyimpan ke tempat berikutnya kalau lebih dari 9.' };
  },
  kurang() {
    const a = rand(5000, 99999);
    const b = rand(100, a - 1);
    return { type: 'number', prompt: `${fmt(a)} − ${fmt(b)} = …`, answer: a - b, hint: 'Kurangkan dari satuan. Kalau angka atas lebih kecil, pinjam dari tempat sebelah kiri.' };
  },
  kali() {
    const a = rand(12, 250);
    const b = rand(2, 12);
    return { type: 'number', prompt: `${fmt(a)} × ${b} = …`, answer: a * b, hint: `Pecah ${a} menjadi ratusan, puluhan, dan satuan, kalikan masing-masing dengan ${b}, lalu jumlahkan.` };
  },
  bagi() {
    const b = rand(2, 12);
    const q = rand(5, 150);
    return { type: 'number', prompt: `${fmt(b * q)} : ${b} = …`, answer: q, hint: `Cari bilangan yang jika dikali ${b} hasilnya ${fmt(b * q)}.` };
  },
  'nilai-tempat'() {
    const n = rand(10000, 99999);
    const digits = String(n).split('');
    const names = ['puluh ribuan', 'ribuan', 'ratusan', 'puluhan', 'satuan'];
    const i = rand(0, 4);
    const value = Number(digits[i]) * 10 ** (4 - i);
    return { type: 'number', prompt: `Berapa nilai angka ${digits[i]} pada bilangan ${fmt(n)}? (tempat ${names[i]})`, answer: value, hint: `Angka di tempat ${names[i]} dikalikan ${fmt(10 ** (4 - i))}.` };
  },
  'kpk-fpb'() {
    if (Math.random() < 0.5) {
      const pairs = [[2, 3], [3, 4], [4, 6], [2, 5], [3, 5], [4, 5], [6, 8], [5, 10], [6, 9], [4, 10]];
      const [a, b] = pairs[rand(0, pairs.length - 1)];
      return { type: 'number', prompt: `KPK dari ${a} dan ${b} adalah …`, answer: lcm(a, b), hint: `Tulis kelipatan ${a} dan kelipatan ${b}, lalu cari yang sama paling kecil.` };
    }
    const pairs = [[12, 18], [8, 12], [10, 15], [16, 24], [9, 12], [14, 21], [18, 24], [20, 30]];
    const [a, b] = pairs[rand(0, pairs.length - 1)];
    return { type: 'number', prompt: `FPB dari ${a} dan ${b} adalah …`, answer: gcd(a, b), hint: `Tulis semua faktor ${a} dan ${b}, lalu cari faktor sama yang paling besar.` };
  },
  pecahan() {
    const d = [4, 5, 6, 7, 8, 9, 10][rand(0, 6)];
    const a = rand(1, d - 2);
    const plus = Math.random() < 0.6;
    const b = plus ? rand(1, d - 1 - a) : rand(1, a);
    if (!plus && a === b) return GEN.pecahan();
    const r = plus ? a + b : a - b;
    return { type: 'number', prompt: `${a}/${d} ${plus ? '+' : '−'} ${b}/${d} = …`, answer: `${r}/${d}`, hint: 'Penyebutnya sama, jadi penyebut tetap. Hitung pembilangnya saja. Tulis jawaban seperti 3/5.' };
  },
  'keliling-luas'() {
    const square = Math.random() < 0.4;
    const luas = Math.random() < 0.5;
    if (square) {
      const s = rand(2, 15);
      return luas
        ? { type: 'number', prompt: `Luas persegi dengan sisi ${s} cm adalah …`, answer: s * s, unit: 'cm²', hint: 'Luas persegi = sisi × sisi.' }
        : { type: 'number', prompt: `Keliling persegi dengan sisi ${s} cm adalah …`, answer: 4 * s, unit: 'cm', hint: 'Keliling persegi = 4 × sisi.' };
    }
    const p = rand(4, 20);
    const l = rand(2, p - 1);
    return luas
      ? { type: 'number', prompt: `Luas persegi panjang ${p} cm × ${l} cm adalah …`, answer: p * l, unit: 'cm²', hint: 'Luas persegi panjang = panjang × lebar.' }
      : { type: 'number', prompt: `Keliling persegi panjang ${p} cm × ${l} cm adalah …`, answer: 2 * (p + l), unit: 'cm', hint: 'Keliling persegi panjang = 2 × (panjang + lebar).' };
  },
};

export function makeMathQuestion(topicId) {
  return (GEN[topicId] ?? GEN.tambah)();
}
