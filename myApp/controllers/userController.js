const data = require('../db/data');
let listadoPeriferics = data.periferics;
let listadoComments = data.user;

const userController = {
    login: function(req, res) {
       return res.render('login', {
        listaComentarios: listadoComments,
       })
    },
    register: function (req, res) {
        return res.render('register')
    },
    profile: function (req, res) {
        res.render('profile', {
            listadoProducts: listadoPeriferics,
            listaComentarios: listadoComments,
        })
    },
    profileEdit: function (req, res) {
        res.render('profile-edit')
    },

}

module.exports = userController;