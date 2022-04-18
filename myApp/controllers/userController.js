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
            userInfo: data.user
        })
    },
    profileEdit: function (req, res) {
        res.render('profile-edit')
    },
    headerLogueadoName: function (req, res) {
        res.render('headerLogueado', {
            userName: data.user.name
        })
    }
}

module.exports = userController;