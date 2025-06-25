import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
console.log('Database user:', process.env.PGUSER);
console.log('Database host:', process.env.PGHOST);
console.log('Database name:', process.env.PGDATABASE);
console.log('Database password:', process.env.PGPASSWORD);
console.log('Database port:', process.env.PGPORT);
const pool = new Pool({

  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  
  port: Number(process.env.DB_PORT),
 });
console.log('Database connection pool created');
export {pool}