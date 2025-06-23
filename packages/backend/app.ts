
import express, { Application } from 'express';
import cors from 'cors';
import authRouts from './src/routes/authRouts';
import authGoogleRoutes from './src/routes/authGoogleRoutes';
import resourceRouts from '../backend/src/routes/resourceRouts'
import dotenv from 'dotenv';
import userRouts from './src/routes/userRouts';

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
dotenv.config();
const app: Application = express();

app.use(express.json());
app.use('/users', userRouts);
app.use('/auth', authRouts);
app.use('/auth', authGoogleRoutes);
app.use('/api', resourceRouts);


app.use(cors());

export default app;




