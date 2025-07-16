import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import exampleRouts from './src/routes/exampleRouts';
import questionRoute from './src/routes/questionRouts';
import sharedRecordingsRoutes from './src/routes/sharedRecordingRouts';
import interviewMaterialsHub from '../backend/src/routes/interview-materials-hub'
import dotenv from 'dotenv';

import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
// import {supabase} from './src/config/dbConnection';
import usedynamicContentRouter from './src/routes/DynamicContentRoutes'; // ודאי שזה שם הקובץ המדויק
import answerRoutes from './src/routes/answerRouts';
import aiInsightRoutes from './src/routes/aIInsightRouts';
import userAdminRouts from './src/routes/userAdminRouts';

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    console.log('Origin:', origin);
    if (!origin) return callback(null, true);
    if (
      origin.startsWith('chrome-extension://') ||
      allowedOrigins.includes(origin)
    ) {
      return callback(null, true);
    }
    callback(new Error('CORS blocked: Origin not allowed'));
  },
  credentials: true,
};

dotenv.config();

const app: Application = express();

app.use((req, res, next) => {
  console.log('📩 New Request:', req.method, req.originalUrl);
  next();
});


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
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
app.use("/api/questions", answerRoutes);
app.use("/api/aiInsight", aiInsightRoutes);

console.log('✅ i am here in app');

// Routes
app.use('/users', userRouts);
app.use('/auth', authRouts);
app.use("/questions", answerRoutes);
app.use("/aiInsight", aiInsightRoutes);
app.use('/interview-materials-hub', interviewMaterialsRoutes);
app.use('/manager/interview-materials', interviewMaterialsRoutes);
// app.use('/work-experience', workExperienceRoutes);
// app.use('/personal-projects', projectsRoutes);
app.use('/profiles', profileRoutes);

export default app;