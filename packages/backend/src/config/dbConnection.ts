// import dotenv from 'dotenv';
// import { createClient } from '@supabase/supabase-js';

// dotenv.config();

// const supabaseUrl = process.env.SUPABASE_URL!;
// const supabaseKey = process.env.SERVICE_ROLE_KEY!;

// console.log('SUPABASE_KEY: i am here', supabaseKey);

// export const supabase = createClient(supabaseUrl, supabaseKey);

import { Pool } from 'pg';
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
