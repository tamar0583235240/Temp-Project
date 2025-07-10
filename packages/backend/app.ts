import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// import exampleRouts from './src/routes/exampleRouts';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import interviewMaterialsHub from './src/routes/interview-materials-sub';
// import interviewMaterialsRoutes from './src/routes/interviewMaterialsRoutes'; // שמור למקרה שתחליטי להשתמש בו
import workExperienceRoutes from './src/routes/workExperienceRoutes';
import projectsRoutes from './src/routes/projectsRoutes';
import profileRoutes from './src/routes/profileRouts';

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
// app.use('/api', exampleRouts);
app.use('/users', userRouts);
app.use('/auth', authRouts);
// שמתי את שניהם כדי לא לשבור אם שני הנתיבים נדרשים – תחליטי אם צריך את שניהם
app.use('/interview-materials-hub', interviewMaterialsHub); 
app.use('/manager/interview-materials', interviewMaterialsHub);
app.use('/work-experience', workExperienceRoutes);
app.use('/personal-projects', projectsRoutes);
app.use('/profiles', profileRoutes);

export default app;
