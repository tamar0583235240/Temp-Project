import { Pool } from 'pg';
import dotenv from 'dotenv';
<<<<<<< HEAD
import { createClient } from '@supabase/supabase-js';

dotenv.config();

console.log('Database user:', process.env.DB_USER);
console.log('Database host:', process.env.DB_HOST);
console.log('Database name:', process.env.DB_NAME);
console.log('Database password:', process.env.DB_PASSWORD);
console.log('Database port:', process.env.DB_PORT);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

console.log('Database connection pool created');
export { pool };

=======
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
>>>>>>> newTaskG4
