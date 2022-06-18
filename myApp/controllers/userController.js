const db = require("../database/models");
const userModel = db.User;
const commentModel = db.Comment;

/* Requerir mi modulo instalado */
const bcrypt = require('bcryptjs');
const data = require("../db/data");

const userController = {
    login : (req, res) => {
            return res.render('login')
    },
    processLogin: (req, res) => {
        let info = req.body;
        let filtro = {where : [ { email : info.email}]};
        let errors = {};

        if (info.email == '') {
            errors.message = '"El email esta vacío';
            res.locals.errors = errors;
            return res.render('login');
        }else if (info.contrasenia == '') {
            errors.message = 'La contraseña esta vacía';
            res.locals.errors = errors;
            return res.render('login');
        } else {
        userModel.findOne(filtro)
        .then((result) => {
            if (result != null) {
                let passEncriptada = bcrypt.compareSync(info.contrasenia , result.contrasenia)
                if (passEncriptada) {

                    req.session.user = result.dataValues;

                    if (req.body.remember != undefined) {
                        res.cookie('userId', result.dataValues.id, {maxAge : 1000 * 60 *10 } )
                    }
                    return res.redirect("/")
                } else {
                    errors.message = "El email existe, pero la contraseña es incorrecta";
                    res.locals.errors = errors;
                    return res.render('login');
                }
            } else {
                errors.message = "El email no existe";
                res.locals.errors = errors;
                return res.render('login');
            }
        }).catch((err) => {
            console.log('El error es: ' + err)
        });
        }

    },
    logout : (req, res) => {
        req.session.destroy();
        res.clearCookie('userId');
        return res.render('login')
    },
    profile: function (req, res) {
        res.render('profile', {
            listadoProducts: data.products,
            userInfo: data.user,
            userName: data.user.name
        })
    },
    profileEdit: function (req, res) {
        res.render('profile-edit', {
            userName: data.user.name
        })
    },
    register: function (req, res) {
            return res.render('register')
    },
    processRegister: (req, res) => {
        let info = req.body;
        let fotoPerfil = req.file;  //ver esto si no se le debe agregar .filename
        
        let errors = {}

        if (info.nombre == '') {
            errors.message = 'El nombre esta vacío'
            res.locals.errors = errors
            return res.render('register')
        } else if (info.apellido == ''){
            errors.message = 'El apellido esta vacío'
            res.locals.errors = errors
            return res.render('register')
        } else if (info.email == ''){
            errors.message = 'El email esta vacío'
            res.locals.errors = errors
            return res.render('register')
        } else if (info.contrasenia == ''){
            errors.message = 'La contraseña esta vacía'
            res.locals.errors = errors
            return res.render('register')
        } else if (info.fechaNacimiento === ''){
            errors.message = 'La fecha de nacimiento esta vacía'
            res.locals.errors = errors
            return res.render('register')
        } else if (info.numeroDocumento == ''){
            errors.message = 'El numero de documento esta vacío'
            res.locals.errors = errors
            return res.render('register')
        } else{
            let dataUser = {
                nombre: info.nombre,
                apellido: info.apellido,
                email: info.email,
                contrasenia: bcrypt.hashSync(info.contrasenia, 10),
                fecha_nacimiento: info.fechaNacimiento,
                created_at: new Date(),
                numero_documento: info.numeroDocumento,
                foto_perfil: fotoPerfil
            }
            userModel.create(dataUser)
            .then((result) => {
                return res.redirect('/user/login')    
            })
            .catch((err) => {
                return res.send('El error es: ' + err)
            });
        }
    }
}

module.exports = userController;