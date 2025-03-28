const mongoose = require("mongoose");

const RFIDSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("RFIDRecord", RFIDSchema);
