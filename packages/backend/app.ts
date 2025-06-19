
import express, { Application } from 'express';
import cors from 'cors';
import exampleRouts from './src/routes/exampleRouts';
import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';




import answerRouts from './src/routes/answerRouts';
const app: Application = express();
console.log('i am here in app');
app.use(express.json());
app.use(cors());
// app.use('/api', exampleRouts);
app.use('/api' ,feedbackRouter )
app.use('/api' , AiInsightsRouter ) 

app.use('/answers', answerRouts);

export default app