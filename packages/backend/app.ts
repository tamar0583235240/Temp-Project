import express, { Application } from 'express';
import cors from 'cors';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import interviewMaterialsHub from './src/routes/interview-materials-sub';
import cookieParser from 'cookie-parser';
import projectsRoutes from './src/routes/projectsRoutes';
import dotenv from 'dotenv';
import profileRoutes from "./src/routes/profileRouts";


const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

dotenv.config();

const app: Application = express();

app.use((req, res, next) => {
  next();
});

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/users', userRouts);
app.use('/auth', authRouts);
app.use('/manager/interview-materials', interviewMaterialsHub);
app.use('/personal-projects', projectsRoutes);
app.use('/profiles', profileRoutes);


export default app;