const user = require('../models/UserModel');

const getAllUsers = async (req, res) => {
    let users;
    try {
        users = await user.find();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    if (!users) {
        res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ users });
};

const createUser = async (req, res) => {
    const newUser = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const createdUser = await newUser.save();
        return res.status(201).json(createdUser); // Corrected: Added return
    } catch (err) {
        return res.status(400).json({ message: err.message }); // Corrected: Added return
    }
    // Removed: if (!newUser) { return res.status(404).json({ message: "User not created" }); }
    // Removed: return res.status(200).json({ newUser });
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;