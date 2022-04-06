const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/search-results', productController.create)


module.exports = router;