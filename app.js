const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRoutes');
const cors = require('cors');
const locationRouter = require('./routes/LocationRoutes');
<<<<<<< Updated upstream
<<<<<<< Updated upstream
const path = require('path');  // For handling paths

const app = express();

// Enable CORS
app.use(cors());

// Middleware
=======
const bookingRouter = require('./routes/BookingRoutes');
const guideRouter=require('./routes/GuideRoutes')
const cors=require('cors');
const app = express();


//middleware
app.use(cors());
>>>>>>> Stashed changes
=======
const bookingRouter = require('./routes/BookingRoutes');
const guideRouter=require('./routes/GuideRoutes')
const cors=require('cors');
const app = express();


//middleware
app.use(cors());
>>>>>>> Stashed changes
app.use(express.json());
app.use("/users", userRouter);
app.use("/location", locationRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Serve the uploaded files from 'uploads' folder

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:JbkMQtmZEYD8gTrP@cluster0.doxbw.mongodb.net/')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .then(() => {
        // Start the server
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch(err => {
        console.log("Error connecting to MongoDB: ", err);
    });
