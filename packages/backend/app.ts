import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import sharedRecrdingRouter from './src/routes/sharedRecordingRouts';
import express, { Application } from 'express';
import cors from 'cors';
import questionRouter from './src/routes/questionRouts';


const app: Application = express();
console.log('i am here in app');
app.use(express.json());
app.use(cors());
app.use('/api' ,feedbackRouter )
app.use('/api' , AiInsightsRouter ) 
app.use('/api' , sharedRecrdingRouter )  
app.use('/answers', answerRouter);
app.use('/question', questionRouter); 

export default app