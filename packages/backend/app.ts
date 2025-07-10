import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import sharedRecrdingRouter from './src/routes/sharedRecordingRouts';
import express, { Application } from 'express';
import cors from 'cors'
import router from './src/routes/questionRouts';
import questionRouter from './src/routes/questionRouts';
import interviewMaterialsHub from '../backend/src/routes/interview-materials-hub'
import dotenv from 'dotenv';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import cookieParser from 'cookie-parser';
import { createConsumer, kafka } from './src/kafkaService';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
let io: Server;

const createApp = async (): Promise<Application> => {
  const app = express();

  const consumer = await createConsumer();
  const run = async () => {
    await consumer.run({
      eachMessage: async ({ topic, message }: { topic: string; message: { value: Buffer; } }) => {
        console.log(`Received message: ${message.value.toString()} from topic: ${topic}`);
      },
    });
  };

  run().catch(console.error);

  app.use(cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001'
    ], credentials: true,
  }));

  app.use(express.json());
  app.use(cookieParser());
  app.use('/api', feedbackRouter);
  app.use('/api', AiInsightsRouter);
  app.use('/api', sharedRecrdingRouter);
  app.use('/answers', answerRouter);
  app.use('/question', questionRouter);
  app.use('/users', userRouts);
  app.use('/auth', authRouts);
  app.use('/interview-materials-hub', interviewMaterialsHub);

  const server = http.createServer(app);
  io = new Server(server, {
    cors: {
      origin: [
        'http://localhost:3000',
        'http://localhost:3001'
      ],
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message) => {
      console.log(`Received: ${message}`);
      socket.emit('message', `Server received: ${message}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  const shutdownConsumer = async () => {
    if (consumer) {
      await consumer.disconnect();
    }
  };

  process.on('SIGINT', shutdownConsumer); 
  process.on('SIGTERM', shutdownConsumer);
  return app;
};
export { createApp, io };





