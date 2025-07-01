// import dotenv from 'dotenv';
// dotenv.config();
// import app from './app';


// const PORT = process.env.PORT || 5001;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import dotenv from 'dotenv';
dotenv.config();

// console.log('SUPABASE_URL:', process.env.SUPABASE_URL,'index');
// console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY);

import app from './app';

const PORT = process.env.PORT || 5001;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

