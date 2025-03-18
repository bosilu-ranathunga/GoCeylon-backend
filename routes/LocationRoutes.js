const express = require('express');
const router = express.Router();
const locationController = require('../controllers/LocationControllers');


router.get('/', locationController.getAllLocations);
router.post('/', locationController.createLocation);
router.delete('/:id', locationController.deleteLocation); 
router.put('/:id', locationController.updateLocation);
module.exports = router;