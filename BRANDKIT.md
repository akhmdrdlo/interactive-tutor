---

### 2. File `docs/BRAND_KIT.md` (Panduan Visual, Warna & Gaya Ilustrasi)

```markdown
# BRAND_KIT.md - Cozy Toca-Style Visual & Art Direction

## 1. Art Style & Illustration DNA
Mengacu pada gaya ilustrasi *2D Flat Cozy Chibi / Paper-Doll Sticker*[cite: 7, 8]:
- **Line Art (Garis Tepi):** Wajib menggunakan garis tepi tebal yang konsisten (`stroke-width: 2.5px` hingga `3.5px`), berwarna **Cokelat Tua Hangat (`#4A3531`)**—JANGAN gunakan hitam pekat (`#000000`) untuk garis tepi agar kesan tetap lembut dan ramah anak[cite: 7, 8].
- **Corner & Cap:** Semua sudut garis wajib membulat (`stroke-linecap="round"`, `stroke-linejoin="round"`).
- **Sticker White Border (Untuk Item Koleksi/Stiker):** Item hadiah atau objek yang bisa dipindah-pindah memiliki *outer outline* berwarna putih (`#FFFFFF`, tebal `4px`) di luar garis tepi cokelat tua, menyerupai stiker *die-cut*[cite: 8].
- **Shading & Lighting:**
  - *Flat cell-shading* lembut dengan 1 tingkat bayangan (*shadow*) dan 1 titik kilau (*highlight* putih bulat/oval kecil di pipi, mata, atau permukaan benda mengilap)[cite: 7, 8].
  - Efek sinar matahari sore (*sunbeams*) diagonal semi-transparan dari arah jendela kiri[cite: 7].

## 2. Color Palette (Warm Pastel & Creamy Earth Tones)

### Background & Room Surfaces
- **Dinding Krem Hangat:** `#F4E9DF` (dengan aksen panel molding `#E8D8CA`)[cite: 7]
- **Lantai Kayu Pastel / Lilac-Cream:** `#E6DCE5` hingga `#DFD3DE`[cite: 7]
- **Cahaya Jendela / Golden Glow:** `#FFF4D2` (opacity `0.45`)[cite: 7]

### Primary & Accent UI Colors
- **Sakura Pink (Primary Action / Tombol Utama):** `#F7A8B8` (Hover: `#F28B9E`, Border: `#4A3531`)[cite: 7, 8]
- **Creamy Peach (Kartu Materi / Dialog):** `#FFF9F2`[cite: 7, 8]
- **Soft Mint / Sage (Jawaban Benar / Sukses):** `#A8E6CF` (Teks/Ikon: `#2D6A4F`)[cite: 8]
- **Butter Yellow / Star Coin (Poin & Bintang):** `#FFE082` (Aksen: `#F6AD55`)[cite: 7, 8]
- **Sky Pastel Blue (Aksen Tas / Pelajaran):** `#A2D2FF`[cite: 7, 8]
- **Wood & Furniture Brown (Rak, Meja, Lemari):** `#D4A373` & `#E6CCB2`[cite: 7, 8]

### Character & Avatar Skin/Hair Palette
- **Kulit Chibi:** `#FFE5D9`, `#FFD7BA`, `#F4C095`, `#D49A6A`[cite: 7]
- **Rona Pipi (Blush):** `#FF9AA2` (opacity `0.6`, bentuk oval di bawah mata)[cite: 7]
- **Warna Mata:** `#3D2C2E` dengan titik pantulan cahaya putih `#FFFFFF`[cite: 7, 8]

## 3. Character Proportions (Chibi Toca-Style)
- **Rasio Kepala-Tubuh:** `1 : 1` (Kepala besar berbentuk oval-kotak membulat / *squircle*, dagu bulat tanpa sudut tajam)[cite: 7].
- **Fitur Wajah:**
  - Mata bulat besar berjarak agak lebar, alis pendek melengkung di atas mata, hidung titik kecil atau tidak digambar, mulut garis lengkung mungil (`w` atau `u` kecil)[cite: 7, 8].
- **Tubuh & Anggota Gerak:**
  - Badan trapesium pendek membulat, tangan pendek tanpa jari detail (bentuk sarung tangan/bulat membulat)[cite: 7].

## 4. Typography & UI Components
- **Font Utama (Heading & Tombol):** `'Fredoka'`, `'Quicksand'`, atau `'Nunito'` (Google Fonts) — bulat, tebal (`600`/`700`), ramah dibaca anak SD.
- **Font Isi Materi (Body):** `'Nunito'` (`500`/`600`), ukuran minimal `16px` (`1rem`) dengan *line-height* `1.6` agar nyaman dibaca tanpa melelahkan mata.
- **Tactile Pill Buttons (Tombol Gaya Mainan):**
  - `border: 3px solid #4A3531`
  - `border-radius: 9999px` (atau `20px` untuk kartu)
  - `box-shadow: 0 4px 0 #4A3531` (efek tombol 3D gepeng yang membal ke bawah `translateY(2px)` saat diklik).