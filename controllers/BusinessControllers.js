const Business = require('../models/BusinessModel');
const multer = require('multer');
const path = require('path');

// Multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'ownerPhoto', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]);

// Helper function to send response
const sendResponse = (res, status, message, data = null) => {
    return res.status(status).json({ message, data });
};

// Create a new business
const createBusiness = async (req, res) => {
    const { businessUserId, business_name, business_category, contact_number, address, description, openingHours } = req.body;

    if (!businessUserId || !business_name || !business_category || !contact_number || !address || !openingHours) {
        return sendResponse(res, 400, "All required fields must be provided");
    }

    if (!req.files || !req.files.ownerPhoto || !req.files.images) {
        return sendResponse(res, 400, "Owner photo and images are required");
    }

    const ownerPhoto = req.files.ownerPhoto[0].path;
    const images = req.files.images.map(file => file.path);

    try {
        const newBusiness = new Business({
            business_user: businessUserId,
            business_name,
            business_category,
            contact_number,
            address,
            description,
            ownerPhoto,
            images,
            openingHours
        });

        const savedBusiness = await newBusiness.save();
        sendResponse(res, 201, "Business created successfully", savedBusiness);
    } catch (error) {
        sendResponse(res, 500, "Error creating business", error.message);
    }
};

// Get all businesses
const getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find().populate('business_user', 'name email');
        sendResponse(res, 200, "Businesses fetched successfully", businesses);
    } catch (error) {
        sendResponse(res, 500, "Error fetching businesses", error.message);
    }
};

// Get a single business by ID
const getBusinessById = async (req, res) => {
    const { id } = req.params;

    try {
        const business = await Business.findById(id).populate('business_user', 'name email');
        if (!business) {
            return sendResponse(res, 404, "Business not found");
        }
        sendResponse(res, 200, "Business fetched successfully", business);
    } catch (error) {
        sendResponse(res, 500, "Error fetching business", error.message);
    }
};

// Update a business by ID
const updateBusiness = async (req, res) => {
    const { id } = req.params;
    const { business_name, business_category, contact_number, address, description, openingHours } = req.body;

    if (!business_name || !business_category || !contact_number || !address || !openingHours) {
        return sendResponse(res, 400, "All required fields must be provided");
    }

    let ownerPhoto, images;
    if (req.files) {
        ownerPhoto = req.files.ownerPhoto ? req.files.ownerPhoto[0].path : undefined;
        images = req.files.images ? req.files.images.map(file => file.path) : undefined;
    }

    try {
        const updatedBusiness = await Business.findByIdAndUpdate(
            id,
            {
                business_name,
                business_category,
                contact_number,
                address,
                description,
                openingHours,
                ...(ownerPhoto && { ownerPhoto }),
                ...(images && { images })
            },
            { new: true }
        );

        if (!updatedBusiness) {
            return sendResponse(res, 404, "Business not found");
        }

        sendResponse(res, 200, "Business updated successfully", updatedBusiness);
    } catch (error) {
        sendResponse(res, 500, "Error updating business", error.message);
    }
};

// Delete a business by ID
const deleteBusiness = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBusiness = await Business.findByIdAndDelete(id);
        if (!deletedBusiness) {
            return sendResponse(res, 404, "Business not found");
        }
        sendResponse(res, 200, "Business deleted successfully", deletedBusiness);
    } catch (error) {
        sendResponse(res, 500, "Error deleting business", error.message);
    }
};

module.exports = { createBusiness, getAllBusinesses, getBusinessById, updateBusiness, deleteBusiness, upload };
