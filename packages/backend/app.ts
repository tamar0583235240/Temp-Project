
import express, { Application } from 'express';
import cors from 'cors';
// import exampleRouts from './src/routes/exampleRouts';
import dotenv from 'dotenv';
const cookieParser = require('cookie-parser');

// import {supabase} from './src/config/dbConnection';
import apiRouts from './src/routes/apiRouts'
import rateLimiterMiddleware from './src/middlewares/rateLimiterMiddleware'
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
app.use('/', rateLimiterMiddleware, apiRouts);


export default app