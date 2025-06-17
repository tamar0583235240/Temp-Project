// import dotenv from 'dotenv';
// dotenv.config();
// import app from './app';


// const PORT = process.env.PORT || 5001;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



import app from './app';
import { log } from 'console';
import dotenv from 'dotenv';
dotenv.config();
// console.log('SUPABASE_URL:', process.env.SUPABASE_URL,'index');
// console.log('SERVICE_ROLE_KEY:', process.env.SERVICE_ROLE_KEY);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

