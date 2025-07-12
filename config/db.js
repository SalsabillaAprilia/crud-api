console.log('ENV Check - Host:', process.env.DB_HOST);
console.log('ENV Check - User:', process.env.DB_USER);
console.log('ENV Check - DB:', process.env.DB_NAME);
const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

conn.connect(err => {
  if (err) throw err;
  console.log('Database connected');
});

module.exports = conn;