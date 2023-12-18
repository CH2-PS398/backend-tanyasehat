let mysql = require('mysql');

let conn = mysql.createConnection({
  host: '34.128.104.141',
  user: 'root',
  password: 'andretham123',
  database : 'db_tanyasehat'
});

conn.connect((err) => {
  if(!!err){
    console.log(err);
  } else {
    console.log('Koneksi Berhasil!');
  }
});

module.exports = conn;