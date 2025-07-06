import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import sharedRecrdingRouter from './src/routes/sharedRecordingRouts';
import express, { Application } from 'express';
import remindersRouts from './src/routes/remindersRouts';
import cors from 'cors'
import router from './src/routes/questionRouts';
import questionRouter from './src/routes/questionRouts';
import interviewMaterialsHub from '../backend/src/routes/interview-materials-hub'
import dotenv from 'dotenv';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import cookieParser from 'cookie-parser';

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

app.use('/api/tips', remindersRouts);
app.use('/api/reminders', remindersRouts);
app.use('/api' ,feedbackRouter )
app.use('/api' , AiInsightsRouter ) 
app.use('/api' , sharedRecrdingRouter )  
app.use('/answers', answerRouter);
app.use('/question', questionRouter); 
app.use('/users', userRouts);
app.use('/api/auth', authRouts);
app.use('/interview-materials-hub', interviewMaterialsHub);


export default app;





