# Sisi Baik Project · Website

Situs statis baru untuk [sisibaikproject.id](https://sisibaikproject.id), milik Yayasan Sisi Baik Manusia.
The new static website for [sisibaikproject.id](https://sisibaikproject.id), owned by Yayasan Sisi Baik Manusia.

**Pratinjau langsung / Live preview:** [sisibaik-revamp.vercel.app](https://sisibaik-revamp.vercel.app/)
(pratinjau, belum di domain resmi / a preview deployment, not yet on the official domain)

---

## Serah terima / Handoff

### Apa ini / What this is

**ID.** Situs pengganti WordPress lama Sisi Baik Project. Isinya: beranda bercerita (warisan Ibu Tien sejak 1983, program, dampak, cerita, cara membantu, Mitra Kebaikan, kontak), halaman Tentang Kami, Program Utama, 18 cerita hasil migrasi, dan halaman Do & Donate. Seluruh teks, angka, dan foto berasal dari situs lama, Impact Report 2024-2025, dan Company Profile. Situs ini sepenuhnya statis: tanpa server, tanpa database, tanpa environment variable, tanpa kunci rahasia.

**EN.** A replacement for Sisi Baik Project's old WordPress site. It contains a storytelling homepage (Ibu Tien's legacy since 1983, programs, impact, stories, ways to help, partners, contact), About, Programs, 18 migrated stories, and a Do & Donate page. All copy, figures, and photos come from the old site, the 2024-2025 Impact Report, and the Company Profile. The site is fully static: no server, no database, no environment variables, no secrets.

| Rute / Route | Isi / Content |
| --- | --- |
| `/` | Beranda / Home |
| `/tentang-kami/` | Tentang Kami, mengenang Ibu Tien, visi misi, perjalanan, tim / About, tribute, vision, timeline, team |
| `/program-utama/` | Indonesia Bisa Membaca, Patungan SPP, Kampus Darurat, Patungan Opor |
| `/stories/` | Daftar cerita dengan filter / Story list with filter (`?kategori=patungan-spp`) |
| `/stories/<slug>/` | Artikel cerita / Story article |
| `/do-donate/` | Rekening, QRIS, alokasi 2026, cara ikut bergerak / Bank account, QRIS, 2026 allocation, ways to help |

### Teknologi / Tech stack

| | |
| --- | --- |
| Framework | [Astro](https://astro.build) 7, `output: 'static'` |
| Bahasa / Language | TypeScript, Astro components, vanilla CSS and JS (tanpa framework UI / no UI framework) |
| Gambar / Images | `astro:assets` + `sharp`, otomatis ke AVIF/WebP / auto-converted to AVIF/WebP |
| Huruf / Fonts | Fraunces + Instrument Sans, dihosting sendiri via / self-hosted via Fontsource |
| SEO | `@astrojs/sitemap`, Open Graph, JSON-LD, `robots.txt` |
| Hosting | Vercel (statis / static), konfigurasi di / config in `vercel.json` |

### Menjalankan secara lokal / Run locally

**ID.** Butuh Node.js 22.12 atau lebih baru. **EN.** Requires Node.js 22.12 or newer.

```bash
git clone https://github.com/amad60/sisibaik-website.git
cd sisibaik-website
npm install
npm run dev          # http://localhost:4387
```

### Build

```bash
npm run build        # hasil statis di / static output in dist/
npm run preview      # menyajikan dist/ secara lokal / serves dist/ locally
npm run meta-images  # membuat ulang favicon, ikon, dan OG image cerita / regenerates favicon, icons, story OG images
```

**ID.** `dist/` berisi `index.html` di akarnya dan semua path aset dimulai dari akar domain, jadi isinya bisa langsung diunggah. Proses build juga menyalin `vercel.json` ke `dist/`.
**EN.** `dist/` has `index.html` at its root and every asset path starts at the domain root, so it can be uploaded as is. The build also copies `vercel.json` into `dist/`.

### Deploy ke Vercel / Deploy to Vercel

**Opsi A, lewat Git (disarankan) / Option A, via Git (recommended)**

1. Vercel → **Add New → Project** → impor repo ini / import this repo.
2. Framework Preset: **Astro** (terdeteksi otomatis / auto-detected). Build Command `npm run build`, Output Directory `dist`. Node.js 22.x atau lebih baru / or newer.
3. Tidak ada environment variable yang perlu diisi / no environment variables needed.
4. Setelah WordPress lama dimatikan, tambahkan `sisibaikproject.id` di **Settings → Domains** / once the old WordPress is retired, add `sisibaikproject.id` under **Settings → Domains**.

**Opsi B, unggah hasil build / Option B, upload the build**

```bash
npm run build
npx vercel deploy dist --prod
```

**`vercel.json`** (di akar repo / at the repo root) adalah satu-satunya sumber konfigurasi / is the single source of config:

- `trailingSlash: true`, semua URL berakhiran `/` / all URLs end with `/`.
- 53 redirect permanen dari URL WordPress lama (misalnya `/home/program-utama/`, `/2025/07/15/<judul>/`) ke halaman baru / 53 permanent redirects from old WordPress URLs to the new pages.
- Header cache untuk `/_astro/` (immutable) dan `/images/` / cache headers for `/_astro/` (immutable) and `/images/`.

**ID.** URL WordPress selalu berakhiran `/`. Saat menambah redirect berpola wildcard, akhiri `source` dengan `{/}?` (contoh: `/home/program-utama/:path*{/}?`); tanpa itu Vercel tidak mencocokkan URL yang berakhiran `/`. Redirect ini khusus Vercel; di hosting lain (Netlify, Cloudflare Pages) aturannya perlu diterjemahkan.
**EN.** WordPress URLs always end in `/`. When adding a wildcard redirect, end the `source` with `{/}?` (for example `/home/program-utama/:path*{/}?`); without it Vercel will not match URLs that end in `/`. These redirects are Vercel-specific; other hosts (Netlify, Cloudflare Pages) need them translated.

### Mengubah konten / Where to edit content

| Apa / What | Di mana / Where |
| --- | --- |
| Tahun berdiri / Founding year (`FOUNDED_YEAR`), kontak / contacts, rekening / bank account, alamat / addresses, media sosial / social links, dokumen / documents | `src/data/site.ts` |
| Mitra Kebaikan, Kindlaborators, angka dampak / impact figures, alokasi 2026 / 2026 allocation, linimasa / timeline | `src/data/site.ts` (`partners`, `collaborators`, `impact`, `timeline`) |
| Dewan Pembina & Tim Kerja Baik / Board and team | `src/data/team.ts`, foto / photos in `src/assets/team/<nama>.png` |
| Foto situs / Site photos | `src/assets/photos/<nama>.jpg`, dipanggil lewat / referenced via `photo('<nama>')` |
| Logo, QRIS | `src/assets/brand/` |
| Teks halaman / Page copy | `src/pages/*.astro`, bagian beranda / homepage sections in `src/components/home/*.astro` |
| Info pendaftaran IBM / IBM registration info | `src/pages/program-utama.astro` |
| PDF (Impact Report, Company Profile) | `public/docs/` |
| Cerita / Stories | `src/data/stories.json`, `src/data/story-images.json`, `public/images/stories/<slug>/` |
| Warna, huruf, animasi / Colors, type, motion | `src/styles/global.css` |
| Meta SEO & Open Graph | `src/layouts/Base.astro`, gambar default / default image `public/og/og-default.jpg` |

**ID.** Semua angka dan fakta dikumpulkan di `src/data/site.ts`, jadi cukup ubah di satu tempat. Contoh: bila tahun berdiri yang benar 1993, ubah `FOUNDED_YEAR` dan semua teks yang menyebut tahun ikut berubah.
**EN.** All figures and facts live in `src/data/site.ts`, so each change happens in one place. For example, if the correct founding year is 1993, change `FOUNDED_YEAR` and every sentence that mentions the year updates.

**Menambah cerita / Adding a story**

1. Simpan foto sebagai dua WebP / save each photo as two WebP files: `public/images/stories/<slug>/<nama>-720.webp` dan / and `<nama>-1400.webp` (lebar 720 dan 1400 px / 720 and 1400 px wide).
2. Daftarkan di / register it in `src/data/story-images.json`:
   `"<slug>/<nama>.jpg": { "base": "/images/stories/<slug>/<nama>", "width": 1400, "height": 1050 }` (ukuran asli / original size).
3. Tambahkan objek di / add an entry to `src/data/stories.json`: `slug`, `title`, `date` (ISO, misalnya / e.g. `2026-08-01T09:00:00`), `category`, `excerpt`, `cover` (`<nama>.jpg`), `legacyPath` (`""` untuk cerita baru / for new stories), dan / and `body` (HTML). Gambar di dalam `body` / images inside `body`: `<img src="@story/<slug>/<nama>.jpg" alt="...">`.
4. Jalankan / run `npm run meta-images` untuk OG image cerita / for the story's OG image, lalu / then `npm run build`.

Kategori baru otomatis muncul sebagai filter di `/stories/` / new categories appear automatically as filters on `/stories/`.

### Struktur / Structure

```
src/
  data/site.ts            fakta organisasi / organization facts
  data/team.ts            Dewan Pembina dan Tim Kerja Baik / board and team
  data/stories.json       18 cerita hasil migrasi / migrated stories
  data/story-images.json  ukuran gambar cerita / story image dimensions
  lib/                    helper gambar dan cerita / image and story helpers
  components/             komponen bersama / shared components
  components/home/        bagian beranda / homepage sections
  layouts/Base.astro      meta SEO, Open Graph, JSON-LD, skrip animasi / animation script
  pages/                  rute / routes
  styles/global.css       token warna, tipografi, tombol, animasi / design tokens
src/assets/               foto dan logo (dioptimalkan saat build) / photos and logos (optimized at build)
public/images/stories/    gambar artikel / article images (WebP 720 & 1400 px)
public/docs/              Impact Report dan Company Profile (PDF)
public/og/                gambar Open Graph / Open Graph images
scripts/                  skrip migrasi dan pembuat ikon/OG / migration and icon/OG scripts
vercel.json               redirect, header, trailing slash
```

`scripts/extract-stories.py` dan / and `scripts/prepare-assets.mjs` adalah alat migrasi sekali pakai dari situs lama; tidak dibutuhkan untuk build / are one-off migration tools from the old site and are not needed to build.

---

## Perlu ditinjau / Owner-review checklist

Hal-hal berikut perlu dikonfirmasi pemilik sebelum situs ditayangkan di domain resmi.
The owner should confirm the following before the site goes live on the official domain.

- [ ] **1. Tahun berdiri Edukasi Dasar / Founding year.**
  ID: Beranda lama menulis 1983, tetapi halaman Program Utama, halaman Tim, beberapa artikel, dan Impact Report menulis **1993** (Impact Report juga menyebut "27 tahun mengajar" hingga 2020). Situs memakai 1983. Ubah `FOUNDED_YEAR` di `src/data/site.ts` bila yang benar 1993.
  EN: The old homepage says 1983, but the Programs page, Team page, several articles, and the Impact Report say **1993**. The site uses 1983. Change `FOUNDED_YEAR` in `src/data/site.ts` if 1993 is correct.
- [ ] **2. Nama bank / Bank name.**
  ID: Halaman Do & Donate lama hanya menulis "Yayasan Sisi Baik Manusia 723800010107" di samping logo OCBC. Nama bank OCBC disimpulkan dari logo tersebut.
  EN: The old Do & Donate page only shows the account number next to an OCBC logo. "OCBC" was inferred from that logo.
- [ ] **3. Alamat email / Email address.**
  ID: Footer lama memakai `halo@sisibaikproject.id`, halaman Do & Donate menulis `hallo@sisibaikproject.id`. Situs memakai `halo@`.
  EN: The old footer uses `halo@`, the Do & Donate page uses `hallo@`. The site uses `halo@`.
- [ ] **4. Ibu Tien Suryantini.**
  ID: Impact Report menyebut beliau berpulang pada 2026. Tentang Kami memuat bagian "Mengenang" dan bio beliau ditulis dalam bentuk lampau. Mohon tinjau kepantasan kata-katanya bersama keluarga.
  EN: The Impact Report says she passed away in 2026. About has a tribute section and her bio is in past tense. Please review the wording with her family.
- [ ] **5. Kampus Darurat.**
  ID: Situs lama menulis "(segera hadir)", jadi program ini tampil sebagai "Segera hadir". Foto workshop perfilman SMK (Oktober 2025) dipakai sebagai ilustrasi dengan keterangan yang jelas.
  EN: The old site says "coming soon", so the program is shown that way. A captioned photo of the October 2025 SMK film workshop is used as illustration.
- [ ] **6. One Plate Project dan / and Teras Tax Consulting.**
  ID: One Plate tampil sebagai Mitra Kebaikan di beranda lama, tetapi Impact Report mencantumkannya sebagai Kindlaborator; situs menampilkannya di keduanya. Logo Teras Tax Consulting belum ada, sehingga ditampilkan sebagai teks.
  EN: One Plate was a partner logo on the old homepage but the Impact Report lists it as a Kindlaborator; the site shows it in both. There is no Teras Tax Consulting logo yet, so it appears as text.
- [ ] **7. Foto anak-anak / Children's photos.**
  ID: Semua foto siswa diambil dari situs lama. Pastikan izin orang tua masih berlaku untuk situs baru. Dokumen pribadi (KTP, KK, akta, SKTM) sengaja tidak dipakai. Beberapa artikel Patungan SPP memuat kuitansi pembayaran sekolah seperti di situs lama; tinjau apakah masih ingin ditampilkan.
  EN: All student photos come from the old site. Confirm parental consent covers the new site. Personal documents were deliberately left out. Some Patungan SPP stories include school payment receipts as on the old site; decide whether to keep them.
- [ ] **8. Angka dampak / Impact figures.**
  ID: Semua angka diambil dari Impact Report 2024-2025 (46 siswa IBM; 18 penerima dan 20 pembayaran Patungan SPP senilai Rp15.995.000; 98 dan 300 penerima Patungan Opor; kebutuhan kelas Rp40.900.000 per tahun; kebutuhan 2026 Rp250.000.000). Satu artikel menyebut 28 siswa untuk 2025-2026, laporan menyebut 26; situs memakai angka laporan.
  EN: All figures come from the 2024-2025 Impact Report. One article says 28 students for 2025-2026 while the report says 26; the site uses the report.
- [ ] **9. Jadwal kelas / Class schedule.**
  ID: "Senin sampai Kamis pukul 08.00 WIB" dan "Jumat budi pekerti, makan bersama" diambil dari artikel lama. Pastikan masih berlaku.
  EN: The weekly schedule comes from an old article. Confirm it is still current.
- [ ] **10. Pendaftaran IBM / IBM registration.**
  ID: Info yang tampil adalah pendaftaran terakhir (2-5 Juni 2025, maksimal 40 siswa). Perbarui di `src/pages/program-utama.astro` saat pendaftaran baru dibuka.
  EN: The info shown is the last intake (2-5 June 2025, up to 40 students). Update `src/pages/program-utama.astro` when a new intake opens.
- [ ] **11. Cerita yang dimigrasi / Migrated stories.**
  ID: Hanya 18 cerita yang dipindahkan (daftar di `scripts/extract-stories.py`). Sekitar 40 artikel lama lainnya tidak dipindahkan; URL lamanya diarahkan ke `/stories/`. Halaman profil per siswa Patungan SPP dan "Special Kids" tidak dipindahkan karena memuat data pribadi anak.
  EN: Only 18 stories were migrated. About 40 other old articles were not; their URLs redirect to `/stories/`. Per-student profile pages were left out because they contain children's personal data.
- [ ] **12. Bio tim / Team bios.**
  ID: Diringkas dari halaman Tim lama. Periksa kembali jabatan dan isinya.
  EN: Condensed from the old Team page. Please check titles and wording.
- [ ] **13. Typo dari sumber / Source typos.**
  ID: Dibiarkan apa adanya di isi artikel (misalnya "Pengadian" pada cerita FIK UI dan "Aprilianingih" pada cerita Nazwa).
  EN: Left as written in the article bodies (for example "Pengadian" and "Aprilianingih").
- [ ] **14. Toko Sisi Baik.**
  ID: Tautan mengarah ke `tokopedia.com/tokosisibaik` dari situs lama. Pastikan toko masih aktif.
  EN: The link points to `tokopedia.com/tokosisibaik` from the old site. Confirm the store is still active.

---

## Lisensi / License

**ID.** Kode sumber dirilis di bawah [Lisensi MIT](LICENSE), Copyright (c) 2026 Rahmad Dita. Lisensi ini hanya berlaku untuk kode. Teks, foto, logo, dan dokumen di dalam repo adalah milik Yayasan Sisi Baik Manusia dan tidak tercakup Lisensi MIT. Huruf Fraunces dan Instrument Sans memakai SIL Open Font License.

**EN.** The source code is released under the [MIT License](LICENSE), Copyright (c) 2026 Rahmad Dita. The license covers the code only. The text, photos, logos, and documents in this repository belong to Yayasan Sisi Baik Manusia and are not covered by the MIT License. The Fraunces and Instrument Sans fonts use the SIL Open Font License.
