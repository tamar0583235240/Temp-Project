import express, { Application } from 'express';
import cors from 'cors';
import exampleRouts from './src/routes/exampleRouts';
import aIInsightRouts from './src/routes/aIInsightRouts';

const app = express();

console.log('i am here in app');
app.use(cors());
app.use(express.json());
app.use('/api', exampleRouts);
app.use('/api/insights', aIInsightRouts);

export default app;
