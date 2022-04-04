var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');


/* GET home page. */
router.get('/', userController.index);

router.get('/login', userController.login);

router.get('/profile', userController.profile);

router.get('/profile/edit', userController.profileEdit)




module.exports = router;
