require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/products', productRoutes);

app.use(express.static(path.join(__dirname, 'public')));

// Tambahkan ini untuk halaman root "/"
app.get('/', (req, res) => {
  res.send(`
    <h1>Node.js server aktif 🚀</h1>
    <p>Berikut adalah beberapa endpoint yang tersedia:</p>
    <ul>
      <li><strong>POST</strong> /api/login<br/>
        Body (JSON): { "email": "admin@gmail.com", "password": "123" }
      </li>
      <li><strong>GET</strong> /api/products<br/>
        Lihat semua produk
      </li>
      <li><strong>GET</strong> /api/products/:id<br/>
        Lihat detail produk berdasarkan ID
      </li>
      <li><strong>POST</strong> /api/products<br/>
        Tambah produk baru (form-data, butuh token Bearer)
      </li>
      <li><strong>PUT</strong> /api/products/:id<br/>
        Update produk (form-data, butuh token Bearer)
      </li>
      <li><strong>DELETE</strong> /api/products/:id<br/>
        Hapus produk (butuh token Bearer)
      </li>
    </ul>
    <p>Jangan lupa login untuk mendapatkan token Bearer🙂</p>
  `);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));