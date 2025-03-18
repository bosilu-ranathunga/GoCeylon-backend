//admin JbkMQtmZEYD8gTrP

const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRoutes');
const locationRouter = require('./routes/LocationRoutes');

const app = express();

//middleware
app.use(express.json());
app.use("/users", userRouter);
app.use("/location", locationRouter);



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