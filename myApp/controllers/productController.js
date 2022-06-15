const db = require("../database/models");
const productModel = db.Product; /* Cambiar por tablas en el database del proyecto, el alias que le pondre a mi modelo */
const commentModel = db.Comment;
const op = db.Sequelize.Op;

const data = require('../db/data');

const productController = {
    productDetail: function (req, res) {
        let idSolicitado = req.params.id;
        // return res.render('product', {
        //     listaProductos: data.products,
        //     idProducto: idSolicitado,
        //     listaComentarios: data.comments,
        // })
        productModel.findByPk(idSolicitado).then((result) =>{

            // let date = result.release_date;
            // let fechaFormateada = new Date(date).toISOString().slice(0,10);
      
            let product = {
              id: result.id,
              title: result.title,
              descrip: result.descrip,
              comments: result.comments,
              novedad: result.novedad,
              image: result.image,
              createAt: result.createAt,
              user_id: result.user_id
            }
            
            return res.render("product", {
                product: product
            })
        })

    },
    processComment: (req, res) => {
        let info = req.body;
        let dataComment = {
            userName: info.userName,
            commentDescription: info.commentDescription,
            image: info.image
        }
        commentModel.create(dataComment)
        .then((result) => {
            return res.redirect('/')
        })
        .catch((err) => {
            return res.send('El error es: ' + err)
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
        productModel.findAll(filtro)
        .then((result) => {
                res.render('search-results', {listadoProducts: result} )
        }).catch((err) => {
            console.log(err);
        });
    },
    productAdd: function (req, res) {
        return res.render('product-add', {
            userName: data.user.name
        })
    },

}


module.exports = productController;
