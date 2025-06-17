import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'diversitech_local',
  password: process.env.PGPASSWORD || '',
  port: Number(process.env.PGPORT) || 5432,
});

export default pool;

// import dotenv from 'dotenv';
// import { createClient } from '@supabase/supabase-js';

// dotenv.config();

// const supabaseUrl = process.env.SUPABASE_URL!;
// const supabaseKey = process.env.SERVICE_ROLE_KEY!;

// console.log('SUPABASE_KEY: i am here', supabaseKey);

// export const supabase = createClient(supabaseUrl, supabaseKey);

