const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/products'))
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

let upload = multer({storage: storage})

router.get('/id/:id', productController.productDetail);

router.get('/search-results', productController.searchResults);

router.get('/product-add', productController.productAdd);
router.post('/product-add', upload.single('imgProduct'), productController.processProductAdd);

router.get('/product-edit/:id', productController.edit); 
router.post('/product-edit/:id', upload.single('imgProduct'), productController.processEdit);

router.post('/id/:id/delete', productController.deleteProduct)
router.post('/id/:id', productController.processComment);

module.exports = router;