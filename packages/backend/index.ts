import dotenv from 'dotenv';
import app from './app';
dotenv.config();

const PORT = process.env.PORT || 5000;
console.log("✅ JWT_SECRET loaded:", process.env.JWT_SECRET);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

