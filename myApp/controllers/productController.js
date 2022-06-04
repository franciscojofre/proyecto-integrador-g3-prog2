const db = require("../database/models");
const products = db.Product; /* Cambiar por tablas en el database del proyecto, el alias que le pondre a mi modelo */
const op = db.Sequelize.Op;

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
        return res.render('product-add', {
            userName: data.user.name
        })
    }
}


module.exports = productController;
