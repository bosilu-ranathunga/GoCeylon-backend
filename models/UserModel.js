const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Define the schema for a Tourist (User) profile
const TouristSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false  // Prevent password from being returned in query results by default
    },
    destination: {
        type: String,
        enum: ['Beach', 'Mountains', 'City', 'Countryside'],
        required: true
    },
    traveling_with: {
        type: String,
        enum: ['Solo', 'Family', 'Partner', 'Friends'],
        required: true
    },
    accommodations: {
        type: Boolean,
        required: true
    },
    tour_guide: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

// Hash password before saving to the database
TouristSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();  // Only hash the password if it's been modified
    try {
        const salt = await bcrypt.genSalt(10);  // Create salt for hashing
        this.password = await bcrypt.hash(this.password, salt);  // Hash the password
        next();
    } catch (error) {
        next(error);  // Pass any error that occurs to the next middleware
    }
});

// Add a method to compare entered password with the stored hashed password
TouristSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);  // Compare password with hashed value
};

module.exports = mongoose.model('Tourist', TouristSchema);
