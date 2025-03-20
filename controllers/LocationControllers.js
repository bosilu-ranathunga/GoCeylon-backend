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

const createLocation = async (req, res) => {
    try {
        const { name, description, google_map_url } = req.body;
        
        // Ensure tags and points are parsed properly
        const tags = JSON.parse(req.body.tags);
        const points = JSON.parse(req.body.points);

        // Get uploaded image URLs
        const image_urls = req.files.map(file => `http://localhost:3000/uploads/${file.filename}`);

        const location = new Location({
            name,
            description,
            image_url: image_urls, // Array of images
            google_map_url,
            tags,  // Now correctly parsed
            points // Now correctly parsed
        });

        await location.save();

        res.status(201).json({
            message: 'Location created successfully',
            location
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating location' });
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
        const updatedData = req.body;

        if (req.files) {
            const image_urls = req.files.map(file => `http://localhost:3000/uploads/${file.filename}`);
            updatedData.image_url = image_urls;
        }

        if (updatedData.tags) updatedData.tags = JSON.parse(updatedData.tags);
        if (updatedData.points) updatedData.points = JSON.parse(updatedData.points);

        const updatedLocation = await Location.findByIdAndUpdate(locationId, updatedData, { new: true });

        res.status(200).json({
            message: 'Location updated successfully',
            location: updatedLocation
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating location' });
    }
};

module.exports = {
    getAllLocations,
    createLocation,
    deleteLocation,
    updateLocation
};
