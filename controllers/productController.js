const Product = require('../models/productModel');
const fs = require('fs');
const path = require('path');

//CREATE produk
exports.create = (req, res) => {
  const { nama_produk, kategori, harga, detail, stok } = req.body;
  const gambar = req.file ? req.file.filename : null;

  const newProduct = { nama_produk, kategori, harga, gambar, detail, stok };

  Product.create(newProduct, (err) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({
      message: 'Product created',
      product: {
        ...newProduct,
        gambar: gambar ? `https://crud-api-production-1baf.up.railway.app/uploads/${gambar}` : null,
      },
    });
  });
};

//GET semua produk
exports.getAll = (req, res) => {
  Product.findAll((err, products) => {
    if (err) return res.status(500).json(err);

    // Tambahkan URL gambar
    const updated = products.map((p) => ({
      ...p,
      gambar: p.gambar ? `https://crud-api-production-1baf.up.railway.app/uploads/${p.gambar}` : null,
    }));

    res.json(updated);
  });
};

//GET produk berdasarkan ID
exports.getOne = (req, res) => {
  Product.findById(req.params.id, (err, products) => {
    if (err || products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = products[0];
    product.gambar = product.gambar
      ? `https://crud-api-production-1baf.up.railway.app/uploads/${product.gambar}`
      : null;

    res.json(product);
  });
};

//UPDATE produk
  exports.update = (req, res) => {
  const id = req.params.id;
  const allowedFields = ['nama_produk', 'kategori', 'harga', 'detail', 'stok'];
  const updateData = {};

  // Ambil data yang dikirim aja
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  });

  // Tangani file gambar baru
  if (req.file) {
    updateData.gambar = req.file.filename;

    // Hapus gambar lama
    Product.findById(id, (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) return res.status(404).json({ message: 'Produk tidak ditemukan' });

      const oldImage = results[0].gambar;
      if (oldImage) {
        const filePath = path.join(__dirname, '..', 'public', 'uploads', oldImage);
        fs.unlink(filePath, (err) => {
          if (err) console.warn('Gagal hapus gambar lama:', err.message);
        });
      }

      // Lanjut update
      Product.update(id, updateData, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Produk berhasil diperbarui' });
      });
    });

  } else {
    // Kalau gak upload gambar, langsung update
    Product.update(id, updateData, (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Produk berhasil diperbarui' });
    });
  }
};

//DELETE produk
exports.remove = (req, res) => {
  const id = req.params.id;

  Product.findById(id, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0)
      return res.status(404).json({ message: 'Product not found' });

    const gambar = results[0].gambar;

    Product.delete(id, (err) => {
      if (err) return res.status(500).json(err);

      // Hapus file gambar dari uploads/
      if (gambar) {
        const filePath = path.join(__dirname, '..', 'public', 'uploads', gambar);
        fs.unlink(filePath, (err) => {
          if (err) console.warn('Gagal hapus gambar produk:', err.message);
        });
      }

      res.json({ message: 'Product deleted successfully' });
    });
  });
};
