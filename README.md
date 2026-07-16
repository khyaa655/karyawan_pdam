# PDAM HRIS - Human Resource Information System

Sistem manajemen Sumber Daya Manusia untuk **PDAM (Perusahaan Daerah Air Minum)** — aplikasi demonstrasi untuk mengelola data karyawan, absensi, penggajian, dan pengajuan cuti.

> ⚠️ **Catatan:** Aplikasi ini adalah prototipe demonstrasi. Semua data disimpan di `localStorage` browser, bukan backend production.

---

## Fitur Utama

| Menu | Deskripsi |
|------|-----------|
| **Dashboard** | KPI cards (total karyawan, tingkat kehadiran, cuti pending), grafik tren workforce, attendance donut chart |
| **Employee Directory** | Daftar karyawan dengan filter departemen, pencarian, paginasi, dan form tambah karyawan baru |
| **Attendance Tracking** | Log kehadiran harian, grafik tren mingguan, performa per departemen, jam kerja dengan progress bar |
| **Payroll Management** | Detail penggajian bulanan, batch history, budget utilization donut, jalankan payroll baru |
| **Leave Management** | Pengajuan cuti (Annual/Sick/Maternity/Unpaid), approve/reject, leave balance overview |
| **Settings** | Profil admin, variabel kebijakan HR (UMR, overtime, medical premium), workflow automation toggles |

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 6 |
| CSS | Tailwind CSS v4 |
| Icons | Google Material Symbols (CDN) |
| Fonts | Inter (body), Playfair Display + Cormorant Garamond (headings) |
| Charts | Pure CSS/SVG (tanpa charting library) |
| State | React useState + localStorage persistence |

---

## Struktur Project

```
src/
├── main.tsx                          # Entry point
├── App.tsx                           # Main app: state, routing, modals, toast
├── types.ts                          # TypeScript interfaces
├── data.ts                           # Seed/mock data
├── index.css                         # Tailwind v4 theme config
└── components/
    ├── Sidebar.tsx                   # Navigasi kiri
    ├── Header.tsx                    # Top bar: search + notifications
    ├── DashboardTab.tsx              # Dashboard utama
    ├── DirectoryTab.tsx              # Direktori karyawan
    ├── AttendanceTab.tsx             # Tracking kehadiran
    ├── PayrollTab.tsx                # Manajemen penggajian
    ├── LeaveTab.tsx                  # Manajemen cuti
    ├── SettingsTab.tsx               # Pengaturan admin & HR
    ├── AddEmployeeModal.tsx          # Modal tambah karyawan
    ├── LeaveRequestModal.tsx         # Modal pengajuan cuti
    └── EmployeeDetailModal.tsx       # Modal detail karyawan
```

---

## Jalankan Lokal

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Jalankan development server (port 3000)
npm run dev

# Build untuk production
npm run build

# Preview build
npm run preview
```

Buka browser ke `http://localhost:3000`

---

## Scripts

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Jalankan dev server di port 3000 |
| `npm run build` | Build production ke folder `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript type-check (no emit) |
| `npm run clean` | Hapus `dist/` dan `server.js` |

---

## Data & Penyimpanan

- Semua state (karyawan, cuti, payroll, profil admin) disimpan di **localStorage** dengan key `pdam_hris_state`
- Data seed mencakup 7 karyawan contoh, 5 permintaan cuti, dan 3 batch payroll
- Refresh browser tidak menghilangkan data

---

## Departemen

| Departemen | Kode |
|------------|------|
| Field Operations | Lapangan operasional |
| Finance | Keuangan |
| IT | Teknologi Informasi |
| Public Relations | Hubungan Masyarakat |
| Water Quality | Kualitas Air |

---

## Customization

### Tema Warna
Edit palette di [src/index.css](src/index.css) — variabel Tailwind v4 `@theme` block.

### Kebijakan HR
Ubah nilai UMR, overtime multiplier, dan medical premium di menu **Settings** dalam aplikasi.

### Data Karyawan
Edit file [src/data.ts](src/data.ts) untuk menambah/mengubah data seed awal.

---

## Catatan Teknis

- Tanpa router library — navigasi pakai `useState<TabType>` di App.tsx
- Semua chart (bar, donut) murni CSS/SVG, tanpa dependency charting library
- Format mata uang: Rupiah Indonesia (`Rp`)
- UI menggunakan pendekatan editorial: warna hangat (cream/sand), font serif untuk judul, tanpa rounded corners

---

## Lisensi

Proyek demonstrasi — untuk keperluan presentasi dan pembelajaran.

---

**Dibangun dengan** React + Vite + Tailwind CSS
