import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import questionRoute from './src/routes/questionRouts';
import sharedRecordingRouter from './src/routes/sharedRecordingRouts';
import interviewMaterialsHub from './src/routes/interview-materials-hub';
import userRouts from '../backend/src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import usedynamicContentRouter from './src/routes/DynamicContentRoutes';
import userAdminRouts from './src/routes/userAdminRouts';
import popularQuestionsRoute from './src/routes/popularQuestionsRoute';
import exampleRouts from './src/routes/exampleRouts';

// אם אתה רוצה להשתמש בסופבייס (supabase), תייבא אותו כאן:
// import { supabase } from './src/config/dbConnection';

// אם יש לך ראוטרים נוספים מה-backend, תייבא אותם בהתאם
// import usersRoutes from '../backend/src/routes/userRouts';
// import answerRouts from '../backend/src/routes/answerRouts';

dotenv.config();

const app: Application = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// רישום ראוטים
app.use('/api/feedback', feedbackRouter);
app.use('/api/AiInsights', AiInsightsRouter);
app.use('/api/shared-recordings', sharedRecordingRouter);
app.use('/api/answers', answerRouter);
app.use('/api/questions', questionRoute); 
app.use('/api/auth', authRouts);
app.use('/api/interview-materials-hub', interviewMaterialsHub);
app.use('/api/users', userRouts);
app.use('/api/admin', userAdminRouts);
app.use('/api/dynamic-contents', usedynamicContentRouter);
app.use('/api/popular-questions', popularQuestionsRoute); 
app.use('/api/example', exampleRouts);

// אם תרצה להוסיף ראוטים נוספים מה-backend, תוכל לעשות זאת פה
// app.use('/users', usersRoutes);
// app.use('/questions', answerRouts);

export default app;
