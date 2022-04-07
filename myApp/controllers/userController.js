const data = require('../db/dataProducts');

let dataUser = data.user;

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