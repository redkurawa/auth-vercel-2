# Auth Vercel - Google OAuth Authentication App

Aplikasi autentikasi Google OAuth yang dapat dijalankan di localhost maupun di-deploy ke Vercel. Aplikasi ini memiliki fitur toggle CSS untuk beralih antara tampilan basic dan modern.

## 📋 Deskripsi

Aplikasi ini adalah sistem autentikasi sederhana menggunakan Google OAuth 2.0. Pengguna dapat login dengan akun Google mereka dan melihat profil mereka setelah berhasil login. Aplikasi ini dibangun dengan:

- **Express.js** - Framework web Node.js
- **Passport.js** - Middleware autentikasi
- **Google OAuth 2.0** - Strategi autentikasi
- **Express Session** - Manajemen session

### Fitur Utama

- ✅ Login dengan Google OAuth 2.0
- ✅ Toggle CSS (Basic ↔ Modern)
- ✅ Responsive design
- ✅ Kompatibel dengan localhost dan Vercel
- ✅ Session management

---

## 🚀 Cara Deploy

### 4.b.1. Deploy di Localhost

#### Prasyarat

- Node.js (v14 atau lebih baru)
- NPM atau Yarn
- Akun Google Cloud Platform

#### Langkah-langkah

1. **Clone atau download project ini**

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Buat file `.env`**

   Copy file `.env.sample` menjadi `.env`:

   ```bash
   copy .env.sample .env
   ```

4. **Setup Google OAuth Credentials**

   a. Buka [Google Cloud Console](https://console.cloud.google.com/)

   b. Buat project baru atau pilih project yang ada

   c. Buka **APIs & Services** → **Credentials**

   d. Klik **Create Credentials** → **OAuth 2.0 Client ID**

   e. Pilih **Web application**

   f. Tambahkan Authorized redirect URI:

   ```
   http://localhost:3000/auth/google/callback
   ```

   g. Copy **Client ID** dan **Client Secret**

5. **Edit file `.env`**

   ```env
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   BASE_URL=http://localhost:3000
   ```

6. **Jalankan aplikasi**

   ```bash
   npm start
   ```

7. **Buka browser**
   ```
   http://localhost:3000
   ```

---

### 4.b.2. Deploy ke Vercel

#### Prasyarat

- Akun [Vercel](https://vercel.com)
- Repository GitHub/GitLab/Bitbucket

#### Langkah-langkah

1. **Push project ke repository Git**

2. **Login ke Vercel**

   Buka [vercel.com](https://vercel.com) dan login

3. **Import project**
   - Klik **New Project**
   - Pilih repository project ini
   - Klik **Import**

4. **Konfigurasi Environment Variables**

   Di halaman konfigurasi, tambahkan environment variables:

   | Name                   | Value                                     |
   | ---------------------- | ----------------------------------------- |
   | `GOOGLE_CLIENT_ID`     | your-client-id.apps.googleusercontent.com |
   | `GOOGLE_CLIENT_SECRET` | your-client-secret                        |
   | `BASE_URL`             | https://your-app-name.vercel.app          |

5. **Update Google OAuth Redirect URI**

   Di Google Cloud Console, tambahkan redirect URI baru:

   ```
   https://your-app-name.vercel.app/auth/google/callback
   ```

6. **Deploy**

   Klik **Deploy** dan tunggu proses selesai

7. **Akses aplikasi**

   Buka URL yang diberikan Vercel (contoh: `https://your-app-name.vercel.app`)

---

## 📖 Cara Pakai Aplikasi

### 1. Halaman Login

Saat pertama kali membuka aplikasi, Anda akan melihat:

- Tombol **"use CSS"** di kiri atas (untuk toggle tampilan)
- Pesan "Welcome"
- Tombol **"Login with Google"**

### 2. Login dengan Google

1. Klik tombol **"Login with Google"**
2. Anda akan diarahkan ke halaman login Google
3. Pilih akun Google Anda
4. Berikan izin jika diminta
5. Anda akan diarahkan kembali ke halaman profil

### 3. Halaman Profil

Setelah berhasil login, Anda akan melihat:

- Nama display Google Anda
- Tombol **"Logout"**

### 4. Toggle CSS

Aplikasi memiliki dua mode tampilan:

| Mode                | Deskripsi                                            |
| ------------------- | ---------------------------------------------------- |
| **Basic (Default)** | Tampilan sederhana tanpa gradient dan animasi        |
| **Modern**          | Tampilan modern dengan gradient, shadow, dan animasi |

**Cara toggle:**

- Klik tombol **"use CSS"** di kiri atas
- Saat aktif, tombol akan berubah menjadi **"use CSS ✓"**
- Preferensi disimpan di session

### 5. Logout

1. Klik tombol **"Logout"**
2. Anda akan diarahkan kembali ke halaman login
3. Session akan dihapus

---

## 📁 Struktur Project

```
auth-vercel-2/
├── api/
│   └── index.js        # Main application file
├── public/
│   ├── feature.html    # Tutorial halaman DOM & Google Auth
│   └── styles.css     # CSS styles
├── .env                # Environment variables (tidak di-commit)
├── .env.sample         # Sample environment variables
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies
├── vercel.json         # Vercel configuration
└── README.md           # Documentation
```

---

## 📚 Halaman Fitur (feature.html)

Aplikasi ini juga menyertakan halaman tutorial yang menjelaskan konsep DOM (Document Object Model) dan cara mengintegrasikannya dengan Google Auth. Halaman ini tersedia di `/feature.html`.

### Apa yang Dipelajari:

- **Apa itu DOM?** - Memahami Document Object Model sebagai antarmuka pemrograman untuk dokumen web
- **Mengapa DOM dengan Google Auth?** - Cara membuat UI dinamis berdasarkan status autentikasi
- **Contoh Kode** - Praktis memanipulasi DOM berdasarkan status login
- **Konsep Utama** - getElementById, element.style, textContent, addEventListener, classList.toggle

### Cara Mengakses:

Buka `/feature.html` di browser Anda untuk melihat tutorial.

---

## ⚙️ Environment Variables

| Variable               | Deskripsi                               | Contoh                                                |
| ---------------------- | --------------------------------------- | ----------------------------------------------------- |
| `GOOGLE_CLIENT_ID`     | Client ID dari Google Cloud Console     | `xxx.apps.googleusercontent.com`                      |
| `GOOGLE_CLIENT_SECRET` | Client Secret dari Google Cloud Console | `GOCSPX-xxx`                                          |
| `BASE_URL`             | URL dasar aplikasi                      | `http://localhost:3000` atau `https://xxx.vercel.app` |
| `SESSION_SECRET`       | Secret untuk session (opsional)         | `random_string`                                       |

---

## 🔧 Troubleshooting

### Error: "OAuth2Strategy requires a clientID option"

- Pastikan file `.env` ada dan berisi `GOOGLE_CLIENT_ID` yang valid

### Error: "redirect_uri_mismatch"

- Pastikan redirect URI di Google Cloud Console sama persis dengan `BASE_URL/auth/google/callback`

### Session tidak tersimpan

- Pastikan `SESSION_SECRET` sudah dikonfigurasi
- Di Vercel, pastikan environment variables sudah diset

### CSS tidak berubah

- Pastikan browser mendukung CSS modern
- Coba clear cache browser

---

## 📄 License

ISC
