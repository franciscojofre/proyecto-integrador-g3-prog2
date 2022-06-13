const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/id/:id', productController.productDetail);

router.get('/search-results', productController.searchResults);

router.get('/product-add', productController.productAdd);

module.exports = router;