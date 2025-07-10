import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// ראוטים
import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import questionRoute from './src/routes/questionRouts';
import sharedRecrdingRouter from './src/routes/sharedRecordingRouts';
import sharedRecordingsRoutes from './src/routes/sharedRecordingRouts'; // כנראה כפול - אפשר למחוק אחד
import interviewMaterialsHub from './src/routes/interview-materials-hub';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import usedynamicContentRouter from './src/routes/DynamicContentRoutes';
import userAdminRouts from './src/routes/userAdminRouts';
import popularQuestionsRoute from './src/routes/popularQuestionsRoute';

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

// רישום ראוטים
app.use('/api', feedbackRouter);
app.use('/api', AiInsightsRouter);
app.use('/api', sharedRecrdingRouter); // זהה ל־sharedRecordingsRoutes? בדוק!
app.use('/answers', answerRouter);
app.use('/question', questionRoute);
app.use('/shared-recordings', sharedRecordingsRoutes);
app.use('/auth', authRouts);
app.use('/interview-materials-hub', interviewMaterialsHub);
app.use('/api/users', userRouts);
app.use('/api/admin', userAdminRouts);
app.use('/api/dynamic-contents', usedynamicContentRouter);
app.use('/api/questions', popularQuestionsRoute); // חשוב: לא להשתמש פעמיים באותו ראוט

export default app;
