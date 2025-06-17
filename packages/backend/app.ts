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
import exampleRouts from './src/routes/exampleRouts';
// import {supabase} from './src/config/dbConnection';
import {pool} from './src/config/dbConnection';
import authRoutes from './src/routes/authRoutes';

// Allow requests from frontend origin
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // optional, in case you're sending cookies
};



const app: Application = express();

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use('/auth', authRoutes);

export default app;