const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post("/", chatController.getCatResponse);
router.post("/ai-guide", chatController.getTravelGuide);

module.exports = router;