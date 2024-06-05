import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();
const app = express();

app.use(express.json());
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
app.use('/api/auth', authRoutes);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

//npm run dev