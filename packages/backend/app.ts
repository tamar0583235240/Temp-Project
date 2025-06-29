import express, { Application } from 'express';
import cors from 'cors';
import InterviewMaterialSubRouts from './src/routes/interviewMaterialsHubRoutes';
import resourceRouts from './src/routes/resourceRouts';
import usersRoutes from './src/routes/userRouts';
import answerRoutes from './src/routes/answerRouts';
import aiInsightRoutes from './src/routes/aIInsightRouts';
import { pool } from './src/config/dbConnection';

const app: Application = express();
console.log('i am here in app');




app.use(cors());
app.use(express.json());

app.use('/api/interviewMaterialSub', InterviewMaterialSubRouts);
app.use('/api/resources', resourceRouts);
// רישום הראוטים
app.use("/api/users", usersRoutes);
app.use("/api/questions", answerRoutes);
app.use("/api/aiInsight", aiInsightRoutes);

export default app;




