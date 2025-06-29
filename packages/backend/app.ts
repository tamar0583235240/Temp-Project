import express, { Application } from 'express';
import cors from 'cors';
// import exampleRouts from './src/routes/exampleRouts';
import resourceRouts from '../backend/src/routes/resourceRouts'
import dotenv from 'dotenv';
import answerRoutes from "../backend/src/routes/answerRouts";


dotenv.config();
// import exampleRouts from './src/routes/exampleRouts';
import "reflect-metadata";
import questionRoutes from './src/routes/questionRoutes';

const app: Application = express();
console.log('i am here in app');
app.use(express.json());
// app.use('/api', exampleRouts);
// app.use('/api', resourceRouts);


app.use(cors());

// Middleware
app.use(cors());
app.use(express.json());
// app.use('/api', exampleRouts);

// Routes
// app.use('/api', exampleRoutes);
app.use('/api/simulation', questionRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);



export default app;




