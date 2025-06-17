
import express, { Application } from 'express';
import cors from 'cors';
import exampleRouts from './src/routes/exampleRouts';

import answerRouts from './src/routes/answerRouts';
const app: Application = express();
console.log('i am here in app');
app.use(express.json());
app.use('/answers', answerRouts);
app.use(cors());

export default app;
