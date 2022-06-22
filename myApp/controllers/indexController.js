const db = require('../database/models');
const products = db.Product; /* Cambiar por tablas en el database del proyecto, el alias que le pondre a mi modelo */
const op = db.Sequelize.Op;

const indexController = {
    products: function (req, res) {
        let relations = {
            all: true,
            nested: true
        }
        products.findAll({order : [["created_at", "DESC"]]}, relations)
        .then((result) => {
            return res.render('index', {
                listaProductos: result
            });   
        })
        .catch(err => console.log(err));

        // return res.render('index', {
        //     listaProductos: productsIndex.products,
        // })
    }
}

module.exports = indexController;