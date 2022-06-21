const db = require('../database/models');
const products = db.Product; /* Cambiar por tablas en el database del proyecto, el alias que le pondre a mi modelo */
const op = db.Sequelize.Op;

const indexController = {
    index: function (req, res) {
        let filter = {
            order : [["created_at", "DESC"]],
            include: {
                all: true,
                nested: false
            }
        }
        products.findAll(filter)
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