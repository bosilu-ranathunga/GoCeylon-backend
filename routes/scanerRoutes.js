const express = require("express");
const router = express.Router();
const RFIDRecord = require("../models/scanerModel");

//const { addRFID, getAllRFIDs } = require("../controllers/scanerController");


//router.post("/rfid", addRFID);   // Add RFID record
//router.get("/rfid", getAllRFIDs); // Get all RFID records

// Add a new RFID record
/*router.post("/rfid", async (req, res) => {
    try {
        const { uid } = req.body;
        if (!uid) return res.status(400).json({ error: "UID is required!" });

        const newRecord = new RFIDRecord({ uid });
        await newRecord.save();

        // Emit the new record to all connected clients
        req.app.get("io").emit("newRFID", newRecord);

        res.status(201).json({ message: "RFID record saved.", data: newRecord });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});*/


// Add a new RFID record
router.post("/rfid", async (req, res) => {
    try {
        const { uid } = req.body;
        if (!uid) return res.status(400).json({ error: "UID is required!" });

        const newRecord = new RFIDRecord({ uid });
        await newRecord.save();

        // Emit the new record to all connected clients
        req.app.get("io").emit("newRFID", newRecord);  // Emit the event here

        res.status(201).json({ message: "RFID record saved.", data: newRecord });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/rfid", async (req, res) => {
    try {
        const records = await RFIDRecord.find().sort({ timestamp: -1 });
        res.status(200).json(records);  // Ensure this returns JSON
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
