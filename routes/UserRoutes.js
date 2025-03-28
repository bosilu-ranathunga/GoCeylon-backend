const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserControllers'); // Ensure correct file reference

// Define CRUD routes
router.get('/', UserController.getAllUsers);       // Get all users
router.post('/', UserController.createUser);       // Create a new user
router.put('/:id', UserController.updateUser);     // Update a user by ID
router.delete('/:id', UserController.deleteUser);  // Delete a user by ID

module.exports = router;


