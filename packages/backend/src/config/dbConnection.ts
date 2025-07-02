import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();
console.log('Database user:', process.env.DB_USER);
console.log('Database host:', process.env.DB_HOST);
console.log('Database name:', process.env.DB_NAME);
console.log('Database password:', process.env.DB_PASSWORD);
console.log('Type:', typeof process.env.DB_PASSWORD);

console.log('Database port:', process.env.DB_PORT);
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
 });
console.log('Database connection pool created');
export {pool}


