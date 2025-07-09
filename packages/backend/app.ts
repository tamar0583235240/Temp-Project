import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import questionRouter from './src/routes/questionRouts';
import sharedRecordingRouter from './src/routes/sharedRecordingRouts';
import sharedRecordingsRoutes from './src/routes/sharedRecordingRouts'; // ← אם זה אותו קובץ, מחקי אחד מהם

import interviewMaterialsHub from './src/routes/interview-materials-hub';
import userRoutes from './src/routes/userRouts';
import authRoutes from './src/routes/authRouts';

dotenv.config();

const app: Application = express();

/* --- CORS --- */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);

/* --- Middleware --- */
app.use(express.json());
app.use(cookieParser());

/* --- Routes --- */
app.use('/api', feedbackRouter);
app.use('/api', AiInsightsRouter);
app.use('/api', sharedRecordingRouter);      // ← אם שונה מ‑sharedRecordingsRoutes
app.use('/answers', answerRouter);
app.use('/question', questionRouter);
app.use('/shared-recordings', sharedRecordingsRoutes); // ← או מחקי בהתאם
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/interview-materials-hub', interviewMaterialsHub);

export default app;
