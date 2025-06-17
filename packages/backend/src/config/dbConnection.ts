import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { Client } from 'pg';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SERVICE_ROLE_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

console.log('✅ Supabase client מוכן');


export const client = new Client({
  host :process.env.HOST,
  port: 5432,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

client.connect()
  .then(() => console.log('✅ PostgreSQL connect!'))
  .catch((err: any) => console.error('❌not connect PostgreSQL:', err));



// import dotenv from 'dotenv';
// import { createClient } from '@supabase/supabase-js';

// dotenv.config();

// const supabaseUrl = process.env.SUPABASE_URL!;
// const supabaseKey = process.env.SERVICE_ROLE_KEY!;

// console.log('SUPABASE_KEY: i am here', supabaseKey);

// export const supabase = createClient(supabaseUrl, supabaseKey);
