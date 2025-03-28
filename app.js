const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRoutes');
const locationRouter = require('./routes/LocationRoutes');
const bookingRouter = require('./routes/BookingRoutes');
const guideRouter = require('./routes/GuideRoutes');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use routers
app.use("/users", userRouter);
app.use("/location", locationRouter);
app.use("/booking", bookingRouter);
app.use("/guides", guideRouter);

// MongoDB connection outside of the handler
const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect('mongodb+srv://admin:JbkMQtmZEYD8gTrP@cluster0.doxbw.mongodb.net/');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

// Call connectDb only once
connectDb();

// Export the serverless handler
module.exports.handler = serverless(app);
