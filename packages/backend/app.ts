

import express, { Application } from 'express';
import cors from 'cors';
// import exampleRouts from './src/routes/exampleRouts';
import tipsRotes from './src/routes/tipsRouts';
import "reflect-metadata";
import questionRoutes from './src/routes/questionRoutes';

const app: Application = express();
console.log('i am here in app');
app.use(cors());

// Middleware
app.use(cors());
app.use(express.json());
// app.use('/api', exampleRouts);
app.use('/api/tips',tipsRotes );
// Routes
// app.use('/api', exampleRoutes);
app.use('/simulation', questionRoutes);
app.use('/api/questions', questionRoutes);

export default app;