const express = require('express');
const router = express.Router();
const rfidController = require('../controllers/RfidControllers');

// Create a new RFID entry
router.post('/', rfidController.createRfid);

// Get all RFID entries
router.get('/', rfidController.getAllRfids);

// Get a single RFID entry by ID
router.get('/:id', rfidController.getRfidById);

// Update an RFID entry
router.put('/:id', rfidController.updateRfid);

// Delete an RFID entry
router.delete('/:id', rfidController.deleteRfid);

module.exports = router;
