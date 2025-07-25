# CRUD API - UAS Pemrograman Web 3
Sistem Backend CRUD berbasis REST API untuk manajemen produk skincare, dengan integrasi Cloudinary untuk upload gambar.


## Teknologi: 
- Node.js
- Express.js
- MySQL
- JWT
- Cloudinary


## Fitur
- Register dan Login user
- Validasi token JWT pada endpoint terproteksi
- Create, Read, Update, Delete data produk
- Upload gambar produk ke Cloudinary
- Kategori produk menggunakan enum (Facial Wash, Toner, Moisturizer, Serum, Sunscreen)


## Cara Menjalankan (Local)
1. Clone repository
2. Install dependency `npm install`
3. Buat file `.env` (lihat file `.env.example`)
4. Buat database baru di phpMyAdmin dengan nama crud_api_uas, lalu jalankan query berikut untuk membuat tabelnya:

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(255),
  photo VARCHAR(255)
);

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama_produk VARCHAR(100),
  kategori ENUM('Facial Wash','Toner','Moisturizer','Serum','Sunscreen'),
  harga INT,
  gambar VARCHAR(255),
  detail TEXT,
  stok INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

5. Jalankan server `node app.js`
6. Akses API melalui Postman di:
   (http://localhost:3000/api/products)
