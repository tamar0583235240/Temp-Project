

import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();
console.log('Database user:', process.env.PGUSER);
console.log('Database host:', process.env.PGHOST);
console.log('Database name:', process.env.PGDATABASE);
console.log('Database password:', process.env.PGPASSWORD);
console.log('Database port:', process.env.PGPORT);
const pool = new Pool({

  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
 });
console.log('Database connection pool created');
export {pool}

// import dotenv from 'dotenv';
// import { createClient } from '@supabase/supabase-js';

// dotenv.config();

// const supabaseUrl = process.env.SUPABASE_URL!;
// const supabaseKey = process.env.SERVICE_ROLE_KEY!;

// console.log('SUPABASE_KEY: i am here', supabaseKey);

// export const supabase = createClient(supabaseUrl, supabaseKey);



const { Client } = require('pg');
const client = new Client({
 host: 'localhost',
 user: 'postgres',
 password: 'your_password',
 database: 'inquiry_system',
 port: 5432,
});
client.connect();
  

//POOL
// import { Pool } from 'pg';
// export const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// }
