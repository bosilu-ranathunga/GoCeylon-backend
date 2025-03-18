const Location = require('../models/LocationModel');

const getAllLocations = async (req, res) => {
    let locations;
    try {
        locations = await Location.find();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    if (!locations) {
        res.status(404).json({ message: "No Location found" });
    }
    return res.status(200).json({ locations });
};


// Create a new location
const createLocation = async (req, res) => {
    const { name, description, image_url, google_map_url, tags, points } = req.body;

    // Validate the incoming data (basic check, you can extend this)
    if (!name || !description || !image_url || !google_map_url || !tags || !points) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Create a new location instance
        const newLocation = new Location({
            name,
            description,
            image_url,
            google_map_url,
            tags,
            points
        });

        // Save the new location to the database
        const savedLocation = await newLocation.save();

        // Respond with the saved location
        return res.status(201).json({ message: "Location created successfully", location: savedLocation });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error creating location", error: err.message });
    }
};


exports.getAllLocations = getAllLocations;
exports.createLocation = createLocation;