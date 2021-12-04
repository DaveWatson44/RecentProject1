const { Pool } = require('pg')

const connectionString = 'url'
const pool = new Pool({
    connectionString: connectionString,
})

module.exports = {
  query: (text, callback) => {
    return pool.query(text, callback)
  },
}