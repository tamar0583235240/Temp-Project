<<<<<<< HEAD
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
=======

import { Pool } from 'pg';
import * as dotenv from 'dotenv';

>>>>>>> 2f0e705e1e27093cce53f3becacef4f2ce6d8bd1
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


