//admin JbkMQtmZEYD8gTrP

const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRoutes');
const locationRouter = require('./routes/LocationRoutes');
const bookingRouter = require('./routes/BookingRoutes');
const guideRouter=require('./routes/GuideRoutes')
const app = express();

//middleware
app.use(express.json());
app.use("/users", userRouter);
app.use("/location", locationRouter);
app.use("/booking", bookingRouter);
app.use("/guides", guideRouter);


mongoose.connect('mongodb+srv://admin:JbkMQtmZEYD8gTrP@cluster0.doxbw.mongodb.net/').
    then(() => {
        console.log("Connected to MongoDB");
    }).then(() => {
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        })
    }).catch(err => {
        console.log(err);
    })