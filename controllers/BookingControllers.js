const booking = require('../models/BookingModel');

const getAllBookings = async (req, res) => {
    let bookings;
    try {
        bookings = await booking.find();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    if (!bookings) {
        res.status(404).json({ message: "No booking found" });
    }
    return res.status(200).json({ bookings });
};

const createBooking = async (req, res) => {
    try {
        const { b_id, b_date, b_time, b_location, b_user, b_guide, price, status } = req.body;

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


const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedBooking = await booking.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        return res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
    } catch (error) {
        return res.status(500).json({ message: "Error updating booking", error: error.message });
    }
};

exports.getAllBookings = getAllBookings;
exports.createBooking = createBooking;
exports.updateBooking = updateBooking;