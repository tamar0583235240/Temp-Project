import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch(() => console.error('❌ Connection error'));
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// This code connects to a PostgreSQL database using the pg library.
// It creates a new client with the specified connection parameters and connects to the database.
