import express from 'express';
const app = express();
const port = 3001;

app.use(express.json()); // 🟢 חובה לקרוא את ה-body

app.post('/test-feedback', (req, res) => {
  console.log('📦 BODY RECEIVED:', req.body);
  res.json({ message: 'Feedback received!' });
});

app.listen(port, () => {
  console.log(`✅ Test server running on http://localhost:${port}`);
});
