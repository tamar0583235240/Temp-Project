import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouts from './src/routes/answerRouts';
import sharedRecrdingRouter from './src/routes/sharedRecordingRouts';
import express, { Application } from 'express';
import cors from 'cors';
import questionRoute from './src/routes/questionRouts';


const app: Application = express();
console.log('i am here in app');
app.use(express.json());
app.use(cors());
app.use('/api/feedback', feedbackRouter)
app.use('/api/ai-insights', AiInsightsRouter)
app.use('/api/shared-recordings', sharedRecrdingRouter)
app.use('/answers', answerRouts);
app.use('/question', questionRoute); 

export default app
// -----------------------------------------------------------------------

// import express, { Application } from 'express';
// import cors from 'cors';
// import sharedRecordingRouts from './src/routes/sharedRecordingRouts';
// import { supabase } from './src/config/dbConnection';
// const app: Application = express();

// console.log('i am here in app');

// app.use(express.json());
// app.use(cors());



// app.use('/api', sharedRecordingRouts);


// // app.use('api',sharedRecordingRouts.ts)
// export default app;