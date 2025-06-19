import express, { Application } from 'express';
import cors from 'cors';
import exampleRouts from './src/routes/exampleRouts';
import { supabase } from './src/config/dbConnection';
import usersRoutes from '../backend/src/routes/userRouts'
import answerRouts from '../backend/src/routes/answerRouts'

const app: Application = express();
console.log('i am here in app');
app.use(express.json());
app.use(cors());
// app.use('/api', exampleRouts);
app.use("/api/users", usersRoutes);
app.use("/users", usersRoutes);
app.use("/questions", answerRouts)
export default app;