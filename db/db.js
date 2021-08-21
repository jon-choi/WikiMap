
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,  // labber
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: 8080
});

pool.connect(() => {
  console.log("connected to database");
})

module.exports = pool;
