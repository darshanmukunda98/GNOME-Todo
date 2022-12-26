const { Pool } = require('pg');
const dotenv = require('dotenv');
//rename folder name to model
//and add query funcs
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
console.log('DB_URL ' + process.env.DATABASE_URL);

pool.on('connect', () => {
  console.log('DATABASE CONNECTION SUCCESSFUL!!');
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
