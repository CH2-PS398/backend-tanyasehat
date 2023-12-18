let mysql = require('mysql');
require('dotenv').config();

let conn = mysql.createConnection({
  host: '34.101.172.111',
  user: 'root',
  password: 'nusalingo2023',
  database : 'db_nusalingo'
});

conn.connect((err) => {
  if(!!err){
    console.log(err);
  } else {
    console.log('Koneksi Berhasil!');
  }
});

module.exports = conn;