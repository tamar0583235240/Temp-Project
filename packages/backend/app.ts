
import express, { Application } from 'express';
import cors from 'cors';
import interviewMaterialsHub from './src/routes/interview-materials-sub'
import dotenv from 'dotenv';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import interviewMaterialRoutes from './src/routes/interviewMaterialRoutes'
import cookieParser from 'cookie-parser';
// import {supabase} from './src/config/dbConnection';

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  
};

dotenv.config();

const app: Application = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.use('/users', userRouts);
app.use('/auth', authRouts);
app.use('/interviewMaterial',interviewMaterialRoutes);

app.use('/interview-materials-hub', interviewMaterialsHub);


app.use('/interview-materials-sub', interviewMaterialsHub);

export default app;
