const mysql = require('mysql');
const pool  = mysql.createPool({
  connectionLimit : 10,
  host     : 'url',
  user     : 'user',
  password : 'password',
  database : 'db'
});

module.exports = {
    query: (text, callback) => {
        return pool.query(text, callback)
    }
}