const Product = require('../models/productModel');
const { cloudinary } = require('../config/cloudinary');

//CREATE produk
exports.create = (req, res) => {
  const { nama_produk, kategori, harga, detail, stok } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'Gambar produk wajib diunggah' });
  }

  const gambar = file.path; // Cloudinary akan otomatis isi path-nya

  const newProduct = { nama_produk, kategori, harga, gambar, detail, stok };

  Product.create(newProduct, (err) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({
      message: 'Product created',
      product: newProduct,
    });
  });
};


//GET semua produk
exports.getAll = (req, res) => {
  Product.findAll((err, products) => {
    if (err) return res.status(500).json(err);
    res.json(products);
  });
};

//GET produk berdasarkan ID
exports.getOne = (req, res) => {
  Product.findById(req.params.id, (err, products) => {
    if (err || products.length === 0) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
    res.json(products[0]);
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
  const file = req.file;
  if (file) {
    updateData.gambar = file.path;

    // Hapus gambar lama
    Product.findById(id, (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) return res.status(404).json({ message: 'Produk tidak ditemukan' });

      const oldImage = results[0].gambar;
      if (oldImage) {
        const publicId = oldImage.split('/').pop().split('.')[0]; // ambil ID dari URL
        cloudinary.uploader.destroy(publicId, (error, result) => {
          if (error) console.warn('Gagal hapus Cloudinary:', error.message);
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
      return res.status(404).json({ message: 'Produk tidak ditemukan' });

    const gambar = results[0].gambar;

    Product.delete(id, (err) => {
      if (err) return res.status(500).json(err);

      // Hapus gambar di Cloudinary
      if (gambar) {
        const publicId = gambar.split('/').pop().split('.')[0];
        cloudinary.uploader.destroy(publicId, (error, result) => {
          if (error) console.warn('Gagal hapus Cloudinary:', error.message);
        });
      }

      res.json({ message: 'Product deleted successfully' });
    });
  });
};
