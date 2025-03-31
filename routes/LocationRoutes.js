const express = require('express');
const router = express.Router();
const multer = require('multer'); // Multer for file uploads
const path = require('path');
const locationController = require('../controllers/LocationControllers');
const authMiddleware = require('../middleware/authMiddleware');

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure the "uploads" folder exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Use multer for handling image uploads
router.post("/", authMiddleware(['admin']), upload.array("images", 5), locationController.createLocation); //

// Routes
router.get('/', locationController.getAllLocations);
router.get('/:id', locationController.getLocationById);

// DELETE: Delete location by ID
router.delete('/:id', authMiddleware(['admin']), locationController.deleteLocation);

// PUT: Update location by ID, allowing image uploads
router.put('/:id', authMiddleware(['admin']), upload.array('images', 5), locationController.updateLocation);

module.exports = router;
