const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/register', userController.register); //ruta por GET que envía el formulario de creación

router.post('/register', userController.procesarRegister) //ruta por POST que procesa la información del formulario

router.get('/login', userController.login);

router.post('/login', userController.procesarLogin); 

router.get('/login/profile', userController.profile);

router.get('/profile', userController.profile);

router.get('/profile/edit', userController.profileEdit);

module.exports = router;