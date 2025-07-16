import app from './app';
import { log } from 'console';
import dotenv from 'dotenv';
dotenv.config();
// console.log('SUPABASE_URL:', process.env.SUPABASE_URL,'index');
// console.log('SERVICE_ROLE_KEY:', process.env.SERVICE_ROLE_KEY);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

