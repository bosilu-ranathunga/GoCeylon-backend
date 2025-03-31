const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserControllers');

// Define CRUD routes for users
router.get('/', UserController.getAllUsers);  // Get all users
router.get('/:id', UserController.getUserById);  // Get user by ID
router.post('/', UserController.createUser);  // Create a new user
router.put('/update/:id', UserController.updateUser);  // Update a user by ID
router.delete('/delete/:id', UserController.deleteUser);  // Delete a user by ID

module.exports = router;
