# Sisi Baik Project, situs baru

Situs statis baru untuk [sisibaikproject.id](https://sisibaikproject.id), dibangun dengan [Astro](https://astro.build). Seluruh konten dan foto berasal dari situs lama (WordPress), Impact Report 2024-2025, dan Company Profile Sisi Baik. Tidak ada server, database, atau environment variable.

## Halaman

| Rute | Isi |
| --- | --- |
| `/` | Beranda: hero, warisan Ibu Tien, program, dampak, cerita, ikut bergerak, Mitra Kebaikan, kontak |
| `/tentang-kami/` | Dua jalan (Edukasi Dasar dan Sisi Baik), mengenang Ibu Tien, visi misi, perjalanan, tim |
| `/program-utama/` | Indonesia Bisa Membaca, Patungan SPP, Kampus Darurat, Patungan Opor |
| `/stories/` | 18 cerita pilihan dengan filter kategori (`?kategori=patungan-spp`) |
| `/stories/<slug>/` | Artikel cerita |
| `/do-donate/` | Rekening, QRIS, alokasi kebutuhan 2026, cara ikut bergerak |

## Menjalankan secara lokal

Butuh Node.js 22.12 atau lebih baru.

```bash
npm install
npm run dev       # http://localhost:4387
npm run build     # hasil statis di dist/
npm run preview   # menyajikan dist/ secara lokal
npm run meta-images  # membuat ulang favicon, ikon, dan OG image cerita
```

## Deploy

`npm run build` menghasilkan folder `dist/` yang bisa diunggah ke hosting statis mana pun. `dist/vercel.json` berisi redirect dari URL WordPress lama (misalnya `/home/program-utama/` dan `/2025/07/15/<judul>/`) ke halaman baru, serta header cache. Di Vercel, unggah isi `dist/` sebagai proyek tanpa framework (Output Directory: `.`), atau hubungkan repo ini dengan preset Astro.

## Struktur

```
src/
  data/site.ts            fakta organisasi: kontak, rekening, mitra, angka dampak, linimasa
  data/team.ts            Dewan Pembina dan Tim Kerja Baik
  data/stories.json       18 cerita hasil migrasi (scripts/extract-stories.py)
  components/home/        bagian-bagian beranda
  layouts/Base.astro      meta SEO, Open Graph, JSON-LD, skrip animasi
  styles/global.css       token warna, tipografi, tombol, animasi
src/assets/               foto dan logo (dioptimalkan otomatis ke AVIF/WebP saat build)
public/images/stories/    gambar di dalam artikel cerita (WebP 720 dan 1400 px)
public/docs/              Impact Report dan Company Profile (PDF)
scripts/                  skrip migrasi konten dan pembuat ikon/OG image
```

Angka dan fakta yang tampil di situs dikumpulkan di `src/data/site.ts`, jadi perubahan cukup dilakukan di satu tempat.

## Perlu ditinjau

Hal-hal berikut perlu dikonfirmasi pemilik sebelum situs ditayangkan:

1. **Tahun berdirinya Edukasi Dasar.** Beranda situs lama menulis 1983, tetapi halaman Program Utama, halaman Tim, beberapa artikel, dan Impact Report menulis **1993** (Impact Report juga menyebut "27 tahun mengajar" hingga 2020). Situs ini memakai 1983 sesuai brief. Ubah `FOUNDED_YEAR` di `src/data/site.ts` bila yang benar 1993; semua teks ikut berubah.
2. **Nama bank.** Halaman Do & Donate lama hanya menulis "Yayasan Sisi Baik Manusia 723800010107" di samping logo OCBC. Nama bank OCBC disimpulkan dari logo tersebut.
3. **Alamat email.** Footer lama memakai `halo@sisibaikproject.id`, sedangkan halaman Do & Donate menulis `hallo@sisibaikproject.id`. Situs ini memakai `halo@`.
4. **Ibu Tien Suryantini.** Impact Report menyebut beliau berpulang pada 2026. Halaman Tentang Kami memuat bagian "Mengenang" dan bio beliau sudah diubah ke bentuk lampau. Mohon tinjau kepantasan kata-katanya bersama keluarga.
5. **Kampus Darurat.** Situs lama menulis "(segera hadir)", jadi program ini ditampilkan sebagai "Segera hadir". Foto workshop perfilman SMK (Oktober 2025) dipakai sebagai ilustrasi dengan keterangan yang jelas, bukan sebagai kegiatan Kampus Darurat.
6. **One Plate Project.** Tampil sebagai logo Mitra Kebaikan di beranda lama, tetapi Impact Report mencantumkannya sebagai Kindlaborator. Situs ini menampilkannya di keduanya. Badan Usaha Mitra Kebaikan menurut Impact Report: Teras Tax Consulting, Jasa Berdikari Logistics, RS Hermina Group. Logo Teras Tax Consulting belum ada, sehingga ditampilkan sebagai teks.
7. **Foto anak-anak.** Semua foto siswa diambil dari situs lama. Mohon pastikan izin orang tua masih berlaku untuk situs baru. Dokumen pribadi (KTP, KK, akta, SKTM) yang ada di situs lama sengaja tidak dipakai. Beberapa artikel Patungan SPP memuat kuitansi pembayaran sekolah seperti di situs lama; tinjau apakah masih ingin ditampilkan.
8. **Angka dampak.** Semua angka di bagian Dampak dan Program diambil dari Impact Report 2024-2025 (46 siswa IBM, 18 penerima dan 20 pembayaran Patungan SPP senilai Rp15.995.000, 98 dan 300 penerima Patungan Opor, kebutuhan kelas Rp40.900.000 per tahun, kebutuhan 2026 Rp250.000.000). Satu artikel menyebut 28 siswa untuk 2025-2026, sedangkan laporan menyebut 26; situs memakai angka laporan.
9. **Jadwal kelas.** "Senin sampai Kamis pukul 08.00 WIB" dan "Jumat budi pekerti, makan bersama" diambil dari artikel situs lama. Pastikan masih berlaku.
10. **Pendaftaran IBM.** Info pendaftaran yang ditampilkan adalah pendaftaran terakhir (2-5 Juni 2025, maksimal 40 siswa). Perbarui di `src/pages/program-utama.astro` saat pendaftaran baru dibuka.
11. **Cerita yang dimigrasi.** Hanya 18 cerita terbaru dan paling relevan yang dipindahkan (daftar di `scripts/extract-stories.py`). Sekitar 40 artikel lama lainnya (tips karier, artikel umum, kabar lama Patungan SPP) tidak dipindahkan; URL lamanya diarahkan ke `/stories/`. Halaman profil per siswa Patungan SPP dan "Special Kids" juga tidak dipindahkan karena memuat data pribadi anak.
12. **Bio tim** diringkas dari halaman Tim lama. Mohon periksa kembali jabatan dan isinya.
13. **Typo dari sumber** dibiarkan apa adanya di isi artikel (misalnya "Pengadian" pada cerita FIK UI dan "Aprilianingih" pada cerita Nazwa).
14. **Toko Sisi Baik.** Tautan mengarah ke `tokopedia.com/tokosisibaik` dari situs lama. Pastikan toko masih aktif.

## Kredit konten

Teks, foto, logo, dan dokumen milik Yayasan Sisi Baik Manusia. Huruf: Fraunces dan Instrument Sans (SIL Open Font License), dihosting sendiri lewat Fontsource.
