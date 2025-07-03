import express, { Application } from 'express';
import cors from 'cors';
import exampleRouts from './src/routes/exampleRouts';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import interviewMaterialsRoutes from './src/routes/interviewMaterialsRoutes';
import cookieParser from 'cookie-parser';
import interviewMaterialsHub from './src/routes/interview-materials-sub';
import dotenv from 'dotenv';

dotenv.config();

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true); // בקשות כמו Postman שאין להן origin
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS blocked: Origin not allowed'));
    }
  },
  credentials: true,
};

const app: Application = express();

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});


app.use(cors(corsOptions));
app.use((req, res, next) => {
  next();
});
app.use(express.json());
app.use(cookieParser());

app.use('/api', exampleRouts);
app.use('/users', userRouts);
app.use('/auth', authRouts);
app.use('/manager', interviewMaterialsRoutes);
app.use('/interview-materials-hub', interviewMaterialsHub);

export default app;











