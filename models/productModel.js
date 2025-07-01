const db = require('../config/db');

const Product = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO products 
      (nama_produk, kategori, harga, gambar, detail, stok) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.nama_produk,
      data.kategori,
      data.harga,
      data.gambar,
      data.detail,
      data.stok,
    ];
    db.query(sql, values, callback);
  },

  findAll: (callback) => {
    db.query('SELECT * FROM products', callback);
  },

  findById: (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], callback);
  },

  update: (id, data, callback) => {
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) {
      return callback(null); // tidak ada yang diupdate
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const sql = `UPDATE products SET ${setClause} WHERE id = ?`;
    values.push(id);
    db.query(sql, values, callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM products WHERE id = ?', [id], callback);
  },
};

module.exports = Product;
