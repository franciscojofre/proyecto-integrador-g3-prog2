const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/imgProduct'))
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

let upload = multer({storage: storage})

router.get('/id/:id', productController.productDetail);
// router.post('', productController.processComment);

router.get('/search-results', productController.searchResults);

router.get('/product-add', productController.productAdd);
router.post('/product-add', upload.single('imgProduct'), productController.processProductAdd);

module.exports = router;