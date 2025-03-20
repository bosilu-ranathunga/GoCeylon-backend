const express = require('express');
const router = express.Router();
const GuideController = require('../controllers/GuideControllers');

router.get('/', GuideController.getAllGuides);
router.post('/', GuideController.createGuide);
module.exports = router;