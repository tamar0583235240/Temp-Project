<<<<<<< HEAD
// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();
// console.log('Database user:', process.env.PGUSER);
// console.log('Database host:', process.env.PGHOST);
// console.log('Database name:', process.env.PGDATABASE);
// console.log('Database password:', process.env.PGPASSWORD);
// console.log('Database port:', process.env.PGPORT);
// const pool = new Pool({

//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: Number(process.env.PGPORT),
//  });
// console.log('Database connection pool created');
// export {pool}



import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';


export const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
 });
console.log('Database connection pool created');
=======
// import dotenv from 'dotenv';
// import { createClient } from '@supabase/supabase-js';

// import dotenv from 'dotenv';
// dotenv.config();

// const supabaseUrl = process.env.SUPABASE_URL!;
// const supabaseKey = process.env.SERVICE_ROLE_KEY!;

// console.log('SUPABASE_KEY: i am here', supabaseKey);
// console.log('SUPABASE_URL: i am here', supabaseUrl);

// export const supabase = createClient(supabaseUrl, supabaseKey);

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
>>>>>>> b9cae16 (AI Insights)
