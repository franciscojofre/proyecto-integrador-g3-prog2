const data = require('../db/data');

const productController = {
    detalleProducto: function (req, res) {
        let idSolicitado = req.params.id;
        return res.render('product', {
            listaProductos: data.products,
            idProducto: idSolicitado,
            listaComentarios: data.comments,
        })
    },
    searchResults: function (req, res) { 
        let dataReq = req.query.search; 
        return res.render('search-results', {
            listadoProducts: data.products,
            dataQuery: dataReq
        })
    },
    aniadirProducto: function (req, res) {
        return res.render('product-add')
    }
}


module.exports = productController;
