const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For hashing passwords before storing them in the database
const Schema = mongoose.Schema;

const BusinessUserSchema = new Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true // Ensures no duplicate emails in the database
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'], 
        select: false // Prevents password from being returned in queries by default
    },
    business_name: { 
        type: String, 
        required: [true, 'Business name is required'] 
    },
    business_category: { 
        type: String, 
        required: [true, 'Business category is required'] 
    },
    dob: { 
        type: Date, 
        required: [true, 'Date of Birth is required'] 
    },
    contact_number: { 
        type: String, 
        required: [true, 'Contact number is required'],
        unique: true // Ensures no duplicate contact numbers
    },
    address: { 
        type: String, 
        required: [true, 'Address is required'] 
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

// **Middleware to hash the password before saving the document**
BusinessUserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if password is new/changed
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next();
    } catch (error) {
        next(error); // Pass any errors to the next middleware
    }
});

module.exports = mongoose.model('BusinessUser', BusinessUserSchema);
