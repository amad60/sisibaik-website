// Every fact here comes from the previous sisibaikproject.id. Items that need
// owner confirmation are listed in README.md ("Perlu ditinjau").

/** The homepage said 1983; several articles and the team page say 1993. */
export const FOUNDED_YEAR = 1983;

export const site = {
  name: 'Sisi Baik Project',
  legalName: 'Yayasan Sisi Baik Manusia',
  url: 'https://sisibaikproject.id',
  tagline:
    'Wadah kolaborasi untuk menciptakan kesetaraan pendidikan dan kesempatan meraih mimpi bagi generasi berikutnya.',
  hashtag: '#PeluangYangSama',
  email: 'halo@sisibaikproject.id',
  phoneDisplay: '0851-7976-6083',
  whatsapp: 'https://wa.me/6285179766083',
  bank: {
    name: 'OCBC',
    holder: 'Yayasan Sisi Baik Manusia',
    account: '723800010107',
  },
  store: 'https://www.tokopedia.com/tokosisibaik',
  addresses: {
    rumahBaik: {
      label: 'Rumah Baik',
      lines: [
        'Jalan Cagar Alam Selatan RT.06/RW.04 Nomor 3',
        'Kelurahan Ratu Jaya, Kecamatan Cipayung',
        'Kota Depok, Jawa Barat 16439',
      ],
      maps: 'https://www.google.com/maps/search/?api=1&query=Indonesia+Bisa+Membaca+Cagar+Alam+Selatan+Ratu+Jaya+Depok',
    },
    surat: {
      label: 'Surat Menyurat',
      lines: [
        'Gedung Wira Usaha',
        'Jalan HR Rasuna Said Kavling C5, RT.3/RW.1',
        'Karet, Setiabudi, Jakarta 12920',
      ],
    },
  },
  social: [
    { label: 'Instagram', handle: '@sisibaikproject', href: 'https://www.instagram.com/sisibaikproject' },
    { label: 'YouTube', handle: '@SisiBaikProject', href: 'https://www.youtube.com/@SisiBaikProject' },
    { label: 'TikTok', handle: '@sisibaikproject', href: 'https://www.tiktok.com/@sisibaikproject' },
    { label: 'X', handle: '@sisibaik_corp', href: 'https://www.x.com/sisibaik_corp' },
  ],
  docs: {
    impactReport: '/docs/impact-report-2024-2025.pdf',
    companyProfile: '/docs/sisi-baik-company-profile.pdf',
  },
};

export const nav = [
  { label: 'Tentang', href: '/tentang-kami/' },
  { label: 'Program', href: '/program-utama/' },
  { label: 'Cerita', href: '/stories/' },
  { label: 'Mitra', href: '/#mitra' },
  { label: 'Kontak', href: '/#kontak' },
];

/** Logos shown on the old homepage under "Mitra Kebaikan". */
export const partners = [
  {
    name: 'Jasa Berdikari Logistics',
    href: 'https://jasaberdikari.co.id/id',
    logo: 'mitra-jbl',
    note: 'Resmi menjadi Mitra Kebaikan sejak Juli 2024, mendukung kelas Indonesia Bisa Membaca dan Patungan SPP.',
  },
  {
    name: 'Rumah Sakit Hermina Group',
    href: 'https://herminahospitals.com/id',
    logo: 'mitra-hermina',
    note: 'Karyawan RS Hermina memperbaiki ruang kelas Indonesia Bisa Membaca pada Desember 2024.',
  },
  {
    name: 'One Plate Project',
    href: 'https://www.instagram.com/oneplate.project/',
    logo: 'mitra-one-plate',
    note: 'Berjalan bersama Sisi Baik Project sebagai Mitra Kebaikan.',
  },
] as const;

/** Badan Usaha Mitra Kebaikan without a logo on file (Impact Report 2024-2025). */
export const partnersTextOnly = ['Teras Tax Consulting'];

/** "Kindlaborators" listed in the Impact Report 2024-2025. */
export const collaborators = [
  'Yayasan Alusi Tao Toba',
  'Zurich',
  'Liputan6',
  'Himpunan Mahasiswa Pasca Sarjana FKM UI',
  'Lensa Anak Terminal',
  'Tanam Pangan',
  'Dok Kun Wardana',
  'One Plate Project',
  'SPEKIX',
  'Meramu Cerita',
  'Laper Mata',
  'Buku Senior',
  'Kolaboraya',
  'Sekolah Pillar',
  'Depok Untuk Semua',
  'Spectrum Warriors',
  'Depok Art District',
  'Career Fest',
  'The Local Market',
  'Trihita Alam Eco School Jakarta',
  'Wali Band',
  'Mercury Agency',
];

export const impact = {
  ibmStudents: 46,
  sppRecipients: 18,
  sppPayments: 20,
  sppTotal: 'Rp15.995.000',
  oporRecipients2024: 98,
  oporRecipients2025: 300,
  ibmYearlyCost: 'Rp40.900.000',
  goal2026: 'Rp250.000.000',
  allocation2026: [
    { pct: 50, label: 'Keberlanjutan program inti pendidikan' },
    { pct: 20, label: 'Perluasan dampak dan penguatan sistem' },
    { pct: 16, label: 'Pengembangan model replikasi Indonesia Bisa Membaca' },
    { pct: 14, label: 'Operasional pendukung dan sebagian kecil biaya SDM' },
  ],
};

export const timeline = [
  {
    year: String(FOUNDED_YEAR),
    title: 'Sebuah teras di sudut Depok',
    body: 'Ibu Tien Suryantini, seorang ibu rumah tangga, membuka teras rumahnya untuk mengajar baca, tulis, dan hitung kepada anak-anak yang tidak memiliki akses pendidikan.',
  },
  {
    year: '2005',
    title: 'Menjadi LSM Edukasi Dasar',
    body: 'Dibantu beberapa mahasiswa Universitas Indonesia, gerakan ini dilegalkan dan kemudian memiliki guru bantu serta ruang belajar sendiri.',
  },
  {
    year: '2020',
    title: 'Kelas ditutup, Sisi Baik lahir',
    body: 'Pandemi menutup Edukasi Dasar. Di saat yang sama, gerakan Beli dan Bagikan membeli 1.000 porsi dagangan dari 7 Ibu Kantin untuk pekerja di jalanan.',
  },
  {
    year: '2021',
    title: 'Patungan Imun',
    body: 'Saat gelombang Delta, 50 paket vitamin, imun booster, dan oxycan tersalurkan kepada teman-teman yang menjalani isolasi mandiri.',
  },
  {
    year: '2024',
    title: 'Edukasi Dasar lahir kembali',
    body: 'Sisi Baik bergerak penuh waktu sebagai Yayasan Sisi Baik Manusia. Kelas Bu Tien dibuka lagi dengan nama Indonesia Bisa Membaca.',
  },
  {
    year: '2025',
    title: 'Patungan SPP jadi program utama',
    body: 'Bantuan tunggakan sekolah diresmikan sebagai program utama, agar pintu pendidikan yang sudah terbuka tidak tertutup kembali.',
  },
  {
    year: '2026',
    title: 'Mengenang Ibu Tien',
    body: 'Ibu Tien berpulang. Kelasnya tetap berjalan berbekal buku tulis mengajar yang beliau susun, dan 19 siswa lulus pada Mei 2026.',
  },
];
