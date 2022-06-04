const db = require("../database/models");
const products = db.Product; /* Cambiar por tablas en el database del proyecto, el alias que le pondre a mi modelo */
const op = db.Sequelize.Op;

const productsIndex = require('../db/data')


const controlador = {
    products: function (req, res) {
        return res.render('index', {
            listaProductos: productsIndex.products,
        })
    }
}

module.exports = controlador;