const keyboards = require('../db/dataProducts');

let hola = keyboards

const keyboardController = {
    index: function (req, res) {
        return res.render('indexPrueba', {
            welcome: hola
        })
    }
}


module.exports = keyboardController;