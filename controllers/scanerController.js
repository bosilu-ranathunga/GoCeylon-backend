const RFIDRecord = require("../models/scanerModel");

// Add a new RFID record
exports.addRFID = async (req, res) => {
    try {
        const { uid } = req.body;
        if (!uid) return res.status(400).json({ error: "UID is required!" });
        const newRecord = new RFIDRecord({ uid });
        await newRecord.save();
        res.status(201).json({ message: "RFID record saved.", data: newRecord });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all RFID records
exports.getAllRFIDs = async (req, res) => {
    try {
        const records = await RFIDRecord.find().sort({ timestamp: -1 });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
