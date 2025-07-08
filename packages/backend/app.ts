import express, { Application } from 'express';
import cors from 'cors';
import usersRoutes from './src/routes/userRouts';
import answerRoutes from './src/routes/answerRouts';
import aiInsightRoutes from './src/routes/aIInsightRouts';
import { pool } from './src/config/dbConnection';

const app: Application = express();

console.log('✅ i am here in app');

app.use(cors());
app.use(express.json());

// רישום הראוטים
app.use("/api/users", usersRoutes);
app.use("/api/questions", answerRoutes);
app.use("/api/aiInsight", aiInsightRoutes);

export default app;
