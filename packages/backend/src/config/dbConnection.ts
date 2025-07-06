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



// import { Pool } from 'pg';
// import dotenv from 'dotenv';
// dotenv.config();
// import { createClient } from '@supabase/supabase-js';


// export const pool = new Pool({
//   host: process.env.PGHOST,
//   port: Number(process.env.PGPORT),
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   database: process.env.PGDATABASE,
//  });
// console.log('Database connection pool created');


import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// ✅ הדפסת בדיקות תקינות מסודרת
console.log('🔧 Connecting to PostgreSQL...');
console.log('📌 Host:', process.env.DB_HOST);
console.log('📌 Port:', process.env.DB_PORT);
console.log('📌 Database:', process.env.DB_NAME);
console.log('📌 User:', process.env.DB_USER);
console.log('📌 Password:', process.env.DB_PASSWORD ? '****' : 'NOT SET');

// 🔴 בדיקה – ודאי שכל משתני הסביבה מוגדרים
const requiredVars = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
requiredVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
});

// ✅ יצירת ה-pool
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 🔧 בדיקת התחברות מיידית
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err);
  } else {
    console.log('✅ Database connected successfully. Server time:', res.rows[0].now);
  }
});
