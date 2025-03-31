const Tourist = require('../models/UserModel'); // Ensure to import the correct model
const bcrypt = require('bcrypt'); // For password hashing

// Read all tourists
const getAllUsers = async (req, res) => {
    try {
        const users = await Tourist.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({ users });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.getAllUsers = getAllUsers;

// Read a tourist by ID
const getUserById = async (req, res) => {
    try {
        const user = await Tourist.findById(req.params.id);  // Fetch the user using the provided ID
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);  // Return the user details
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching user details', error: err.message });
    }
};
exports.getUserById = getUserById;

// Create a new tourist
const createUser = async (req, res) => {
    try {
        const newUser = new Tourist(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
};
exports.createUser = createUser;

// Update a tourist
const updateUser = async (req, res) => {
    try {
        const updatedUser = await Tourist.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error: error.message });
    }
};
exports.updateUser = updateUser;

// Delete a tourist
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await Tourist.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};
exports.deleteUser = deleteUser;
