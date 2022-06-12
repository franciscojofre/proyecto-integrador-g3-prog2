const db = require('../database/models');
const Model = db.User;

const data = require('../db/data');


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
        let dataUser = {
            nombre: info.nombre,
            apellido: info.apellido,
            email: info.email,
            contrasenia: info.contrasenia, //poner hashing
            created_at: info.fechaNacimiento,
            numeroDocumento: info.numeroDocumento
        }
        console.log(info)
        Model.create(dataUser)
        .then((result) => {
            return res.redirect('/user/login')    
        }).catch((err) => {
            return res.send('El error es: ' + err)
        });
    }
}

module.exports = userController;