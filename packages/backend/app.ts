import express, { Application } from 'express';
import cors from 'cors';
import usersRoutes from './src/routes/userRouts';
import answerRoutes from './src/routes/answerRouts';
import aiInsightRoutes from './src/routes/aIInsightRouts';
import activity_MonitoringRoutes from './src/routes/activity-MonitoringRoutes'
import { pool } from './src/config/dbConnection';

const app: Application = express();

console.log('✅ i am here in app');

app.use(cors());
app.use(express.json());

// רישום הראוטים
app.use("/api/users", usersRoutes);
app.use("/api/questions", answerRoutes);
app.use("/api/aiInsight", aiInsightRoutes);
app.use("/api/monitoringh", activity_MonitoringRoutes);
app.use("/api/activity", activity_MonitoringRoutes);


export default app;
