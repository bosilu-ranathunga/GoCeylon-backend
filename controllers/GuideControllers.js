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



const createGuide = async (guideData) => {
    try {
        const newGuide = new Guide(guideData);
        await newGuide.save();
        return { success: true, message: 'Guide created successfully', guide: newGuide };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

/*const createGuide = async (req, res) => {
    try {
        const { b_id, b_date, b_time, b_location, b_user, b_guide, price, status } = req.body;



        const existingBooking = await booking.findOne({ b_id });
        if (existingBooking) {
            return res.status(400).json({ message: "b_id already exists. Use a unique b_id." });
        }

        const newBooking = new booking({
            b_id,
            b_date,
            b_time,
            b_location,
            b_user,
            b_guide,
            price,
            status: status || 'pending'
        });

        await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};
*/


exports.getAllGuides = getAllGuides;
exports.createGuide=createGuide;
