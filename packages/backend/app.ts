import express, { Application } from 'express';
import cors from 'cors';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import interviewMaterialsRoutes from './src/routes/interviewMaterialsRoutes';
import cookieParser from 'cookie-parser';
import interviewMaterialsHub from './src/routes/interview-materials-sub';
import dotenv from 'dotenv';
import usersRoutes from './src/routes/userRouts';
import answerRoutes from './src/routes/answerRouts';
import aiInsightRoutes from './src/routes/aIInsightRouts';

dotenv.config();

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);
console.log('Allowed CORS origins:', allowedOrigins);

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    console.log('Origin:', origin);
    
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
console.log('✅ i am here in app');

app.use(express.json());
app.use(cookieParser());

app.use('/users', userRouts);
app.use('/auth', authRouts);
app.use('/manager', interviewMaterialsRoutes);
app.use('/interview-materials-hub', interviewMaterialsHub);
app.use("/users", usersRoutes);
app.use("/questions", answerRoutes);
app.use("/aiInsight", aiInsightRoutes);

export default app;











