const BusinessUser = require('../models/BusinessUserModel'); // Import the BusinessUser model
const bcrypt = require('bcrypt'); // For password hashing

// Get all business users
const getAllBusinessUsers = async (req, res) => {
    try {
        const users = await BusinessUser.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No business users found" });
        }
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Create a new business user
const createBusinessUser = async (req, res) => {
    const { name, email, password, business_name, business_category, dob, contact_number, address } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !business_name || !business_category || !dob || !contact_number || !address) {
        return res.status(400).json({ message: "Please provide all required fields." });
    }

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new BusinessUser({
            name,
            email,
            password: hashedPassword,
            business_name,
            business_category,
            dob,
            contact_number,
            address
        });

        const createdUser = await newUser.save();
        return res.status(201).json(createdUser);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

// Update business user by ID
const updateBusinessUser = async (req, res) => {
    try {
        const { name, email, password, business_name, business_category, dob, contact_number, address } = req.body;

        // Find the business user by ID, including the password field
        const user = await BusinessUser.findById(req.params.id).select('+password');
        if (!user) {
            return res.status(404).json({ message: "Business user not found" });
        }

        // Update fields if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (business_name) user.business_name = business_name;
        if (business_category) user.business_category = business_category;
        if (dob) user.dob = dob;
        if (contact_number) user.contact_number = contact_number;
        if (address) user.address = address;

        // Hash the new password if it's updated
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await user.save();
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

// Delete business user by ID
const deleteBusinessUser = async (req, res) => {
    try {
        const user = await BusinessUser.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Business user not found" });
        }
        return res.status(200).json({ message: "Business user deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Export all controller functions
exports.getAllBusinessUsers = getAllBusinessUsers;
exports.createBusinessUser = createBusinessUser;
exports.updateBusinessUser = updateBusinessUser;
exports.deleteBusinessUser = deleteBusinessUser;
