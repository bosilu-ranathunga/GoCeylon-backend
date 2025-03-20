const express = require('express');
const router = express.Router();
const multer = require('multer'); // Multer for file uploads
const path = require('path');
const locationController = require('../controllers/LocationControllers');

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Where to store the files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Filename format (e.g., 1625181233.jpg)
    }
});

const upload = multer({ storage: storage }); // Multer middleware

// Routes
router.get('/', locationController.getAllLocations);

// POST: Create location, with image upload (using upload.array for multiple images)
router.post('/', upload.array('images', 5), locationController.createLocation); // Handling image uploads (up to 5 images)

// DELETE: Delete location by ID
router.delete('/:id', locationController.deleteLocation);

// PUT: Update location by ID
router.put('/:id', locationController.updateLocation);

module.exports = router;
