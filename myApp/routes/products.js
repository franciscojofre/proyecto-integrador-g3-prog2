const express = require('express');
const router = express.Router();
const keyboardController = require('../controllers/productController');


router.get('/', keyboardController.index);


module.exports = router;