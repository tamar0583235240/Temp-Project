import express, { Application } from 'express';
import cors from 'cors';
import exampleRoutes from './src/routes/exampleRoutes';
import questionRoutes from './src/routes/questionRoutes';

const app: Application = express();
console.log('i am here in app');

// Middleware
app.use(cors()); // תמיד ראשון
app.use(express.json());

// Routes
app.use('/api', exampleRoutes);
app.use('/api', questionRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;


