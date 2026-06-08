# FPSBD
# Panduan Kolaborasi Proyek FPSBD

## 1. Clone Repository


```bash
git clone https://github.com/rafipramudya7/FPSBD.git
cd FPSBD
```

---

## 2. Ambil Perubahan Terbaru

Sebelum mulai bekerja, selalu sinkronkan branch utama:

```bash
git checkout main
git pull origin main
```

---

## 3. Buat Branch Baru

Jangan bekerja langsung di branch `main`.

Buat branch sesuai tugas yang dikerjakan:

```bash
git checkout -b fitur-login
```

Contoh nama branch:

* fitur-login
* fitur-dashboard
* fitur-database
* fitur-report
* fix-validasi

---

## 4. Kerjakan Tugas

Lakukan perubahan kode sesuai tugas masing-masing.

Cek status perubahan:

```bash
git status
```

---

## 5. Commit Perubahan

Tambahkan file yang berubah:

```bash
git add .
```

Buat commit:

```bash
git commit -m "feat: menambahkan halaman login"
```

Format commit yang digunakan:

* feat: fitur baru
* fix: perbaikan bug
* docs: dokumentasi
* style: perubahan tampilan
* refactor: perapian kode

Contoh:

```bash
git commit -m "feat: CRUD mahasiswa"
git commit -m "fix: validasi password"
git commit -m "docs: menambahkan ERD"
```

---

## 6. Push Branch

Push branch ke GitHub:

```bash
git push origin fitur-login
```

Ganti `fitur-login` sesuai nama branch yang digunakan.

---

## 7. Buat Pull Request

Setelah pekerjaan selesai:

1. Buka repository di GitHub.
2. Pilih branch yang telah di-push.
3. Klik **Compare & Pull Request**.
4. Tambahkan deskripsi perubahan.
5. Klik **Create Pull Request**.

---

## 8. Aturan Tim

* Jangan commit langsung ke `main`.
* Selalu `git pull` sebelum mulai bekerja.
* Gunakan branch terpisah untuk setiap fitur.
* Gunakan pesan commit yang jelas.
* Lakukan push ke branch masing-masing.
* Semua perubahan ke `main` harus melalui Pull Request.
* Branch `main` hanya digunakan untuk kode yang sudah stabil.

## Alur Kerja

```text
main
 ├── fitur-login
 ├── fitur-dashboard
 ├── fitur-database
 └── fitur-report

Branch -> Commit -> Push -> Pull Request -> Merge ke main
```
# FPSBD - Catering Management System

Aplikasi manajemen catering berbasis web menggunakan Node.js, Express, dan MySQL.

## Cara Setup

### 1. Clone / Download project ini

### 2. Install dependencies
```bash
npm install
```

### 3. Setup database
Buka MySQL, lalu jalankan:
```bash
mysql -u root -p < database/schema.sql
```
Atau buka file `database/schema.sql` di phpMyAdmin dan jalankan.

### 4. Buat file `.env`
Copy dari contoh:
```bash
cp .env.example .env
```
Lalu isi sesuai konfigurasi MySQL kamu:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password_mysql_kamu
DB_NAME=catering_db
```

### 5. Jalankan aplikasi
```bash
# Mode production
npm start

# Mode development (auto-restart)
npm run dev
```

Buka browser ke: **http://localhost:3000**

## Struktur Project
```
├── app.js                  # Entry point
├── database/
│   ├── db.js               # Koneksi MySQL
│   └── schema.sql          # Setup database (jalankan sekali)
├── controllers/            # Logic bisnis
├── routes/                 # Routing URL
├── views/                  # Template EJS
├── public/                 # Static files (CSS, JS, gambar)
├── .env.example            # Contoh konfigurasi environment
└── package.json            # Daftar dependency
```

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (mysql2)
- **Template Engine**: EJS
- **ORM**: Raw SQL dengan mysql2/promise