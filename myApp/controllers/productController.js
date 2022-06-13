const db = require("../database/models");
const products = db.Product; /* Cambiar por tablas en el database del proyecto, el alias que le pondre a mi modelo */
const op = db.Sequelize.Op;

const data = require('../db/data');

const productController = {
    productDetail: function (req, res) {
        let idSolicitado = req.params.id;
        return res.render('product', {
            listaProductos: data.products,
            idProducto: idSolicitado,
            listaComentarios: data.comments,
        })
    },
    searchResults: (req, res) => {
        let queryString = req.query.search;
        let filtro ={
            where :{
             [op.or]: [
               { title: { [op.like]: `%${queryString}%` } },
               { descrip: { [op.like]: `%${queryString}%` } }
             ]
           }
           }
        products.findAll(filtro)
        .then((result) => {
                res.render('search-results', { listadoProducts : result } )
        }).catch((err) => {
            console.log(err);
        });
    },
    productAdd: function (req, res) {
        return res.render('product-add', {
            userName: data.user.name
        })
    }
}


module.exports = productController;
