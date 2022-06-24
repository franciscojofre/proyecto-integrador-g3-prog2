const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Importaciones
let multer = require('multer');
let path = require('path')

//configuración multer
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
            cb(null, path.join(__dirname, '../public/images/users'));  
    },
    filename: function(req, file, cb) {
                // foto_perfil-234242323432.extensionFile
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

let upload = multer({storage: storage});

router.get('/register', userController.register); 

router.post('/register', upload.single('foto_perfil'), userController.processRegister) 

router.get('/login', userController.login);

router.post('/login', userController.processLogin); 

router.get('/logout', userController.logout);

router.get('/profile/:id', userController.profile);

router.post('/profile/:id', userController.follow);
router.post('/profile/:id/unfollow', userController.unfollow);

router.get('/profile/edit/:id', userController.profileEdit);

router.post('/profile/edit/:id', upload.single('imgPerfil'), userController.profileUpdate),

module.exports = router;