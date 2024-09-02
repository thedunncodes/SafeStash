import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

});

client.connect((err) => {
  if (err) {
    console.error('Connection Error', err.stack);
  } else {
    console.log('Connected');
  }
});

module.exports = client;
