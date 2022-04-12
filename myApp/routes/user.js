const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/register', userController.register)

router.get('/login', userController.login);

router.get('/login/profile', userController.profile);

router.get('/profile', userController.profile);

router.get('/profile/edit', userController.profileEdit);

module.exports = router;