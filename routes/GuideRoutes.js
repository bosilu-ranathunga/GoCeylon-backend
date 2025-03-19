const express = require('express');
const router = express.Router();
const GuideController = require('../controllers/GuideControllers');

router.get('/', GuideController.getAllGuides);

module.exports = router;