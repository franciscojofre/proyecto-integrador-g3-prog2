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
            },
            
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
      
            let productInfo = {
              id: result.id,
              title: result.title,
              descrip: result.descrip,
              comments: result.comments,
              novedad: result.novedad,
              image: result.image,
              created_at: result.created_at,
              //user_id: result.user_id,
              users: result.users, //asociación, un objeto literal que va a tener todas las columnas de user
              //comments: result.comments_association //asociación, un objeto que va a tener todas las columnas de comments
              user_id: result.user_id
            }
            return res.render("product", {
                product: productInfo
            })
        })
        .catch((err) => {
            console.log('El error es: ' + err)
        })
    },
    searchResults: (req, res) => {
        // let relations = {
        //     include: {
        //         all: true,
        //         nested: true
        //     }
        // }
        let queryString = req.query.search;
        let filtro = {
            where :{
             [op.or]: [
               {title: {[op.like]: `%${queryString}%`}},
               {descrip: {[op.like]: `%${queryString}%`}}
             ]
           },
           include: {
            all: true,
            nested: false
            }
        }
           
        productModel.findAll(filtro)
        .then((result) => {
            res.render('search-results', {
                listProducts: result,
            });
        }).catch((err) => {
            console.log(err);
        });
    },
    productAdd: function (_req, res) {
        return res.render('product-add')
    },
    processProductAdd: (req, res) => {
        let info = req.body;
        let fotoProducto = req.file.filename;
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
                created_at: new Date(),
                user_id: info.userId
            };
        productModel.create(productoNuevo)
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
        let fotoProducto = req.file.filename;
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
    },
    processComment: (req, res) => {
        let info = req.body;

        let relations = {
            include: {
                all: true,
                nested: false
            }
        }

        let comentarioNuevo = {
            comment_description: info.commentDescription,
            user_id: info.user_id,
            product_id: info.product_id,
            create_at: new Date(),
        };
    commentModel.create(comentarioNuevo)
    .then((comentario) => {
        return res.redirect("/product/id/" + comentarioNuevo.product_id)
    })
    .catch((err) => {
        return res.send(err)
    })
    },
}


module.exports = productController;
