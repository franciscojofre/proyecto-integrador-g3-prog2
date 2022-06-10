const db = require('../database/models');
const products = db.Product; /* Cambiar por tablas en el database del proyecto, el alias que le pondre a mi modelo */
const op = db.Sequelize.Op;

const productsIndex = require('../db/data')


const controlador = {
    products: function (req, res) {
        products.findAll()
            /* where : [{ awards : 1 }, { length : 120}] */
           /*  order : [["title", "ASC"]] */
           /* limit : 5,
           offset : 3 */
        
        .then((result) => {
            return res.render('index', {listaProductos: result});   
        })
        .catch(err => console.log(err));

        // return res.render('index', {
        //     listaProductos: productsIndex.products,
        // })
    }
    // Findproduct : (req, res) => {
    //     let id = req.params.id;
    //     products.findByPk(id).then((result) =>{
    
    //       let date = result.createAt;
    //       let fechaFormateada = new Date(date).toISOString().slice(0,10);
    
    //       let products = {
    //         title : result.title,
    //         descrip : result.descrip,
    //         comments : resul.comments,
    //         novedad : result.novedad,
    //         Image : result.image,
    //         user_id : result.user_id,
    //         createAt : result.createAt
    //       }
    //       return res.render("moviesDetails", {
    //           product : product
    //       })
    //     })
    // }
}

module.exports = controlador;