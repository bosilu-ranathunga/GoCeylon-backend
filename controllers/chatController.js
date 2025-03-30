const Location = require('../models/LocationModel');
//const { GoogleGenAI } = require("@google/genai");
//const ai = new GoogleGenAI({ apiKey: "AIzaSyAu7_I_t-W5KwqGIDn1DL0RxTYE9lUQjls" });
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyAu7_I_t-W5KwqGIDn1DL0RxTYE9lUQjls");

let chatHistory = [];



exports.getCatResponse = async (req, res) => {
    try {
        const userMessage = req.body.message;

        // Append user message to history
        chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

        // Create chat session with history
        const chat = ai.chats.create({
            model: "gemini-2.0-flash",
            history: chatHistory,
        });

        // Send user message to AI
        const response = await chat.sendMessage({ message: userMessage });

        // Append bot response to history
        chatHistory.push({ role: "model", parts: [{ text: response.text }] });

        res.json({ reply: response.text || "Meow?" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong." });
    }
};

/*
exports.getTravelGuide = async (req, res) => {
    try {
        const { query } = req.body;

        // Fetch relevant tourist places from MongoDB
        const places = await Location.find({ name: { $regex: query, $options: "i" } });

        if (!places.length) {
            return res.json({ reply: "I couldn't find any matching places. Can you be more specific?" });
        }

        // Format data for AI
        const placeDescriptions = places.map(p => `${p.name}: ${p.description}`).join("\n");
        

        const placePontDescriptions = "this is the 1500 step of the Adam peak(sripadaya). You have 4000 steps left to climb. And there are shops a hundred meters ahead where you can relst."

        const chat = ai.chats.create({
            model: "gemini-2.0-flash",
            history: [{ role: "user", parts: [{ text: `Tell me about these places in Sri Lanka: ${placePontDescriptions}` }] }],
        });

        const response = await chat.sendMessage({ message: query });

        res.json({ reply: response.text || "I couldn't process your request, please try again." });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong." });
    }

    try {
        const placePointDescriptions = "This is the 1500th step of Adam's Peak (Sri Pada). You have 4000 steps left to climb. There are shops a hundred meters ahead where you can rest.";

        // AI Prompt
        const userQuery = `Tell me about this point of places: ${placePointDescriptions}`;

        // Initialize the model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate AI Response
        const result = await model.generateContent(userQuery);
        const responseText = result.response.text() || "I couldn't process your request, please try again.";

        // AI Guidance for better responses
        const aiGuidance = `When responding to travel-related queries, provide:
                1️⃣ A brief historical or cultural background.
                2️⃣ Useful tips (best time to visit, weather, precautions).
                3️⃣ Nearby facilities (restaurants, hotels, rest stops).
                4️⃣ Encouraging or safety advice based on location details.`;

        res.json({
            reply: responseText,
            guidance: aiGuidance
        });

    } catch (error) {
        console.error("Error fetching AI response:", error);
        res.status(500).json({ error: "Something went wrong while processing your request." });
    }

};
*/

/*
exports.getTravelGuide = async (req, res) => {
    try {
        const placePointDescriptions = "This is the 1500th step of Adam's Peak (Sri Pada). You have 4000 steps left to climb. There are shops a hundred meters ahead where you can rest.";

        const userQuery = `Tell me about this point of places: ${placePointDescriptions}`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(userQuery);
        const responseText = result.response.text() || "I couldn't process your request, please try again.";

        const aiGuidance = `When responding to travel-related queries, provide:
            1️⃣ A brief historical or cultural background.
            2️⃣ Useful tips (best time to visit, weather, precautions).
            3️⃣ Nearby facilities (restaurants, hotels, rest stops).
            4️⃣ Encouraging or safety advice based on location details.`;

        res.json({
            reply: responseText,
            guidance: aiGuidance
        });

    } catch (error) {
        console.error("Error fetching AI response:", error);
        res.status(500).json({ error: "Something went wrong while processing your request." });
    }
};
*/


exports.getTravelGuide = async (req, res) => {
    try {
        const placeDescription = "This is the 1500th step of Adam's Peak (Sri Pada). You have 4000 steps left to climb. There are shops a hundred meters ahead where you can rest.";


        if (!placeDescription) {
            return res.status(400).json({ error: "Please provide a place description." });
        }

        const userQuery = `Tell me about this point of places: ${placeDescription}`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(userQuery);
        const responseText = result.response.text() || "I couldn't process your request, please try again.";

        const aiGuidance = `When responding to travel-related queries, provide:
            1️⃣ A brief historical or cultural background.
            2️⃣ Useful tips (best time to visit, weather, precautions).
            3️⃣ Nearby facilities (restaurants, hotels, rest stops).
            4️⃣ Encouraging or safety advice based on location details.`;

        // Refine the response based on guidance.
        const refinedQuery = `${responseText} \n\n ${aiGuidance}`;

        const refinedResult = await model.generateContent(refinedQuery);
        const refinedResponseText = refinedResult.response.text() || responseText; // Use original if refinement fails.

        res.json({
            reply: refinedResponseText,
            guidance: aiGuidance
        });

    } catch (error) {
        console.error("Error fetching AI response:", error);
        res.status(500).json({ error: "Something went wrong while processing your request." });
    }
};

