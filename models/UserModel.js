const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        select: false
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

// Hash password before saving
TouristSchema.pre('save', async function (next) {

});

module.exports = mongoose.model('Tourist', TouristSchema);
