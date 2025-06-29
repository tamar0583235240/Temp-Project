
import express, { Application } from 'express';
import cors from 'cors';
import exampleRouts from './src/routes/exampleRouts';
import remindersRouts from './src/routes/remindersRouts';



const app: Application = express();
console.log('i am here in app');
app.use(express.json());
app.use(cors());
app.use('/api', exampleRouts);
app.use('/api', remindersRouts);
app.use(cors());
app.use('/api/reminders', remindersRouts);
export default app;


