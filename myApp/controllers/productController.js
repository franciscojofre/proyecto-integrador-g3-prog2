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
                nested: true,
            }, order : [["comments", "created_at", "DESC"]]
        }
        // return res.render('product', {
        //     listaProductos: data.products,
        //     idProducto: idSolicitado,
        //     listaComentarios: data.comments,
        // })

        productModel.findByPk(idSolicitado, relations)
        .then((result) =>{

            // let date = result.release_date;
            // let fechaFormateada = new Date(date).toISOString().slice(0,10);
      
            // let product = {
            //   id: result.id,
            //   title: result.title,
            //   descrip: result.descrip,
            //   comments: result.comments,
            //   novedad: result.novedad,
            //   image: result.image,
            //   createAt: result.createAt,
            //   //user_id: result.user_id,
            //   users: result.users, //asociación, un objeto literal que va a tener todas las columnas de user
            //   //comments: result.comments_association //asociación, un objeto que va a tener todas las columnas de comments
            //   user_id: result.user_id
            // }
            return res.render("product", {
                product: result.dataValues
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
        let errors = {};

        if (info.imgProduct == null && info.title == "" && info.desc == ""){
            errors.message = "Todos los campos son obligatorios";
            res.locals.errors = errors;
            return res.render('product-add')
        } else if (info.title == "") {
            errors.message = "El nombre esta vacio";
            res.locals.errors = errors;
            return res.render('product-add')
        } else if (info.desc == ""){
            errors.message = "La descripcion esta vacia";
            res.locals.errors = errors;
            return res.render('product-add')
        } else {
                let productoNuevo = {
                image: '',
                title: info.title,
                descrip: info.desc,
                createAt: new Date(),
                user_id: info.userId
            };
            if(req.file != undefined) {
                productoNuevo.image = req.file.filename;
            } else {
                errors.message = "La foto esta vacia";
                res.locals.errors = errors;
                return res.render('product-add')
            }
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
                image : resultado.image,
              }

            res.render('product-edit', {
                product: product,
            })
        })
    },
    processEdit: (req, res) => {
        let info = req.body;
        let idParaEditar = req.params.id;
        let errors = {};

        if (info.imgProduct == null && info.title == "" && info.desc == ""){
            errors.message = "Todos los campos son obligatorios";
            res.locals.errors = errors;
            return res.render('product-edit', {product: info})
        } else if (info.title == "") {
            errors.message = "El nombre esta vacio";
            res.locals.errors = errors;
            return res.render('product-edit', {product: info})
        } else if (info.desc == ""){
            errors.message = "La descripcion esta vacia";
            res.locals.errors = errors;
            return res.render('product-edit', {product: info})
        } else {
                let productoEdit = {
                    id: req.params.id,
                    image: '',
                    title: info.title,
                    descrip: info.descrip,
                    updateAt: new Date(),
                }
            if(req.file != undefined) {
                productoEdit.image = req.file.filename;
            } else {
                errors.message = "La foto esta vacia";
                res.locals.errors = errors;
                return res.render('product-edit', {product: info})
            }
        db.Product.update(productoEdit, {
            where: {
                id: idParaEditar
            }
        })
        .then((resultado) => {
            return res.redirect("/product/id/" + productoEdit.id)
        })
        .catch((err) => {
            return res.send(err)
        })
            };
            
        },
    processComment: (req, res) => {
        let info = req.body;

        let relations = {
            include: {
                all: true,
                nested: true
            }
        }

        let comentarioNuevo = {
            comment_description: info.commentDescription,
            user_id: req.session.user.id,
            product_id: req.params.id,
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
    deleteProduct: (req, res) => {
        let idABorrar = req.params.id;
        db.Product.destroy({
            where: {
                id: idABorrar
            }
        })
        .then((result) => {
            return res.redirect('/')
        })
        .catch((err) => {
            res.send(err)
        })
    }
}


module.exports = productController;
