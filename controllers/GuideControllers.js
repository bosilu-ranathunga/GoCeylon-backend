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

const updateGuide=async (req, res) => {
    try {
        const updatedGuide = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedGuide) return res.status(404).json({ message: 'Guide not found' });
        res.status(200).json(updatedGuide);
    } catch (error) {
        res.status(400).json({ message: 'Error updating guide', error: error.message });
    }
};
exports.updateGuide=updateGuide;

//Delete a guide
const deleteGuide=async (req, res) => {
    try {
        const deletedGuide = await Guide.findByIdAndDelete(req.params.id);
        if (!deletedGuide) return res.status(404).json({ message: 'Guide not found' });
        res.status(200).json({ message: 'Guide deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting guide', error: error.message });
    }
};
exports.deleteGuide=deleteGuide;




const createGuide = async (guideData) => {
    try {
        const newGuide = new guide(guideData);
        await newGuide.save();
        return { success: true, message: 'Guide created successfully', guide: newGuide };
    } catch (error) {
        return { success: false, message: error.message };
    }
};



exports.getAllGuides = getAllGuides;
exports.createGuide=createGuide;
