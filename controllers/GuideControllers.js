const guide = require('../models/GuideModel');
const getAllGuides = async (req, res) => {
    try {
        const guides = await guide.find();
        if (!guides || guides.length === 0) {
            return res.status(404).json({ message: "No guides found" });
        }
        return res.status(200).json({ guides });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.getAllGuides = getAllGuides;