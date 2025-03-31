const Review = require('../models/ReviewModel');

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new review
exports.createReview = async (req, res) => {
    const { reviewerName, rating, comment } = req.body;

    if (!reviewerName || !rating || !comment) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newReview = new Review({ reviewerName, rating, comment });
        const savedReview = await newReview.save();
        res.status(201).json({ message: 'Review created successfully', review: savedReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a review by ID
exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
