const express = require('express');
const router = express.Router();
const GuideController = require('../controllers/GuideControllers');

router.get('/', GuideController.getAllGuides);
router.post('/',GuideController.createGuide);
router.put('/update/:id',GuideController.updateGuide);
router.delete('/delete/:id',GuideController.deleteGuide);
router.get('/:id', GuideController.getGuideById);  // Check that this route exists in your backend

module.exports = router;