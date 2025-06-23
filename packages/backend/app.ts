
import express, { Application } from 'express';
import cors from 'cors';
import exampleRouts from './src/routes/exampleRouts';
import interviewMaterialsHub from '../backend/src/routes/interview-materials-hub'
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
console.log('i am here in app');


app.use(cors());
app.use(express.json());

app.use('/api', exampleRouts);
app.use('/api', interviewMaterialsHub);



export default app;




