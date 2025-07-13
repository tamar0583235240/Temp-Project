import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import sharedRecrdingRouter from './src/routes/sharedRecordingRouts';
import express, { Application } from 'express';
import cors from 'cors';
// import exampleRouts from './src/routes/exampleRouts';
import questionRoute from './src/routes/questionRouts';
import sharedRecordingsRoutes from './src/routes/sharedRecordingRouts';
import interviewMaterialsHub from '../backend/src/routes/interview-materials-hub'
import dotenv from 'dotenv';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import cookieParser from 'cookie-parser';
// import {supabase} from './src/config/dbConnection';
import usedynamicContentRouter from './src/routes/DynamicContentRoutes'; // ודאי שזה שם הקובץ המדויק
import aiInsightRoutes from './src/routes/aIInsightRouts';
import userAdminRouts from './src/routes/userAdminRouts';
import answerRoutes from "../backend/src/routes/answerRouts";
import statusRouts from './src/routes/statusRoutes';
import categoryRoutes from "./src/routes/categoryRoutes";
import aIInsightRouts from './src/routes/aIInsightRouts';
import resourceRouts from '../backend/src/routes/resourceRouts'
import questionRoutes from './src/routes/questionRouts';
import statusRoutes from '../backend/src/routes/statusRoutes';



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
app.use('/api/categories', categoryRoutes)
app.use('/api' ,feedbackRouter )
app.use('/api' , AiInsightsRouter ) 
app.use('/api' , sharedRecrdingRouter )  
app.use('/answers', answerRouter);
app.use('/question', questionRoute); 
app.use('/shared-recordings', sharedRecordingsRoutes);
app.use('/auth', authRouts);
app.use('/interview-materials-hub', interviewMaterialsHub);
app.use('/api/users', userRouts);
app.use('/api/admin', userAdminRouts);
app.use('/api/dynamic-contents', usedynamicContentRouter);
// app.use("/api/questions", answerRoutes);
app.use("/api/aiInsight", aiInsightRoutes);


app.use('/api', resourceRouts);
app.use('/api/simulation', questionRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/answers', answerRoutes);


app.use('/api/status', statusRouts);
app.use('/api/insights',aIInsightRouts) ;

export default app