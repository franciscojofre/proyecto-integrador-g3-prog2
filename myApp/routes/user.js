const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Importaciones
let multer = require('multer');
let path = require('path')//Modulo para manipular rutas y directorios

//configuración multer
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
            cb(null, path.join(__dirname, '../public/images/users'));  //dirname me trae la ruta de user
    },
    filename: function(req, file, cb) {
                // fotoperfil-234242323432.extensionFile
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
})

let upload = multer({storage: storage});

router.get('/register', userController.register); //ruta por GET que envía el formulario de creación

router.post('/register', upload.single('foto_perfil'), userController.processRegister) //ruta por POST que procesa la información del formulario

router.get('/login', userController.login);

router.post('/login', userController.processLogin); 

router.get('/logout', userController.logout);

router.get('/login/profile', userController.profile);

router.get('/profile/id/:id', userController.profile);

router.get('/profile/edit', userController.profileEdit);

router.post('/profile/edit', upload.single('imgPerfil'), userController.profileUpdate),


module.exports = router;