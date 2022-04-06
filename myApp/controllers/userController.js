let listaPeriferics = require('../db/dataProducts')


const userController = {
    index: function(req, res) {
        res.render('index', { title: 'Express' });
    },
    login: function(req, res) {
       return res.render('login');
    },
    profile: function (req, res) {
        res.render('profile')
    },
    profileEdit: function (req, res) {
        res.render('profile-edit', {
            lista : listaPeriferics
        })
    },

}


module.exports = userController;