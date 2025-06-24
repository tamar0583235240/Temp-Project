
import express, { Application } from 'express';
import cors from 'cors';
import exampleRouts from './src/routes/exampleRouts';
import questionRouts from './src/routes/questionRouts';



const app: Application = express();
console.log('i am here in app');
app.use(express.json());
app.use(cors());
app.use('/api', exampleRouts);
app.use('/api', questionRouts)


export default app;
