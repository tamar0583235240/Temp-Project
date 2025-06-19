import express, { Application } from 'express';
import cors from 'cors';

// import exampleRouts from './src/routes/exampleRouts';
import usersRoutes from '../backend/src/routes/userRouts'
import answerRouts from '../backend/src/routes/answerRouts'
import aIInsightRouts from './src/routes/aIInsightRouts';
 
const app = express();

console.log('i am here in app');
app.use(cors());
app.use(express.json());
// app.use('/api', exampleRouts);
app.use("/api/users", usersRoutes);
app.use("/api/questions",answerRouts)
app.use('/api/insights', aIInsightRouts);
app.use("/api/aiInsight", aIInsightRouts);

export default app;
