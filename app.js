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
  res.send('Node.js server aktif dan terhubung ke Railway!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));