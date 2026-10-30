# Moo Coffee

Website profil kedai kopi **Moo Coffee**, Jl. Perdana No.24, Kesawan, Kota Medan.

> Identitas lokasi mengacu pada Google Maps: https://maps.app.goo.gl/HL5GvNvqnvssWr1v7

## Tentang
Landing page satu halaman untuk Moo Coffee di Kota Medan: memperkenalkan tempat, menu, promo, dan informasi lokasi. Nama dan alamat sudah disesuaikan dengan Google Maps; gambar belum diganti.

## Teknologi
- [React 19](https://react.dev) + [Vite 8](https://vite.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- JavaScript (ES modules)

## Section
Navbar · Hero · Tentang Kami · Menu Coffee Shop · Promo Hari Ini · Hubungi Kami · Footer

## Fitur
- **Filter kategori menu** — tombol All / Coffee / Non-Coffee / Snack menampilkan-menyembunyikan menu (20 produk)
- **Modal promo** — tombol "Lihat Promo" menampilkan detail promo beserta syarat & ketentuan
- **Chatbot** — widget di pojok kanan bawah untuk bertanya tentang menu, promo, lokasi, dan jam buka
- **Validasi form** — form "Hubungi Kami" memeriksa seluruh field terisi dan format email
- **Animasi** — scroll-reveal pada section, hover pada card, indikator buka/tutup toko yang diperbarui tiap menit
- **Responsif** — layout menyesuaikan desktop dan smartphone

## Menjalankan secara lokal
```bash
npm install
npm run dev      # server pengembangan
npm run build    # build produksi
npm run preview  # pratinjau hasil build
```

## Konfigurasi chatbot
Widget chat tersedia di pojok kanan bawah. Endpoint `api/chat.js` mengirim pertanyaan ke provider AI yang menggunakan format Chat Completions. Data jawaban website ada di `src/data/chatbot-knowledge.json`.

Atur environment variable berikut di dashboard hosting (misalnya Vercel):
- `AI_API_KEY` — API key provider; simpan sebagai secret di hosting, jangan masukkan ke frontend atau commit ke Git.
- `AI_MODEL` — nama model yang tersedia di provider.
- `AI_API_URL` — opsional, base URL provider atau URL Chat Completions lengkap. Untuk Groq, gunakan `https://api.groq.com/openai/v1/chat/completions`; jangan gunakan endpoint `/models` karena itu hanya untuk daftar model. Jika memakai base URL `https://api.groq.com/openai/v1`, `/chat/completions` akan ditambahkan otomatis.

`.env.example` berisi contoh konfigurasi Groq. Untuk pengembangan lokal, salin menjadi `.env.local`, isi `AI_API_KEY` dengan secret milik Anda, lalu jalankan `npm run dev`; Vite menyediakan endpoint lokal `/api/chat`. Untuk produksi di Vercel, tambahkan variabel yang sama di dashboard hosting, lalu deploy ulang. Batasi penggunaan endpoint dengan rate limit sebelum membuka chatbot ke trafik publik untuk mengendalikan penyalahgunaan dan biaya API.

Jika chatbot menampilkan HTTP 401, Groq menolak API key yang diterima server. Pastikan key aktif dari Groq Console. Setelah mengubah `.env.local`, hentikan lalu jalankan kembali server lokal; perubahan file tidak otomatis dimuat oleh server yang sudah berjalan. Pada deployment, `.env.local` tidak digunakan: perbarui `AI_API_KEY` di environment hosting (misalnya Vercel) dan deploy ulang.

## Struktur
```
src/
├── App.jsx          # komposisi halaman + animasi scroll-reveal
├── App.css          # gaya kustom
├── index.css        # Tailwind
├── data/            # data pengetahuan chatbot
└── components/      # Navbar, Hero, About, Menu, Promo, Contact, Footer, ChatWidget
api/
└── chat.js          # endpoint serverless untuk provider AI
```

## Tim
Proyek dikerjakan secara tim. Kontribusi terlihat di [riwayat commit](https://github.com/axelmychro/kopi-ruang-kita/commits/main).
