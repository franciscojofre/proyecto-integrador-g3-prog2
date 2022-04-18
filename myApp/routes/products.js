const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/id/:id', productController.detalleProducto);

router.get('/search-results', productController.searchResults);

router.get('/product-add', productController.aniadirProducto);

module.exports = router;