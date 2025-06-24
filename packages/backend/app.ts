
import express, { Application } from 'express';
import cors from 'cors';
// import exampleRouts from './src/routes/exampleRouts';
import answerRouts from './src/routes/answerRouts';
import questionRoute from './src/routes/questionRouts';
import sharedRecordingsRoutes from './src/routes/sharedRecordingRouts';


const app: Application = express();
console.log('i am here in app');
app.use(cors());
app.use(express.json());
// app.use('/api', exampleRouts);
app.use('/answers',answerRouts);
app.use('/question', questionRoute);
app.use('/shared-recordings', sharedRecordingsRoutes);
app.use(cors());

export default app;
