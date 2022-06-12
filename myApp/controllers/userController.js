const db = require('../database/models');
const user = db.user;


const userController = {
    login: function(req, res) {
       return res.render('login', {
        userName: data.user.name,
       })
    },
    register: function (req, res) {
        return res.render('register')
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
    procesarRegister: (req, res) => {
        let info = req.body;
        // let imgPerfil = req.file.filename;
        /* Crear un obj literal vacio */
        let errors = {};
        if (info.name == "") {
            errors.message = "El nombre esta vacio";
            res.locals.errors = errors;
            return res.render('registerUser')
        }else if(info.email == ""){
            errors.message = "El email esta vacio";
            res.locals.errors = errors;
            return res.render('registerUser')
        } else {
            let usuario = {
                name: info.name,
                email: info.email,
                password: info.password, //poner hashing
                remember_token: "false",
                created_at: new Date(),
                updated_at:  new Date(),
                // img: imgPerfil
            }
            db.user.create(usuario)
            .then((result) => {
                return res.redirect("/user/login")
            }).catch((err) => {
            });
        }
    },

}

module.exports = userController;