const db = require('../database/models');
const products = db.Product; /* Cambiar por tablas en el database del proyecto, el alias que le pondre a mi modelo */
const op = db.Sequelize.Op;

const controlador = {
    products: function (req, res) {
        products.findAll({
            include: [
                {association: 'users'}
            ]
        })
            /* where : [{ awards : 1 }, { length : 120}] */
           /*  order : [["title", "ASC"]] */
           /* limit : 5,
           offset : 3 */
        
        .then((result) => {
            let users = result.users
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

module.exports = controlador;