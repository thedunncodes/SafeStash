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
// use int not serial for user_id
async function createTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_profile (
      user_id SERIAL PRIMARY KEY,
      last_name VARCHAR(30),
      given_name VARCHAR(80),
      date_of_birth VARCHAR(15),
      country VARCHAR(80),
      country_code VARCHAR(10),
      occupation VARCHAR(200),
      tags TEXT[],
      phone_number VARCHAR(22) UNIQUE,
      email VARCHAR(30) UNIQUE,
      password VARCHAR(40)
      );
    CREATE TABLE IF NOT EXISTS accounts (
      account_id SERIAL PRIMARY KEY,
      user_id INT REFERENCES user_profile (user_id),
      balance DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
      currency VARCHAR(3) NOT NULL,
      user_did VARCHAR(60) NOT NULL UNIQUE,
      user_VC TEXT[],
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS transactions (
      transaction_id SERIAL PRIMARY KEY,
      account_id INT REFERENCES accounts(account_id),
      amount DECIMAL(12, 2) NOT NULL,
      transaction_type VARCHAR(10) NOT NULL, -- 'credit' or 'debit'
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `);

  console.log('Database tables Created');
}

createTables();

module.exports = pool;
