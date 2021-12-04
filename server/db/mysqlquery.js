const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'url',
  user: 'user',
  password: 'password',
  database: 'db'
});

module.exports = {
  query: (text, params) => {
    return new Promise((resolve, reject) => {
      pool.query(text, params, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results)
      })
    })
  }
}