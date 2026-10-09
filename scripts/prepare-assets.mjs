// One-off migration helper: copies the selected original photos from the old
// site (downloaded to /tmp/raw and /tmp/story-raw) into the repo at sensible
// sizes. Site photos go to src/assets (Astro generates AVIF/WebP srcsets at
// build time); story body images go to public/images/stories as WebP pairs.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const RAW = '/tmp/raw';
const STORY_RAW = '/tmp/story-raw';

const photos = {
  'tien-bersama-murid': '2024_06_240605-Tien-Suryantini.jpg',
  'edukasi-dasar-arsip': '2024_06_240605-Edukasi-Dasar.jpg',
  'ibm-hari-pertama-2024': '2024_07_240729-IBM-01.jpg',
  'ibm-kelas-2024': '2024_07_240729-IBM-03.jpg',
  'ibm-siswa-2024': '2024_12_241011-Siswa-Indonesia-Bisa-Membaca-scaled.jpg',
  'renovasi-kelas-01': '2024_12_241203-Renovasi-Kelas-01-scaled.jpg',
  'renovasi-kelas-03': '2024_12_241203-Renovasi-Kelas-03-scaled.jpg',
  'budi-pekerti': '2024_12_IMG_6753.jpg',
  'karya-siswa': '2024_12_IMG_6754.jpg',
  'belajar-menulis': '2024_12_IMG_6755.jpg',
  'lomba-hut-ri': '2024_12_IMG_6763.jpg',
  'jbl-ke-ibm': '2024_12_240730-JBL-ke-IBM-scaled.jpg',
  'ibm-hari-pertama-2025': '2025_07_250707-IBM-1-scaled.jpg',
  'ibm-pengarahan-2025': '2025_07_250707-IBM-2.jpg',
  'perpisahan-2025': '2025_06_250607-Perpisahan-IBM-scaled.jpg',
  'pendaftaran-2025': '2025_06_250604-Pendaftaran-IBM.jpg',
  'guest-tutor-1': '2026_05_260522-Guest-Tutor-Week-1.jpg',
  'guest-tutor-2': '2026_05_260522-Guest-Tutor-Week-2.jpg',
  'guest-tutor-3': '2026_05_260522-Guest-Tutor-Week-3.jpg',
  'tanampangan-1': '2026_01_260105-TanamPangan-1-scaled.jpg',
  'tanampangan-3': '2026_01_260105-TanamPangan-3-scaled.jpg',
  'workshop-film-1': '2025_11_251027-Workshop-Film-1-scaled.jpg',
  'workshop-film-2': '2025_11_251027-Workshop-Film-2-scaled.jpg',
  'workshop-film-3': '2025_11_251027-Workshop-Film-3-scaled.jpg',
  'workshop-film-11': '2025_10_251027-Workshop-Film-11-scaled.jpg',
  'alma': '2025_07_250715-Alma-scaled.jpg',
  'rado': '2025_09_090925-Rado-scaled.jpg',
  'nazwa': '2025_09_250922-Nazwa-2.jpg',
  'class-of-2025': '2026_05_The-Class-of-2025.jpg',
  'pelepasan-2026-anak': '2026_05_260526-Foto-Bareng-47-scaled.jpg',
  'pelepasan-2026-tawa': '2026_05_260526-Foto-Bareng-31-scaled.jpg',
  'pelepasan-2026-orang-tua': '2026_05_260526-Foto-Bareng-58-scaled.jpg',
  'pelepasan-2026-bersama': '2026_05_260526-Foto-Bareng-62-scaled.jpg',
  'pelepasan-2026-panggung': '2026_05_260526-Foto-Bareng-05.jpg',
  'fik-ui': '2024_10_241014-FIK-UI-IBM-01-scaled.jpg',
  'benang-harapan': '2025_10_251003-Benang-Harapan-2-scaled.jpg',
  'impact-report-cover': '2026_05_2025-Impact-Report-Thumbnail.jpg',
  'patungan-opor': '2024_03_20240322-SISI-BAIK-PATUNGAN-OPOR1-scaled.jpg',
  'patungan-spp-info': '2024_04_20240429-PATUNGAN-SPP-1.1-scaled.jpg',
};

const brand = {
  'logo-sisi-baik': '2024_02_Logo-Sisi-Baik-FC.png',
  'logo-ibm': '2024_03_Logo-Indonesia-BIsa-Membaca-transparan.png',
  'logo-kampus-darurat': '2024_03_20240320-SISI-BAIK-LOGO-KAMPUS-DARURAT-putih.jpg',
  'mitra-jbl': '2024_07_Logo-JBL.jpg',
  'mitra-hermina': '2025_02_Hermina-Logo.png',
  'mitra-one-plate': '2025_12_One-Plate-Project-Logo-square_edit_36234005612699.jpg',
  'qris-sisi-baik': '2024_04_240422-QRIS-Sisi-Baik-Image-Logo-FC.jpg',
  'logo-ocbc': '2024_03_logo-ocbc.png',
};

const team = ['Nestor-Round', 'Tien-Round', 'Logat-Round', 'Wiwis-round', 'Deisy-round', 'Henri-round', 'Stevi-round', 'Aldo-round', 'Iqball-round'];

async function out(dir, name, src, { max = 2200, png = false } = {}) {
  fs.mkdirSync(dir, { recursive: true });
  const img = sharp(src).rotate().resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true });
  const dest = path.join(dir, `${name}.${png ? 'png' : 'jpg'}`);
  await (png ? img.png({ compressionLevel: 9 }) : img.jpeg({ quality: 84, mozjpeg: true })).toFile(dest);
  return dest;
}

for (const [name, file] of Object.entries(photos)) {
  await out(path.join(ROOT, 'src/assets/photos'), name, path.join(RAW, file));
}
for (const [name, file] of Object.entries(brand)) {
  await out(path.join(ROOT, 'src/assets/brand'), name, path.join(RAW, file), { max: 1000, png: file.endsWith('.png') });
}
for (const t of team) {
  const name = t.toLowerCase().replace('-round', '').replace('iqball', 'iqbal');
  await out(path.join(ROOT, 'src/assets/team'), name, path.join(RAW, 'team', `${t}.png`), { max: 560, png: true });
}

// Story images: two WebP widths each, plus a manifest of intrinsic sizes.
const manifest = {};
for (const slug of fs.readdirSync(STORY_RAW)) {
  const dir = path.join(ROOT, 'public/images/stories', slug);
  fs.mkdirSync(dir, { recursive: true });
  for (const file of fs.readdirSync(path.join(STORY_RAW, slug))) {
    const base = file.replace(/\.[^.]+$/, '');
    const src = path.join(STORY_RAW, slug, file);
    const meta = await sharp(src).rotate().metadata();
    const w = meta.autoOrient?.width ?? meta.width;
    const h = meta.autoOrient?.height ?? meta.height;
    for (const width of [720, 1400]) {
      await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(dir, `${base}-${width}.webp`));
    }
    manifest[`${slug}/${file}`] = { base: `/images/stories/${slug}/${base}`, width: w, height: h };
  }
}
fs.writeFileSync(path.join(ROOT, 'src/data/story-images.json'), JSON.stringify(manifest, null, 2));
console.log('done', Object.keys(manifest).length, 'story images');
