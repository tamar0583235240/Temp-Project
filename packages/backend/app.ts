import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import exampleRouts from './src/routes/exampleRouts';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import interviewMaterialsHub from './src/routes/interview-materials-sub';
import interviewMaterialsRoutes from './src/routes/interviewMaterialsRoutes'; // כנראה לזה התכוונת ב־HEAD
import workExperienceRoutes from './src/routes/workExperienceRoutes';
import projectsRoutes from './src/routes/projectsRoutes';

dotenv.config();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
};

const app: Application = express();

app.use((req, res, next) => {
  next();
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', exampleRouts);
app.use('/users', userRouts);
app.use('/auth', authRouts);
app.use('/manager', interviewMaterialsRoutes); // גרסה מ־HEAD
app.use('/interview-materials-hub', interviewMaterialsHub); // גרסה מ־HEAD
app.use('/manager/interview-materials', interviewMaterialsHub); // גרסה מ־group1 (אם צריך שתיהן, השאר. אם לא, מחק אחת)
app.use('/work-experience', workExperienceRoutes);
app.use('/personal-projects', projectsRoutes);

export default app;
