/**
 * Katalog lemari baju. Hanya data — cara menggambar tiap item ada di
 * src/character/parts.js dengan `id` yang sama.
 *
 * price: 0 = langsung dimiliki. > 0 = ditukar dengan bintang.
 */
export const WARDROBE = {
  hair: [
    { id: 'bob', name: 'Bob Berponi', price: 0 },
    { id: 'kuncir', name: 'Kuncir Dua', price: 0 },
    { id: 'panjang', name: 'Panjang Ikal', price: 0 },
    { id: 'kerudung', name: 'Kerudung', price: 0 },
    { id: 'ekorKuda', name: 'Ekor Kuda', price: 25 },
    { id: 'sanggul', name: 'Cepol Dua', price: 35 },
    { id: 'pendek', name: 'Pendek Ceria', price: 25 },
    { id: 'kepang', name: 'Kepang Samping', price: 30 },
  ],
  outfit: [
    { id: 'seragam', name: 'Seragam Sekolah', price: 0 },
    { id: 'overall', name: 'Overall Ceria', price: 0 },
    { id: 'gaun', name: 'Gaun Sakura', price: 0 },
    { id: 'hoodie', name: 'Hoodie Awan', price: 30 },
    { id: 'piyama', name: 'Piyama Bintang', price: 30 },
    { id: 'batik', name: 'Gaun Batik', price: 40 },
    { id: 'olahraga', name: 'Baju Olahraga', price: 25 },
    { id: 'kebaya', name: 'Kebaya Kartini', price: 45 },
  ],
  accessory: [
    { id: 'kacamata', name: 'Kacamata Bulat', price: 0 },
    { id: 'jepit', name: 'Jepit Bintang', price: 20 },
    { id: 'pita', name: 'Pita Manis', price: 30 },
    { id: 'bando', name: 'Bando Bunga', price: 20 },
    { id: 'syal', name: 'Syal Hangat', price: 25 },
    { id: 'headphone', name: 'Headphone', price: 35 },
    { id: 'topi', name: 'Topi Bucket', price: 25 },
    { id: 'stikerPipi', name: 'Stiker Pipi', price: 15 },
  ],
};

export const SKIN_TONES = [
  { name: 'Kulit 1', base: '#FFE5D9', shade: '#F3CDBE' },
  { name: 'Kulit 2', base: '#FFD7BA', shade: '#F0BD9A' },
  { name: 'Kulit 3', base: '#F4C095', shade: '#DFA577' },
  { name: 'Kulit 4', base: '#D49A6A', shade: '#B98052' },
];

export const HAIR_COLORS = [
  { name: 'Cokelat Tua', base: '#6A4536', shade: '#4F3227' },
  { name: 'Hitam Kopi', base: '#43302C', shade: '#30211E' },
  { name: 'Karamel', base: '#B07A55', shade: '#8E5E3E' },
  { name: 'Pink Permen', base: '#F2A6B8', shade: '#D98AA0' },
];

export const HIJAB_COLORS = [
  { name: 'Mint', base: '#A8D8B9', shade: '#88BF9C' },
  { name: 'Pink', base: '#F2A6B8', shade: '#D98AA0' },
  { name: 'Biru Langit', base: '#B5D8EB', shade: '#93BED6' },
  { name: 'Krem', base: '#EFE3D5', shade: '#D8C6B3' },
];

export const DEFAULT_AVATAR = {
  hair: 'bob',
  color: 0,
  outfit: 'seragam',
  skin: 1,
  accessories: [],
};

export function findItem(category, id) {
  return WARDROBE[category]?.find((item) => item.id === id) ?? null;
}
