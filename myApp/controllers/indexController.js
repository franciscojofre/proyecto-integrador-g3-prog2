const db = require('../database/models');
const products = db.Product; /* Cambiar por tablas en el database del proyecto, el alias que le pondre a mi modelo */
const op = db.Sequelize.Op;

const indexController = {
    products: function (req, res) {
        products.findAll({order : [["createdAt", "DESC"]]}, {include: [{association: 'users'}]})

            /* where : [{ awards : 1 }, { length : 120}] */
           /* limit : 5,
           offset : 3 */
        
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