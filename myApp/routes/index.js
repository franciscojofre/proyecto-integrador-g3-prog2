var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const indexController = require('../controllers/indexController');


/* GET home page. */
//router.get('/', userController.index);

router.get('/login', userController.login);

router.get('/login/profile', userController.profile);

router.get('/profile', userController.profile);

router.get('/profile/edit', userController.profileEdit);

router.get('/', indexController.products);


module.exports = router;
