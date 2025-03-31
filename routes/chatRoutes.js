const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

router.post("/", authMiddleware(['tourist']), chatController.getCatResponse);
router.post("/ai-guide", authMiddleware(['tourist']), chatController.getTravelGuide);

module.exports = router;