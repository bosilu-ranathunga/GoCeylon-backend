const express = require('express');
const router = express.Router();
const BusinessUserController = require('../controllers/BusinessUserControllers');


router.get('/', BusinessUserController.getAllBusinessUsers);
router.post('/create', BusinessUserController.createBusinessUser);
router.put('/update/:id', BusinessUserController.updateBusinessUser);
router.delete('/delete/:id', BusinessUserController.deleteBusinessUser);


module.exports = router;
