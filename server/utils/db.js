import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

});

async function createTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS account(
      account_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      first_name VARCHAR(30),
      given_names VARCHAR(80),
      phone_number VARCHAR(22),
      email VARCHAR(30)
      );
    `);

  console.log('Database tables setup');
}

createTables();

module.exports = pool;
