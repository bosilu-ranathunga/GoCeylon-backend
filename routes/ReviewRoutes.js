const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/ReviewControllers');

// Route to get all reviews
router.get('/', reviewController.getAllReviews);

// Route to create a new review
router.post('/', reviewController.createReview);

// Route to get a single review by ID
router.get('/:id', reviewController.getReviewById);

// Route to update a review
router.put('/:id', reviewController.updateReview);

// Route to delete a review
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
