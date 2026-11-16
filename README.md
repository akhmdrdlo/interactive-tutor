<div align="center">

# ⭐ SDaya

### Belajar seru untuk anak kelas 5 SD — sambil menghias kamar, berdandan, dan bermain

**Kurikulum Merdeka Fase C · Muatan lokal Jawa Barat · 100% di browser, tanpa akun, tanpa server**

`8 mata pelajaran` · `75 pelajaran` · `225 soal` · `61 bab Buku Ringkas` · `4 Buku Cerita` · `4 Lab Mini` · `2 minigame`

</div>

---

## Apa itu SDaya?

SDaya mengubah buku teks kelas 5 SD yang padat menjadi **kamar virtual bergaya mainan**. Anak berjalan di kamarnya sendiri, mengetuk rak buku untuk belajar, membuka lemari untuk berdandan, dan menukar bintang hasil belajar dengan baju atau hiasan kamar.

Tidak ada hukuman saat salah. Mochi si kucing selalu bilang: *"Hampir tepat! Yuk coba lagi."*

## Yang bisa dijelajahi

| Di kamar | Isinya |
|---|---|
| 📚 **Rak Buku** | 75 pelajaran dari 8 mapel: kartu cerita bersama Mochi + kuis pilihan ganda, pasangkan, dan urutkan |
| ✏️ **Meja Belajar** | Buku Cerita dua arah, Buku Ringkas (bisa *didengarkan*), Lab Mini, Peta Indonesia, Garis Waktu, Latihan Berhitung tanpa batas, Kartu Kosakata, Kuis Acak, Kotak Ulang, Koleksi Lencana |
| 💻 **Komputer** | Minigame *Jalan Pulang Mochi* (algoritma & perulangan, 8 level) dan *Tebak Pola* |
| 👗 **Lemari Baju** | 8 gaya rambut (termasuk kerudung), 8 baju (seragam SD, batik, kebaya…), 8 aksesoris, 4 warna kulit |
| 🧸 **Dekorasi** | 15 hiasan yang bisa diseret ke mana saja di dinding & lantai |
| 🚪 **Teman berkunjung** | Nisa, Teh Euis, Kak Raka, dan Dinda datang sesekali dan bertanya soal **acak** dari semua pelajaran |

**Mata pelajaran:** IPAS · Matematika · Bahasa Indonesia · Bahasa Inggris (*My Next Words*) · PAI & Budi Pekerti · Pendidikan Pancasila · Basa Sunda (*Tuturus Catur*) · Koding & Kecerdasan Artifisial

## Adil soal bintang

- Bintang penuh hanya kalau ≥ 2/3 soal benar **di percobaan pertama**; sisanya bisa dikejar saat mengulang.
- Membaca terlalu cepat tidak dapat bintang.
- Bonus latihan dan bonus tamu dibatasi **10 bintang per hari**.

## Coba sendiri

```bash
npm install
npm run dev            # buka http://localhost:5173
```

```bash
npm run build          # hasil statis di dist/ — siap untuk Vercel / Netlify / GitHub Pages
npm run check:content  # cek semua materi, buku, kosakata, dan level koding
```

Kendali: **◀ ▶** di layar, **panah / A-D** di keyboard, atau ketuk lantai untuk berjalan.

## Untuk orang tua & guru

- **Privasi:** semua progres tersimpan di perangkat (localStorage). Tidak ada akun, iklan, atau pengiriman data.
- **Pindah perangkat:** tombol *Simpan* → unduh file `.json`, lalu buka di perangkat lain.
- **Ramah anak:** tombol minimal 48 px, bisa dipakai dengan keyboard, mendukung mode *gerak dikurangi*.
- **Perlu ditinjau:** materi PAI dan Basa Sunda sebaiknya dicek guru sebelum dipakai di kelas. Seni Rupa menunggu buku sumber.

## Untuk pengembang

Vanilla JS + Vite, semua grafis berupa inline SVG modular, font dibundel lokal.

```
src/
  core/        palet warna, store (localStorage + ekspor/impor), suara Web Audio, ucapan (Web Speech)
  character/   avatar chibi berlapis: #layer-hair-back … #layer-accessory
  scenes/      kamar geser, lemari, dekorasi, pelajaran, teman berkunjung
  sandbox/     meja belajar: cerita, lab, peta, garis waktu, latihan, kosakata, lencana
  minigames/   komputer koding
  quiz/        runner kuis + pilihan ganda, pasangkan/urutkan (seret atau ketuk), papan angka
  data/        materi per mapel, Buku Ringkas, cerita, kosakata, katalog lemari & dekorasi
sumber/        buku PDF asli + teks hasil ekstraksi (tidak ikut build)
```

**Menambah materi:** tulis di `src/data/subjects/<mapel>.js` dan `src/data/books/<mapel>.js` mengikuti `_schema.js`, lalu jalankan `npm run check:content`.

---

<div align="center">Dibuat dengan 💗 untuk anak-anak SD Indonesia.</div>
