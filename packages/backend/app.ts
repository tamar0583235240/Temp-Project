import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouts from './src/routes/answerRouts';
import sharedRecrdingRouter from './src/routes/sharedRecordingRouts';
import express, { Application } from 'express';
import cors from 'cors';
// import exampleRouts from './src/routes/exampleRouts';
import questionRoute from './src/routes/questionRouts';
import sharedRecordingsRoutes from './src/routes/sharedRecordingRouts';



const app: Application = express();
console.log('i am here in app');
app.use(express.json());
app.use(cors());
app.use('/api' ,feedbackRouter )
app.use('/api' , AiInsightsRouter ) 
app.use('/api' , sharedRecrdingRouter )  
app.use('/answers', answerRouts);
app.use('/question', questionRoute); 
app.use('/shared-recordings', sharedRecordingsRoutes);

export default app