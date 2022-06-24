const db = require('../database/models');
const products = db.Product;
const op = db.Sequelize.Op;

const indexController = {
    products: function (req, res) {
        // let relation = {
        //     include: [
        //         {association: 'users'},
        //         {association: 'comments'}
        //     ]
        // }
        let filter = {
            order : [["createdAt", "DESC"]],
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
        .catch(err => console.log('El error es' + err));
    }
}

module.exports = indexController;