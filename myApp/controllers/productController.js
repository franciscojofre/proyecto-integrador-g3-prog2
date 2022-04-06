const products = require('../db/dataProducts');
const listado = products.lista;

const controlador = {
    detalleProducto: function (req, res) {
        let idSolicitado = req.params.id;
        return res.render('product', {
            listaProductos: listado,
            idProducto: idSolicitado,
        })
    }
}

module.exports = controlador;