const productsIndex = require('../db/dataProducts')
const listado = productsIndex.lista;

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