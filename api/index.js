import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log("MongoDb is connected")
}).catch((err) => {
    console.log("Connection Filed", err);
});

app.listen(3000, () => {
    console.log("Server is running on Port 3000");
})

app.use('/api/user', userRoutes);