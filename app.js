const express = require('express');
const serverless = require('serverless-http'); // Import serverless-http
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

// Optimized MongoDB connection
let isMongoConnected = false;

const connectDB = async () => {
    if (isMongoConnected) return;
    try {
        await mongoose.connect('mongodb+srv://admin:JbkMQtmZEYD8gTrP@cluster0.doxbw.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isMongoConnected = true;
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
};

connectDB().catch(err => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
});

// Export the serverless handler
module.exports = serverless(app);
