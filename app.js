const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const RFIDRecord = require("./models/scanerModel");
const userRouter = require('./routes/UserRoutes');
const locationRouter = require('./routes/LocationRoutes');
const bookingRouter = require('./routes/BookingRoutes');
const rfidRouter = require('./routes/RfidRoutes');
const scanerRoutes = require("./routes/scanerRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Pass the io object to routes
app.set("io", io);

// Middleware
app.use(cors());
app.use(express.json());

// Routes	
app.use("/users", userRouter);
app.use("/location", locationRouter);
app.use("/booking", bookingRouter);
app.use("/rfid", rfidRouter);
app.use("/api/scaner", scanerRoutes);

// MongoDB Connection
mongoose.connect('mongodb+srv://admin:JbkMQtmZEYD8gTrP@cluster0.doxbw.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch(err => console.error("❌ MongoDB Connection Error:", err));

// Set up the socket connection
io.on("connection", (socket) => {
    console.log("A user connected");

    // Disconnect socket when the user leaves
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});


// Start the server
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
