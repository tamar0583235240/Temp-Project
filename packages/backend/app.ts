
import express, { Application } from 'express';
import cors from 'cors';
import authRouts from './src/routes/authRouts';
import authGoogleRoutes from './src/routes/authGoogleRoutes';
import interviewMaterialsHub from '../backend/src/routes/interview-materials-hub'
import dotenv from 'dotenv';
import resourceRouts from '../backend/src/routes/resourceRouts'

import userRouts from './src/routes/userRouts';

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
dotenv.config();
const app: Application = express();

console.log('i am here in app');


app.use(cors());
app.use(express.json());

app.use('/users', userRouts);
app.use('/auth', authRouts);
app.use('/auth', authGoogleRoutes);
app.use('/api', interviewMaterialsHub);



export default app;




