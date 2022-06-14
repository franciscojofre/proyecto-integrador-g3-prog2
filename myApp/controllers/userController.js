const db = require("../database/models");
const userModel = db.User;

/* Requerir mi modulo instalado */
const bcrypt = require('bcryptjs');

bcrypt.compare
const userController = {
    login : (req, res) => {
        return res.render("login")
    },
    procesarLogin : (req, res) => {
        let info = req.body;
        let filtro = {where : [ { email : info.email}]};
        let errors = {};

        if (info.email == "") {
            errors.message = "El email esta vacio";
            res.locals.errors = errors;
            return res.render('login');
            
        }else if(info.password == ""){
            errors.message = "El password esta vacio";
            res.locals.errors = errors;
            return res.render('login'); 
        } else {
             /* debe ir en el else */
        userModel.findOne(filtro)
        .then((result) => {
            
            if (result != null) {

                let passEncriptada = bcrypt.compareSync(info.password , result.password)
                if (passEncriptada) {

                    /* Poniendo en session al usuario */
                    req.session.user = result.dataValues;

                    if (req.body.remember != undefined) {
                        res.cookie('userId', result.dataValues.id, {maxAge : 1000 * 60 *10 } )
                    }

                    return res.redirect("/")
                } else {
                    errors.message = "El mail existe pero la password es incorrecta";
                    res.locals.errors = errors;
                    return res.render('login');
                }
               
            } else {
                errors.message = "El mail no existe";
                res.locals.errors = errors;
                return res.render('login');
            }
        }).catch((err) => {
            console.log(err)
        });
        }
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
        let dataUser = {
            nombre: info.nombre,
            apellido: info.apellido,
            email: info.email,
            contrasenia: bcrypt.hashSync(info.contrasenia, 10), //poner hashing
            created_at: info.fechaNacimiento,
            updated_at: new Date(),
            numeroDocumento: info.numeroDocumento
        }
        console.log(info)
        userModel.create(dataUser)
        .then((result) => {
            return res.redirect('/user/login')    
        }).catch((err) => {
            return res.send('El error es: ' + err)
        });
    }
}

module.exports = userController;