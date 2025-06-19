
import express, { Application } from 'express';
import cors from 'cors';
import exampleRouts from './src/routes/exampleRouts';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
// import {supabase} from './src/config/dbConnection';



const app: Application = express();
console.log('i am here in app');

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());
app.use('/api', exampleRouts);
app.use('/users', userRouts);
app.use('/auth', authRouts);


export default app;
