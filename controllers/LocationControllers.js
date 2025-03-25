const Location = require('../models/LocationModel');

const getAllLocations = async (req, res) => {
    try {
        const { tag } = req.query;
        const query = tag ? { tags: tag } : {};
        const locations = await Location.find(query);

        res.status(200).json({ locations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching locations' });
    }
};

const getLocationById = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await Location.findById(id);

        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json(location);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching location' });
    }
};

const createLocation = async (req, res) => {
    try {
        const { name, description, google_map_url } = req.body;

        // Ensure tags and points are properly parsed
        const tags = req.body.tags ? JSON.parse(req.body.tags) : [];
        const points = req.body.points ? JSON.parse(req.body.points) : [];

        // Get uploaded image URLs
        const image_urls = req.files ? req.files.map(file => `http://localhost:3000/uploads/${file.filename}`) : [];

        const location = new Location({
            name,
            description,
            image_url: image_urls, // Store image URLs
            google_map_url,
            tags,
            points
        });

        await location.save();

        res.status(201).json({
            message: "Location created successfully",
            location
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating location" });
    }
};

const deleteLocation = async (req, res) => {
    try {
        const locationId = req.params.id;
        await Location.findByIdAndDelete(locationId);

        res.status(200).json({ message: 'Location deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting location' });
    }
};

const updateLocation = async (req, res) => {
    try {
        const locationId = req.params.id;

        // Manually process the form data to extract the necessary fields
        let updatedData = {
            name: req.body.name,
            description: req.body.description,
            google_map_url: req.body.google_map_url,
            tags: JSON.parse(req.body.tags), // Assuming tags were stringified in the frontend
            points: JSON.parse(req.body.points), // Assuming points were stringified in the frontend
        };

        let existingImages = [];
        if (req.body.existingImages) {
            existingImages = JSON.parse(req.body.existingImages); // Parse the existing images if available
        }

        let newImages = [];
        if (req.files && req.files.length > 0) {
            newImages = req.files.map(file => `http://localhost:3000/uploads/${file.filename}`); // Handle the new image files
        }

        // Combine the existing and new images
        updatedData.image_url = [...existingImages, ...newImages];

        // Update the location using the new data
        const updatedLocation = await Location.findByIdAndUpdate(locationId, updatedData, { new: true });

        res.status(200).json({ message: "Location updated successfully", location: updatedLocation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating location" });
    }
};



module.exports = {
    getAllLocations,
    createLocation,
    deleteLocation,
    updateLocation,
    getLocationById
};
