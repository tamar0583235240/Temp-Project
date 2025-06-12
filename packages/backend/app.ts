import exampleRouts from './src/routes/exampleRouts'
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
// example for implemantaion
app.use('/api', exampleRouts)

app.use(cors());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

