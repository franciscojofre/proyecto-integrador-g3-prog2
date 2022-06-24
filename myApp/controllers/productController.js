const db = require("../database/models");
const productModel = db.Product; 
const commentModel = db.Comment;
const op = db.Sequelize.Op;

const productController = {
    productDetail: function (req, res) {
        let idSolicitado = req.params.id;
        let relations = {
            order : [["comments", "created_at", "DESC"]],
            include: {
                all: true,
                nested: true
            }
        }
        productModel.findByPk(idSolicitado, relations)
        // {include: [
        //     {association: 'users'},
        //     {association: 'comments',
        //         include: [{association:'users'}]}
        // ]}
        .then((result) =>{
            let date = result.createdAt;
            let fechaFormateada = new Date(date).toISOString().slice(0,10);
    
            let product = {
              id: result.id,
              title: result.title,
              descrip: result.descrip,
              comments: result.comments,
              novedad: result.novedad,
              image: result.image,
              createdAt: fechaFormateada,
              user_id: result.user_id,
              users: result.users
            }
            
            return res.render("product", {product: product})
        })
        .catch((err) => {
            console.log('El error es: ' + err)
        })
    },
    searchResults: (req, res) => {
        let errors = {};
        let info = req.body;
        let queryString = req.query.search;
        let filter = {
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
        productModel.findAll(filter)
        .then((result) => {
            res.render('search-results', {
                listProducts: result
            });
        }).catch((err) => {
            console.log('El error es: ' + err);
        });   
    },
    productAdd: function (_req, res) {
        if (req.session.user == undefined) {
            return res.redirect('/')
        } else {
            return res.render('product-add')
        }
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
            created_at: new Date(),
            user_id: info.userId
            }
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
        if (req.session.user == undefined) {
            return res.redirect('/')
        } else {
            let id = req.params.id;
            db.Product.findByPk(id)
            .then((resultado) => {
                let product = {
                id: resultado.id,
                title : resultado.title,
                descrip : resultado.descrip,
                image : resultado.image,
                }
                res.render('product-edit', {product: product})
            })
            .catch((err) => {
                console.log('El error es: ' + err)
            });
        }
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
            if(req.file != undefined) {
                let productoEdit = {
                    id: req.params.id,
                    image: '',
                    title: info.title,
                    descrip: info.descrip,
                    updateAt: new Date(),
                }
                productoEdit.image = req.file.filename;
                productModel.update(productoEdit, {
                    where: {id: idParaEditar}
                })
                .then((result) => {
                    return res.redirect("/product/id/" + productoEdit.id)
                })
                .catch((err) => {
                    return res.send(err)
                })
            } else {
                info.imgProduct = ''
                let productoEdit = {
                    id: req.params.id,
                    title: info.title,
                    descrip: info.descrip,
                    updateAt: new Date(),
                }
                productModel.update(productoEdit, {
                    where: {id: idParaEditar}
                })
                .then((result) => {
                    return res.redirect("/product/id/" + productoEdit.id)
                })
                .catch((err) => {
                    return res.send('El error es: ' + err)
                })
            }
        }
    },
    processComment: (req, res) => {
        let info = req.body
        let comentarioNuevo = {
            comment_description: info.commentDescription,
            user_id: req.session.user.id,
            product_id: req.params.id,
            created_at: new Date(),
        };
        commentModel.create(comentarioNuevo)
        .then((result) => {
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
            res.send('El error es: ' + err)
        })
    }
}


module.exports = productController;
