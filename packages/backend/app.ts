
import express, { Application } from 'express';
import cors from 'cors';
import authRouts from './src/routes/authRouts';
import authGoogleRoutes from './src/routes/authGoogleRoutes';
import exampleRouts from './src/routes/exampleRouts';
import userRouts from './src/routes/userRouts';

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

const app: Application = express();

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json());
app.use('/api', exampleRouts);

app.use('/users', userRouts);
app.use('/auth', authRouts);
app.use('/auth', authGoogleRoutes);

app.use(cors());


export default app;