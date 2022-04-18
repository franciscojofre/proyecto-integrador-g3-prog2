const productsIndex = require('../db/data')
const listado = productsIndex.products;

const controlador = {
    products: function (req, res) {
        //let idProducto = req.params.id;
        return res.render('index', {
            listaProductos: listado,
            //productId: idProducto,
        })
    }
}

module.exports = controlador;