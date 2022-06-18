const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/id/:id', productController.productDetail);
// router.post('', productController.processComment);

router.get('/search-results', productController.searchResults);

router.get('/product-add', productController.productAdd);
router.post('/product-add', productController.processProductAdd);

module.exports = router;