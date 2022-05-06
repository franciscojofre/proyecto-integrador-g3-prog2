const productsIndex = require('../db/data')

const controlador = {
    products: function (req, res) {
        return res.render('index', {
            listaProductos: productsIndex.products,
        })
    }
}

module.exports = controlador;