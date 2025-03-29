const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: "AIzaSyAu7_I_t-W5KwqGIDn1DL0RxTYE9lUQjls" });
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


exports.getTravelGuide = async (req, res) => {
    try {
        const { query } = req.body;

        // Fetch relevant tourist places from MongoDB
        const places = await TouristPlace.find({ name: { $regex: query, $options: "i" } });

        if (!places.length) {
            return res.json({ reply: "I couldn't find any matching places. Can you be more specific?" });
        }

        // Format data for AI
        const placeDescriptions = places.map(p => `${p.name}: ${p.description}`).join("\n");

        const chat = ai.chats.create({
            model: "gemini-2.0-flash",
            history: [{ role: "user", parts: [{ text: `Tell me about these places in Sri Lanka: ${placeDescriptions}` }] }],
        });

        const response = await chat.sendMessage({ message: query });

        res.json({ reply: response.text || "I couldn't process your request, please try again." });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong." });
    }
};



