import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import questionRouts from './src/routes/questionRouts';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/questions', questionRouts); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
