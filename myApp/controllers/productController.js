const periferics = require('../db/dataProducts');

let listadoPeriferics = periferics.lista;
let listadoComments = periferics.comments;

const productController = {
    detalleProducto: function (req, res) {
        let idSolicitado = req.params.id;
        return res.render('product', {
            listaProductos: listadoPeriferics,
            idProducto: idSolicitado,
            listaComentarios: listadoComments,
        })
    },
    create: function (req, res) { 
        let dataReq = req.query.search; 
        return res.render('search-results', {
            listadoProducts: listadoPeriferics,
            dataQuery: dataReq
        })
    },
    aniadirProducto: function (req, res) {
        res.render('product-add')
    }
}


module.exports = productController;
