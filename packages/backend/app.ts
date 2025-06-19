

import express, { Application } from 'express';
import cors from 'cors';
// import exampleRouts from './src/routes/exampleRouts';
import tipsRotes from './src/routes/tipsRouts';
import "reflect-metadata";
// import exampleRouts from './src/routes/exampleRouts';



const app: Application = express();
console.log('i am here in app');
app.use(cors());
app.use(express.json());
// app.use('/api', exampleRouts);
app.use('/api/tips',tipsRotes );

export default app;
