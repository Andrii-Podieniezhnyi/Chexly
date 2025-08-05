import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js' ;

dotenv.config();

const app = express();
    app.use(cors());
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use('/api', authRoutes);


app.get('/', (req, res) => {
    res.send('Chexly API working')
})

await mongoose.connect(process.env.MONGO_URI, {
})
.then(() => {
    console.log('MongoDb connected');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    })
    
})
.catch((err) => {
    console.error('MongoDB connecting error:', err);
});

