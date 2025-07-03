import feedbackRouter from './src/routes/feedbackRouts';
import AiInsightsRouter from './src/routes/aIInsightRouts';
import answerRouter from './src/routes/answerRouts';
import sharedRecrdingRouter from './src/routes/sharedRecordingRouts';
import express, { Application } from 'express';
import cors from 'cors';
import questionRouter from './src/routes/questionRouts';


import interviewMaterialsHub from '../backend/src/routes/interview-materials-hub'
import dotenv from 'dotenv';
import userRouts from './src/routes/userRouts';
import authRouts from './src/routes/authRouts';
import cookieParser from 'cookie-parser';
// import {supabase} from './src/config/dbConnection';

// 
import http from 'http';
import { Server } from 'socket.io';
// 

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
dotenv.config();
const app: Application = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use('/api' ,feedbackRouter )
app.use('/api' , AiInsightsRouter ) 
app.use('/api' , sharedRecrdingRouter )  
app.use('/answers', answerRouter);
app.use('/question', questionRouter); 
app.use(cookieParser());
app.use('/users', userRouts);
app.use('/auth', authRouts);
app.use('/interview-materials-hub', interviewMaterialsHub);

// 
const server = http.createServer(app); // יצירת שרת HTTP
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // החלף בכתובת הלקוח שלך
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }}); // יצירת מופע של Socket.IO


// הגדרת אירועים של Socket.IO
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

// הפעלת השרת על פורט 5002  
server.listen(5002, () => {
    console.log('listening on *:5002');
});

// 

export {app , io};





