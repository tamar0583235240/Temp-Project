import express, { Application } from 'express';
import cors from 'cors';
// import exampleRoutes from './src/routes/exampleRoutes';
import questionRoutes from './src/routes/questionRoutes';

const app: Application = express();
console.log('i am here in app');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api', exampleRoutes);
app.use('/simulation', questionRoutes);

export default app;