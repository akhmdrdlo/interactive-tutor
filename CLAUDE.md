# CLAUDE.md — Project Specification & Development Guidelines

## 1. Tujuan Utama Proyek (Project Mission)
Proyek ini adalah aplikasi web pembelajaran interaktif (*gamified edutainment*) yang dirancang khusus untuk siswi kelas 5 SD (usia 10–11 tahun) berbasis **Kurikulum Merdeka (Fase C)** dengan muatan lokal Jawa Barat. 

Tujuan utamanya adalah mengubah materi buku teks pelajaran sekolah yang padat menjadi pengalaman belajar visual yang menyenangkan, bebas tekanan, dan adiktif secara positif melalui mekanisme **simulasi kamar virtual dan berdandan (*dress-up*) ala Toca Boca / Kawaii Dollhouse**—tanpa memerlukan koneksi database (*100% client-side*).

---

## 2. Tugas Utama Website (Core Features & Responsibilities)
1. **Interactive Virtual Bedroom (Main Hub):**
   - Menampilkan kamar belajar *cozy aesthetic* dengan furnitur dan benda yang dapat diklik sebagai menu navigasi utama:
     - **Rak Buku / Meja Belajar:** Membuka daftar 9 mata pelajaran Kelas 5 SD (IPAS Edisi Revisi, Matematika, Bahasa Indonesia, Bahasa Inggris *My Next Words*, PAI & Budi Pekerti, Pendidikan Pancasila, Basa Sunda *Tuturus Catur*, Seni Rupa, dan Koding & Kecerdasan Artifisial).
     - **Lemari Baju & Manekin (*Wardrobe*):** Fitur kustomisasi karakter chibi (ganti rambut, pakaian, kacamata, aksesoris) dan penukaran poin belajar dengan item baru.
     - **Area Dekorasi / Karpet:** Tempat meletakkan stiker, boneka, atau pernak-pernik kamar yang telah dibeli menggunakan bintang/koin hasil belajar.
     - **Komputer / Tablet Meja:** Khusus untuk mini-game latihan logika *Koding & Berpikir Komputasional* dari tingkat nol.
2. **Micro-Learning & Interactive Quiz Engine:**
   - Menyajikan ringkasan materi dalam bentuk kartu dialog singkat (*bite-sized story cards*) antara karakter avatar siswa dan karakter mentor/hewan peliharaan.
   - Mendukung minimal 3 tipe kuis interaktif: Pilihan Ganda Bergambar, *Drag-and-Drop* (mencocokkan kosakata/konsep), dan *Sequencing* (menyusun urutan langkah/blok kode).
3. **Zero-Database Persistence (`localStorage` + JSON Backup):**
   - Menyimpan seluruh progres belajar, jumlah koin/bintang, inventaris pakaian/dekorasi, serta tampilan avatar aktif secara otomatis di `localStorage`.
   - Menyediakan fitur **Export/Import Save File (`.json`)** agar progres tetap aman dan dapat dipindahkan antar perangkat.

---

## 3. Brand Kit & Visual Identity (Toca Boca / Kawaii Dollhouse Style)
Seluruh elemen antarmuka (UI), ikon, karakter, dan ilustrasi wajib mengikuti identitas visual berikut:

### A. Palet Warna (Color Palette)
* **Background & Dinding Kamar:**
  * Soft Cream Wall: `#FBF5EE`
  * Warm Linen / Sand: `#EFE3D5`
  * Sunlight Glow Overlay: `rgba(255, 236, 195, 0.35)`
* **Warna Aksen Utama (Primary & Secondary):**
  * Dusty Blush Pink (Utama / Tombol / Aksen): `#F2A6B8`
  * Soft Peach / Coral: `#F7C5A8`
  * Pastel Mint / Sage (Indikator Benar / Selesai): `#A8D8B9`
  * Baby Sky Blue (Aksen Sekunder): `#B5D8EB`
  * Butter Yellow (Koin / Bintang / Lampu): `#FCE38A`
