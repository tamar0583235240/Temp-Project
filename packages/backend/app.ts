
import express, { Application } from 'express';
import cors from 'cors';
import answerRouts from './src/routes/answerRouts';
import questionRoute from './src/routes/questionRouts';

const app: Application = express();
console.log('i am here in app');
app.use(cors());
app.use(express.json());
app.use('/question', questionRoute); 
app.use('/answers', answerRouts);

export default app;
