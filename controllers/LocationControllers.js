const Location = require('../models/LocationModel');

const getAllLocations = async (req, res) => {
    const { search, filter } = req.query;

    try {
        let query = {};

        // Add search functionality (case-insensitive search by name)
        if (search) {
            query.name = { $regex: search, $options: "i" }; // Case-insensitive regex search
        }

        // Add filter functionality (filter locations by tag)
        if (filter) {
            query.tags = { $in: [filter] }; // Filter by any tag specified in the query
        }

        // Fetch locations with the query (search and filter)
        const locations = await Location.find(query);

        // If no locations found, send 404 response
        if (locations.length === 0) {
            return res.status(404).json({ message: "No Locations found" });
        }

        // Send the fetched locations
        return res.status(200).json({ locations });
    } catch (err) {
        console.error("Error fetching locations:", err);
        return res.status(500).json({ message: "Error fetching locations", error: err.message });
    }
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

//delete location function
const deleteLocation = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the location by ID
        const deletedLocation = await Location.findByIdAndDelete(id);

        // If no location is found, return a 404 error
        if (!deletedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }

        // Respond with success message
        return res.status(200).json({ message: "Location deleted successfully", location: deletedLocation });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting location", error: err.message });
    }
};

//Update function
const updateLocation = async (req, res) => {
    const { id } = req.params;
    const { name, description, image_url, google_map_url, tags, points } = req.body;

    try {
        // Find and update the location by ID
        const updatedLocation = await Location.findByIdAndUpdate(
            id,
            { name, description, image_url, google_map_url, tags, points },
            { new: true, runValidators: true } // Return the updated document & validate updates
        );

        // If no location is found, return a 404 error
        if (!updatedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }

        // Respond with the updated location
        return res.status(200).json({ message: "Location updated successfully", location: updatedLocation });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating location", error: err.message });
    }
};



exports.getAllLocations= getAllLocations;
exports.createLocation = createLocation;
exports.deleteLocation = deleteLocation;
exports.updateLocation = updateLocation; 