import express, { Application } from 'express';
import cors from 'cors';
// import exampleRouts from './src/routes/exampleRouts';
import resourceRouts from '../backend/src/routes/resourceRouts'
import dotenv from 'dotenv';
import answerRoutes from "../backend/src/routes/answerRouts";
import statusRouts from './src/routes/statusRouts';
import aIInsightRouts from './src/routes/aIInsightRouts';


dotenv.config();
import "reflect-metadata";
import questionRoutes from './src/routes/questionRoutes';

const app: Application = express();
console.log('i am here in app');
app.use(express.json());

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', resourceRouts);
app.use('/api/simulation', questionRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/status', statusRouts);
app.use('/api/insights',aIInsightRouts) ;


export default app;




