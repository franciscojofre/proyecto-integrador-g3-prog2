const db = require("../database/models");
const productModel = db.Product; /* Cambiar por tablas en el database del proyecto, el alias que le pondre a mi modelo */
const commentModel = db.Comment;
const op = db.Sequelize.Op;

//const data = require('../db/data');

const productController = {
    productDetail: function (req, res) {
        let idSolicitado = req.params.id;
        let relations = {
            include: {
                all: true,
                nested: false
            }
        }
        // return res.render('product', {
        //     listaProductos: data.products,
        //     idProducto: idSolicitado,
        //     listaComentarios: data.comments,
        // })

        productModel.findByPk(idSolicitado, {
            include: [
                {association: 'users'}
            ]
        })
        .then((result) =>{

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
              //user_id: result.user_id,
              users: result.users //asociación, un objeto literal que va a tener todas las columnas de user
              //comments: result.comments_association //asociación, un objeto que va a tener todas las columnas de comments
            }
            return res.render("product", {
                product: product
            })
        })
        .catch((err) => {
            console.log('El error es: ' + err)
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
        return res.render('product-add')
    },
    processProductAdd: (req, res) => {
        let info = req.body;
        let fotoProducto = req.file;
        let errors = {};

        if (info.title == "") {
            errors.message = "El nombre esta vacio";
            res.locals.errors = errors;
            return res.render('product-add')
        } else if (info.desc == ""){
            errors.message = "La descripcion esta vacia";
            res.locals.errors = errors;
            return res.render('product-add')
        } else if (fotoProducto == null){
            errors.message = "La foto esta vacia";
            res.locals.errors = errors;
            return res.render('product-add')
        } else {
                let productoNuevo = {
                image: fotoProducto,
                title: info.title,
                descrip: info.desc,
                createAt: new Date(),
            };
        db.Product.create(productoNuevo)
        .then((resultado) => {
            return res.redirect("/")
        })
        .catch((err) => {
            return res.send(err)
        })
        }
    },
    edit: (req, res) => {
        let id = req.params.id;
        db.Product.findByPk(id)
        .then((resultado) => {
            let product = {
                id: resultado.id,
                title : resultado.title,
                descrip : resultado.descrip,
              }

            res.render('product-edit', {
                product: product,
            })
        })
    },
    processEdit: (req, res) => {
        let info = req.body;
        let fotoProducto = req.file;
        let idParaEditar = req.params.id;
        let errors = {};

        if (info.title == "") {
            errors.message = "El nombre esta vacio";
            res.locals.errors = errors;
            return res.render('product-edit')
        } else if (info.desc == ""){
            errors.message = "La descripcion esta vacia";
            res.locals.errors = errors;
            return res.render('product-edit')
        } else if (fotoProducto == null){
            errors.message = "La foto esta vacia";
            res.locals.errors = errors;
            return res.render('product-edit')
        } else {
                let productoEdit = {
                image: fotoProducto,
                title: info.title,
                descrip: info.descrip,
                updateAt: new Date(),
            };
        db.Product.update(productoEdit, {
            where: {
                id: idParaEditar
            }
        })
        .then((resultado) => {
            return res.redirect("/")
        })
        .catch((err) => {
            return res.send(err)
        })
        }
    }
}


module.exports = productController;
