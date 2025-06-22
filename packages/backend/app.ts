
import express, { Application } from 'express';
import cors from 'cors';
import exampleRouts from './src/routes/exampleRouts';
import resourceRouts from '../backend/src/routes/resourceRouts'
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
console.log('i am here in app');
app.use(express.json());
app.use('/api', exampleRouts);
app.use('/api', resourceRouts);


app.use(cors());

export default app;