* **Garis Tepi & Teks (Strokes & Typography):**
  * **Cocoa Outline (Wajib untuk ilustrasi & border kartu):** `#4A352D` *(Hindari penggunaan hitam pekat `#000000` agar kesan visual tetap lembut dan hangat)*.
  * Muted Brown Text (Teks sekunder): `#7D635B`

### B. Gaya Ilustrasi & Komponen (Art Direction)
* **Karakter Chibi:** Kepala besar membulat (*rounded-square/oval*), mata bulat besar ekspresif dengan kilau putih (*catchlight*), pipi merona (*blush*), proporsi tubuh mungil (*2.5 - 3 head tall*), serta sistem **Modular Layered SVG** agar rambut, baju, dan aksesoris mudah diganti secara dinamis.
* **Garis Tepi (*Stroke*):** Setiap objek furnitur, stiker, ikon, dan karakter memiliki garis luar (*outline*) solid berwarna `#4A352D` dengan ketebalan konsisten (`2px` hingga `3px`) dan ujung membulat (`stroke-linecap="round"`, `stroke-linejoin="round"`).
* **Bentuk UI (*Shapes*):** Sudut membulat besar (`rounded-2xl` / `16px`–`24px`), bayangan lembut tanpa blur berlebihan (*hard-soft offset shadow* seperti `0 4px 0 #D8C3B4`), menyerupai stiker fisik atau mainan kertas (*paper doll*).
* **Tipografi:**
  * Heading / Judul Lucu: `Fredoka` atau `Quicksand` (Bold, membulat, ramah anak).
  * Teks Bacaan / Soal: `Nunito` (Jelas, mudah dibaca oleh anak usia SD).

---

## 4. Development & Coding Rules (Aturan Wajib untuk Claude)
1. **Arsitektur & Tech Stack:**
   - Gunakan struktur modular yang bersih (HTML5/CSS3/Vanilla JS ES6+ atau React + Tailwind CSS dalam single-page bundle yang ringan).
   - **Dilarang keras** menggunakan backend server, API eksternal berbayar, atau database eksternal. Semua aset grafis harus berupa **Inline SVG modular** atau CSS art agar tampil tajam di semua resolusi tanpa ketergantungan link gambar mati.
2. **Standar Pembuatan Aset SVG:**
   - Saat membuat karakter atau furnitur, pisahkan setiap elemen ke dalam `<g id="...">` yang terstruktur rapi (contoh: `#layer-body`, `#layer-eyes`, `#layer-hair`, `#layer-outfit`, `#layer-accessory`).
   - Pastikan semua SVG memiliki `viewBox` yang presisi dan mendukung interaksi *hover* (animasi *scale/bounce* halus saat kursor diarahkan ke benda di kamar).
3. **Pengalaman Pengguna Anak (Child-Friendly UX):**
   - Ukuran tombol dan area klik (*touch target*) minimal `48x48px` dengan jarak antar elemen yang lega.
   - Berikan umpan balik (*feedback*) positif dan ceria setiap kali siswa menjawab soal (animasi konfeti/bintang, ekspresi karakter tersenyum, dan efek suara sintetis lembut menggunakan Web Audio API tanpa file MP3 eksternal).
   - Hindari hukuman atau pengurangan poin saat jawaban salah; gunakan bahasa penyemangat seperti *"Hampir tepat! Yuk coba lihat petunjuknya lagi!"*.
4. **Struktur Data Konten Pelajaran:**
   - Pisahkan seluruh materi pelajaran dan bank soal dari logika tampilan ke dalam folder/objek data terpisah per mata pelajaran (misal: `data/ipas.js`, `data/matematika.js`, `data/koding.js`, dll.) dengan skema JSON yang seragam agar mudah ditambah secara bertahap dari buku PDF Kurikulum Merdeka.
5. **Bahasa & Tone Komunikasi:**
   - Seluruh teks antarmuka, dialog karakter mentor, instruksi kuis, dan notifikasi di dalam aplikasi harus menggunakan **Bahasa Indonesia yang ramah, santai, dan sesuai usia anak kelas 5 SD** (kecuali pada mata pelajaran *My Next Words* yang menggunakan Bahasa Inggris dasar dan *Tuturus Catur* yang menggunakan Bahasa Sunda).