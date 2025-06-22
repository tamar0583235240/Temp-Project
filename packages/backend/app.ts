// import exampleRouts from './src/routes/exampleRouts'
// import dotenv from 'dotenv';
// import express from 'express';
// import cors from 'cors';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// app.use(express.json());
// // example for implemantaion
// app.use('/api', exampleRouts)

// app.use(cors());
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })

import express, { Application } from 'express';
import cors from 'cors';
// import exampleRouts from './src/routes/exampleRouts';
// import {supabase} from './src/config/dbConnection';



const app: Application = express();
console.log('i am here in app');
app.use(express.json());
// app.use('/api', exampleRouts);
app.use(cors());

export default app;
