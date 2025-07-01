import express, { Application } from 'express';
import cors from 'cors';
import exampleRouts from './src/routes/exampleRouts';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import interviewMaterialsRoutes from './src/routes/interviewMaterialsRoutes';
import cookieParser from 'cookie-parser';

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

const app: Application = express();

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use('/api', exampleRouts);
app.use('/users', userRouts);
app.use('/auth', authRouts);
app.use('/manager', interviewMaterialsRoutes);

export default app;