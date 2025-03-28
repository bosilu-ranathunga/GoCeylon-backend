const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RfidSchema = new Schema({
    rfidTagCode: {
        type: String,
        required: [true, 'RFID Tag Code is required'],
        unique: true
    },
    fullName: {
        type: String,
        required: [true, 'Full Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone Number is required']
    },
    nationality: {
        type: String,
        required: [true, 'Nationality is required']
    },
    passportNumber: {
        type: String,
        required: [true, 'Passport Number is required'],
        unique: true
    },
    walletAmount: {
        type: Number,
        default: 0
    },
    birthday: {
        type: Date,
        required: [true, 'Birthday is required']
    }
}, { timestamps: true });

module.exports = mongoose.model('RfidModel', RfidSchema);
