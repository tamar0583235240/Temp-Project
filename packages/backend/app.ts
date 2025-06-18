import express, { Application } from 'express';
import cors from 'cors';
// import {supabase} from './src/config/dbConnection';
import {pool} from './src/config/dbConnection';
import authRoutes from './src/routes/authRoutes';

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

const app: Application = express();

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json());
app.use('/auth', authRoutes);

export default app;