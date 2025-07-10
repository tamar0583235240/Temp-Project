import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Application = express();

// הגדרות CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// ראוטים
import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import questionRoute from './src/routes/questionRouts';
import sharedRecordingRouter from './src/routes/sharedRecordingRouts';
import interviewMaterialsHub from './src/routes/interview-materials-hub';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import usedynamicContentRouter from './src/routes/DynamicContentRoutes';
import userAdminRouts from './src/routes/userAdminRouts';
import popularQuestionsRoute from './src/routes/popularQuestionsRoute';
// אם קיים:
import exampleRouts from './src/routes/exampleRouts';

// רישום ראוטים
app.use('/api/feedback', feedbackRouter);
app.use('/api/ai-insights', AiInsightsRouter);
app.use('/api/shared-recordings', sharedRecordingRouter);
app.use('/api/answers', answerRouter);
app.use('/api/questions', questionRoute); // חשוב שזה לא יתנגש עם popularQuestionsRoute
app.use('/api/auth', authRouts);
app.use('/api/interview-materials-hub', interviewMaterialsHub);
app.use('/api/users', userRouts);
app.use('/api/admin', userAdminRouts);
app.use('/api/dynamic-contents', usedynamicContentRouter);
app.use('/api/popular-questions', popularQuestionsRoute);
app.use('/api/example', exampleRouts);

export default app;
