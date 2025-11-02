## Backend

### 1. SQL Injection pada Method `findVulnerable()`
- File: `models/userModels.js`
- Perubahan: Mengganti string interpolation dengan parameterized queries menggunakan `$1`, `$2`
- Hasil: Mencegah serangan authentication bypass

### 2. SQL Injection pada Method `findPasswordByCredentials()`
- File: `models/userModels.js`
- Perubahan: Mengganti string interpolation dengan parameterized queries
- Hasil: Mencegah serangan ekstraksi data

### 3. Menyembunyikan Detail Error
- File: `controllers/userController.js`, `controllers/flagController.js`
- Perubahan: Pesan error generik untuk client, log detail hanya di sisi server
- Hasil: Mencegah kebocoran informasi skema database

### 4. Input Validation Middleware
- File: 
  - Membuat `middleware/validation.js`
  - Memperbarui `routes/userRoutes.js`
  - Memperbarui `routes/flagRoutes.js`
- Perubahan: Menambahkan middleware express-validator untuk semua input pengguna
- Hasil: Memvalidasi dan mensanitasi semua input sebelum diproses

### 5. Rate Limiting
- File: `app.js`
- Perubahan: Menambahkan express-rate-limit dengan 5 percobaan untuk endpoint auth, 100 untuk endpoint lainnya
- Hasil: Mencegah serangan brute force dan penyalahgunaan API

### 6. Security Headers dengan Helmet
- File: `app.js`
- Perubahan: Menambahkan middleware helmet dengan CSP, HSTS, dan security headers lainnya
- Hasil: Mencegah serangan XSS, clickjacking, dan lainnya

---

## Frontend

### 7. Client-Side Input Validation
- File:
  - Membuat `src/utils/validation.js`
  - Memperbarui `src/LoginPage.jsx`
  - Memperbarui `src/CheckPassword.jsx`
  - Memperbarui `src/ValidatePage.jsx`
- Perubahan: Menambahkan validasi dan sanitasi sebelum pemanggilan API
- Hasil: Pertahanan lapis pertama terhadap input berbahaya

### 8. Menyembunyikan Data Sensitif
- File: `src/LoginPage.jsx`, `src/CheckPassword.jsx`
- Perubahan: 
  - Menghapus enumerasi multiple users
  - Menghapus pengungkapan username/password pada pesan sukses
  - Hanya mengizinkan single user authentication
- Hasil: Mencegah kebocoran informasi dari percobaan SQL injection

### 9. Secure Error Handling pada API Calls
- File: 
  - `src/actions/auth.js`
  - `src/actions/usersActions.js`
  - `src/actions/flagActions.js`
- Perubahan: Menstandarisasi response error tanpa mengekspos detail server
- Hasil: Penanganan error yang konsisten dan aman

### 10. Menghapus Statement Console.log()
- File: `src/CheckPassword.jsx`, `src/ValidatePage.jsx`
- Perubahan: Menghapus statement console.log yang membocorkan data sensitif
- Hasil: Mencegah kebocoran informasi debug di browser console

### 11. Content Security Policy
- File: `frontend-kemjar7/index.html`
- Perubahan: Menambahkan meta tag CSP untuk membatasi pemuatan resource
- Hasil: Mencegah serangan XSS dan pemuatan resource yang tidak sah

## Tes Peningkatan Keamanan

### Pengujian Pencegahan SQL Injection:
Sebelum perbaikan, input berikut dapat mem-bypass autentikasi:
- `' OR '1'='1`
- `admin' --`
- `' OR 1=1--`

Sekarang: Semua percobaan ini diblokir oleh parameterized queries dan validasi input.

### Pengujian Rate Limiting:
- Coba lebih dari 5 percobaan login dalam 15 menit
- Diharapkan: "Too many login attempts, please try again later"

### Pengujian Input Validation:
Coba username yang tidak valid:
- Kurang dari 3 karakter: `ab`
- Karakter khusus: `user<script>`
- Diharapkan: "Username must be 3-50 alphanumeric characters"

### Pengujian Error Messages:
- Paksa terjadi database error
- Diharapkan: Pesan generik "An error occurred" (bukan stack trace detail)
