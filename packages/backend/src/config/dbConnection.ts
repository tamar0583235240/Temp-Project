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
