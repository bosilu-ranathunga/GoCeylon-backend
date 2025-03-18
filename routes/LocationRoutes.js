const express = require('express');
const router = express.Router();
const locationController = require('../controllers/LocationControllers');

router.get('/', locationController.getAllLocations);
router.post('/', locationController.createLocation);

module.exports = router;