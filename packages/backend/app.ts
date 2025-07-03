import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import sharedRecrdingRouter from './src/routes/sharedRecordingRouts';
import express, { Application } from 'express';
import cors from 'cors'
import router from './src/routes/questionRouts';

import questionRouter from './src/routes/questionRouts';


import interviewMaterialsHub from '../backend/src/routes/interview-materials-hub'
import dotenv from 'dotenv';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import cookieParser from 'cookie-parser';
// import {supabase} from './src/config/dbConnection';

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
// <<<<<<< HEAD
// app.use(cors());
// app.use('/api', router)

// =======
// >>>>>>> main
app.use('/api' ,feedbackRouter )
app.use('/api' , AiInsightsRouter ) 
app.use('/api' , sharedRecrdingRouter )  
app.use('/answers', answerRouter);
app.use('/question', questionRouter); 
app.use(cookieParser());
app.use('/users', userRouts);
app.use('/auth', authRouts);

app.use('/interview-materials-hub', interviewMaterialsHub);



export default app;





