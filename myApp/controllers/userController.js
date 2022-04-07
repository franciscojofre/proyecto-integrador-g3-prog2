const periferics = require('../db/dataProducts');
let listadoPeriferics = periferics.lista;


const userController = {
    login: function(req, res) {
       return res.render('login')
    },
    register: function (req, res) {
        return res.render('register')
    },
    profile: function (req, res) {
        res.render('profile', {
            listadoProducts: listadoPeriferics,
        })
    },
    profileEdit: function (req, res) {
        res.render('profile-edit')
    },

}


module.exports = userController;