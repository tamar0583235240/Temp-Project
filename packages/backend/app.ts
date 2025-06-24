
import express, { Application } from 'express';
import cors from 'cors';
import exampleRouts from './src/routes/exampleRouts';
import InterviewMaterialSubRouts from './src/routes/interviewMaterialsHubRoutes';
import resourceRouts from './src/routes/resourceRouts';

const app: Application = express();
console.log('i am here in app');


app.use(cors());
app.use(express.json());

app.use('/api', exampleRouts);
app.use('/api/interviewMaterialSub', InterviewMaterialSubRouts);
app.use('/api/resources', resourceRouts);



export default app;




