const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guideSchema = new Schema({
    g_name: { type: String, required: true },
    g_dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // Hide password from queries
    language: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    price: { type: Number, required: true },
    location: { type: [String], required: true },
    availability: { type: Boolean, default: true },
    contact_number: { type: String, required: true, unique: true },

}, { timestamps: true });

// *Hash password before saving*
guideSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if password is new/changed
    try {
    } catch (error) {
        next(error);
    }
});

// *Compare entered password with hashed password*
guideSchema.methods.comparePassword = async function (enteredPassword) {

};

module.exports = mongoose.model('Guide', guideSchema);

