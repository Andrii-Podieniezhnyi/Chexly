import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import taskRouts from './routes/taskRoutes.js';
import tabRoutes from './routes/tabRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Налаштування CORS
app.use(cors({
  origin: 'http://localhost:5500', // запуск фронту з Live Server
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Обробляємо preflight-запити (OPTIONS) для всіх маршрутів
app.options('*', cors());

app.use(express.json());

// Підключаємо маршрути
app.use('/api', authRoutes, taskRouts, tabRoutes);

app.get('/', (req, res) => {
  res.send('Chexly API working');
});

// Підключення до MongoDB
await mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDb connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connecting error:', err);
  });