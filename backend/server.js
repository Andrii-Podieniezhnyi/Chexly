import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('Chexly API working')
})

await mongoose.connect(MONGO_URI, {
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

