
const booking = require('../models/BookingModel');

const getAllBookings = async (req, res) => {
    try {
        const bookings = await booking.find();
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }
        return res.status(200).json({ bookings });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const createBooking = async (req, res) => {
    try {
        // Destructure the data from the request body
        const { b_date, b_time, b_location, b_user, b_guide, price, status } = req.body;

        // Validate ObjectId for b_user and b_guide
        if (!mongoose.Types.ObjectId.isValid(b_user)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        if (!mongoose.Types.ObjectId.isValid(b_guide)) {
            return res.status(400).json({ message: 'Invalid guide ID' });
        }

        // Create the new booking object without b_id
        const newBooking = new booking({
            b_date,
            b_time,
            b_location,
            b_user,
            b_guide,
            price,
            status: status || 'pending', // Default to 'pending' if no status provided
        });

        // Save the new booking to the database
        await newBooking.save();

        // Return the newly created booking
        res.status(201).json({
            message: 'Booking created successfully',
            booking: newBooking,
        });

    } catch (error) {
        // Log the error for debugging purposes
        console.error(error);

        // Send a generic error message
        res.status(500).json({
            message: 'Error creating booking',
            error: error.message,
        });
    }
};







const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        delete updatedData.b_id;

        const updatedBooking = await booking.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        return res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
    } catch (error) {
        return res.status(500).json({ message: "Error updating booking", error: error.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBooking = await booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        return res.status(200).json({ message: "Booking deleted successfully", booking: deletedBooking });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting booking", error: error.message });
    }
};

exports.getAllBookings = getAllBookings;
exports.createBooking = createBooking;
exports.updateBooking = updateBooking;
exports.deleteBooking = deleteBooking;
const Booking = require('../models/BookingModel');
const mongoose = require('mongoose');

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }
        return res.status(200).json({ bookings });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { b_date, b_time, b_location, b_user, b_guide, price, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(b_user)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        if (!mongoose.Types.ObjectId.isValid(b_guide)) {
            return res.status(400).json({ message: 'Invalid guide ID' });
        }

        const newBooking = new Booking({
            b_date,
            b_time,
            b_location,
            b_user,
            b_guide,
            price,
            status: status || 'pending',
        });

        await newBooking.save();

        res.status(201).json({
            message: 'Booking created successfully',
            booking: newBooking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

// Update an existing booking
exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        
        delete updatedData.b_id;

        const updatedBooking = await Booking.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        return res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
    } catch (error) {
        return res.status(500).json({ message: "Error updating booking", error: error.message });
    }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        return res.status(200).json({ message: "Booking deleted successfully", booking: deletedBooking });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting booking", error: error.message });
    }
};
