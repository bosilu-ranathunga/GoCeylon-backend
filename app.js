const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();  // Load environment variables

// Import routes
const businessRoutes = require('./routes/BusinessRoutes');
const businessUserRoutes = require('./routes/BusinessUserRoutes');  // Correct import

const app = express();

// Middleware
app.use(cors());  // Enable CORS for all requests
app.use(express.json());  // Parse JSON bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/business', businessRoutes);
app.use('/api/businessuser', businessUserRoutes);  // Corrected route usage

// Test route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
