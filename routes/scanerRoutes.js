const express = require("express");
const router = express.Router();
const rfidController = require("../controllers/scanerController");



router.post("/rfid", rfidController.addRFID);

router.get("/rfid", rfidController.getAllRFIDs);


module.exports = router;
