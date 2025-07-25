# 🎓 Educourse – Platform Pembelajaran Online

Educourse adalah aplikasi pembelajaran online berbasis Next.js dengan sistem otentikasi NextAuth.js, dilengkapi halaman publik, dashboard pengguna, dan panel admin. Aplikasi ini memisahkan pengalaman pengguna biasa dan admin, serta menampilkan informasi dan kontrol berbasis peran (role-based access).

---

## ✅ Fitur yang Telah Diimplementasikan

### 1. Otentikasi dengan NextAuth.js
- Menggunakan **CredentialsProvider** (email & password)
- Konfigurasi ada di: `src/lib/auth.ts`
- Mendukung login dan logout dengan `signIn()` & `signOut()`

### 2. Middleware Proteksi
- Middleware Next.js melindungi semua halaman di bawah `/dashboard/:path*`
- Redirect otomatis ke halaman login jika belum terautentikasi
- File: `src/middleware.ts`

### 3. Halaman Otentikasi
- **Login**: `src/app/login/page.tsx`
  - Form login validasi lengkap
  - Menggunakan `signIn()` dari NextAuth
- **Register**: `src/app/register/page.tsx`
  - Validasi form untuk email, nama, dan password

### 4. Halaman Publik & Proteksi
- **Landing Page** (Publik): `src/app/page.tsx`
  - Menampilkan katalog kursus, harga, testimoni
- **Dashboard Page** (Terproteksi): `src/app/dashboard/page.tsx`
  - Hanya bisa diakses jika user login
  - Menampilkan data kursus yang diikuti & progress

### 5. Informasi User
- Menampilkan `Welcome back, {session.user?.name || session.user?.email}!` di dashboard
- Komponen `UserInfo.tsx` menampilkan informasi pengguna secara rinci

### 6. Fungsi Login & Logout
- Login: `signIn()` pada halaman login
- Logout: Menggunakan `signOut()` (bisa dari header/nav/dashboard)

---

## 👑 Fitur Admin

### Akun Admin Default
- **Email**: `admin@courseapp.com`
- **Password**: `admin123`
- **Role**: `admin`

### Fitur Khusus Admin:
1. **Navigasi Admin**
   - Tampilan navbar berbeda untuk admin
   - Akses cepat ke fungsi admin dari landing page dan dashboard

2. **Dashboard Admin**
   - Panel admin terpisah
   - Manajemen user dan kursus
   - Statistik platform & analitik
   - Aktivitas terkini

3. **Profil Admin**
   - Tab admin khusus di halaman profil
   - Statistik & akses cepat ke fitur penting

4. **Indikator Visual**
   - Elemen bertema merah untuk admin
   - Badge/label admin
   - Layout dashboard berbeda untuk admin

---

## 🚀 Cara Menggunakan Aplikasi

### Untuk Pengguna Biasa
1. Buka `/register` untuk membuat akun baru
2. Login di `/login` menggunakan email & password
3. Akses halaman `/dashboard` setelah login

### Untuk Admin
1. Login dengan:
   - **Email**: `admin@courseapp.com`
   - **Password**: `admin123`
2. Setelah login:
   - Navigasi admin muncul di landing page dan dashboard
   - Gunakan navbar untuk berpindah antara fungsi admin (manajemen user, kursus, statistik)

---

## 📁 Struktur File Penting

src/
├── app/
│ ├── page.tsx # Landing Page (public)
│ ├── login/page.tsx # Halaman Login
│ ├── register/page.tsx # Halaman Registrasi
│ └── dashboard/page.tsx # Dashboard User (protected)
├── components/
│ └── UserInfo.tsx # Komponen detail user
├── lib/
│ └── auth.ts # Konfigurasi NextAuth
├── middleware.ts # Middleware proteksi route


---

## 🧑‍💻 Teknologi yang Digunakan

- **Next.js 14+ (App Router)**
- **TypeScript**
- **NextAuth.js** – otentikasi
- **Tailwind CSS** – styling
- **Middleware Auth** – proteksi akses
- **Role-based Access Control**

--
