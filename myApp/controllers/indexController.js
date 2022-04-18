const productsIndex = require('../db/data')
const listado = productsIndex.products;

const controlador = {
    products: function (req, res) {
        return res.render('index', {
            listaProductos: listado,
        })
    }
}

module.exports = controlador;