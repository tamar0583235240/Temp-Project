<<<<<<< HEAD
// src/config/pgClient.ts

import dotenv from 'dotenv';
import { Pool } from 'pg';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

// הגדרת חיבור PostgreSQL
export const pool = new Pool({
  host: process.env.DB_HOST || process.env.PGHOST,
  port: Number(process.env.DB_PORT || process.env.PGPORT),
  user: process.env.DB_USER || process.env.PGUSER,
  password: process.env.DB_PASSWORD || process.env.PGPASSWORD,
  database: process.env.DB_NAME || process.env.PGDATABASE,
});

// בדיקת חיבור ל-PostgreSQL
async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Connected to PostgreSQL at:', res.rows[0].now);
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error);
  }
}

testConnection();

// הגדרת חיבור Supabase
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
console.log('✅ Supabase client created');
=======
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log('Database user:', process.env.DB_USER);
console.log('Database host:', process.env.DB_HOST);
console.log('Database name:', process.env.DB_NAME);
console.log('Database password:', process.env.DB_PASSWORD);
console.log('Database port:', process.env.DB_PORT);

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

if (process.env.JEST_WORKER_ID === undefined) {
  pool.connect()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch(() => console.error('❌ Connection error'));
}
>>>>>>> Activity-Monitoring
