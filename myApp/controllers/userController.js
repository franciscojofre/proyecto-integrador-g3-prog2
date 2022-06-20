const db = require("../database/models");
const userModel = db.User;
const commentModel = db.Comment;
const productModel = db.Product;

/* Requerir mi modulo instalado */
const bcrypt = require('bcryptjs');
const data = require("../db/data");

const userController = {
    login : (req, res) => {
            return res.render('login')
    },
    processLogin: (req, res) => {
        let info = req.body;
        let filtro = {where : [ { email : info.email}]};
        let errors = {};

        if (info.email == '') {
            errors.message = '"El email esta vacío';
            res.locals.errors = errors;
            return res.render('login');
        }else if (info.contrasenia == '') {
            errors.message = 'La contraseña esta vacía';
            res.locals.errors = errors;
            return res.render('login');
        } else {
        userModel.findOne(filtro)
        .then((result) => {
            if (result != null) {
                let passEncriptada = bcrypt.compareSync(info.contrasenia , result.contrasenia)
                if (passEncriptada) {

                    req.session.user = result.dataValues;

                    if (req.body.remember != undefined) {
                        res.cookie('userId', result.dataValues.id, {maxAge : 1000 * 60 *10 } )
                    }
                    return res.redirect("/")
                } else {
                    errors.message = "El email existe, pero la contraseña es incorrecta";
                    res.locals.errors = errors;
                    return res.render('login');
                }
            } else {
                errors.message = "El email no existe";
                res.locals.errors = errors;
                return res.render('login');
            }
        }).catch((err) => {
            console.log('El error es: ' + err)
        });
        }

    },
    logout : (req, res) => {
        req.session.destroy();
        res.clearCookie('userId');
        return res.redirect('/')
    },
    profile: (req, res) => {
        let idSolicitado = req.params.id

        
        userModel.findByPk(idSolicitado, {
            include: [
                {association: 'products'}
            ]
        })
        .then((result) =>{

            let infoUser = {
                nombre: result.nombre,
                apellido: result.apellido,
                email: result.email,
                fecha_nacimiento: result.fecha_nacimiento,
                numero_documento: result.numero_documento,
                foto_perfil: result.foto_perfil,
                created_at: result.created_at,
                products: result.products
            }
            
            return res.render('profile', infoUser)

        })
        .catch((err) => {
            return console.log('El error es: ' + err)
        });
    },
    
    profileEdit: (req, res) => {
        if (req.session.user != undefined) {
            res.render('profile-edit')
        } else {
            res.redirect('/user/login')
        }
    },
    profileUpdate:(req, res) => {
        let info = req.body;
        let userId = req.session.user.id;
        let imgPerfil = req.file.filename;
        let filtro = {
            where: {
                id: userId
            }
        }

        let usuario = {
            nombre: info.name,
            apellido: info.apellido,
            email: info.email,
            fecha_nacimiento: info.fecha_nacimiento,
            numero_documento: info.numero_documento,
            foto_perfil: imgPerfil,
            updated_at: new Date(),
        }

        userModel.update(usuario, filtro)
            .then(result => {
                req.session.user = result.dataValues;
                res.redirect('/user/profile')
            })
            .catch(err => console.log(err));

    },
    register: function (req, res) {   
        // let selectionFile = document.getElementById('selectionFile')   
        // let img = document.getElementById('img')
        // let convertion = img.src;
        // selectionFile.addEventListener('change', () => {
        //     if (req.file != undefined){
        //         convertion = URL.createObjectURL(req.file)
        //     } else {
        //         convertion = '/images/users/default-image.png'
        //     }
        // })  
        return res.render('register')       

    },
    processRegister: (req, res) => {
        let info = req.body;
        let errors = {}
        let filter = {where : [
            {email: info.email},
            {numero_documento: info.numeroDocumento}
        ]};
        userModel.findOne(filter)
        .then((result) =>{
            if (result != null){
                errors.message = `El email ${result.email} se encuentra en uso`
                res.locals.errors = errors
                return res.render('register')
            } else {
                if (info.nombre == '') {
                    errors.message = 'El nombre esta vacío'
                    res.locals.errors = errors
                    return res.render('register')
                } else if (info.apellido == ''){
                    errors.message = 'El apellido esta vacío'
                    res.locals.errors = errors
                    return res.render('register')
                } else if (info.email == ''){
                    errors.message = 'El email esta vacío'
                    res.locals.errors = errors
                    return res.render('register')
                } else if (info.contrasenia == ''){
                    errors.message = 'La contraseña esta vacía'
                    res.locals.errors = errors
                    return res.render('register')
                }   else if (info.contrasenia.length < 3) {
                    errors.message = 'La contraseña no contiene más de tres dígitos'
                    res.locals.errors = errors
                    return res.render('register')
                } else if (info.fechaNacimiento === ''){
                    errors.message = 'La fecha de nacimiento esta vacía'
                    res.locals.errors = errors
                    return res.render('register')
                } else if (info.numeroDocumento == ''){
                    errors.message = 'El numero de documento esta vacío'
                    res.locals.errors = errors
                    return res.render('register')
                } else if(info.foto_perfil == ''){
                    errors.message = 'La imagen de perfil esta vacía'
                    res.locals.errors = errors
                    return res.render('register')
                } else{
                    let dataUser = {
                        nombre: info.nombre,
                        apellido: info.apellido,
                        email: info.email,
                        contrasenia: bcrypt.hashSync(info.contrasenia, 10),
                        fecha_nacimiento: info.fechaNacimiento,
                        created_at: new Date(),
                        numero_documento: info.numeroDocumento,
                        foto_perfil: ''
                    }
                    if (req.file != undefined){
                        dataUser.foto_perfil = req.file.filename
                    } else {
                        dataUser.foto_perfil = 'default-image.png'
                    }
                    userModel.create(dataUser)
                    .then((result) => {
                        return res.redirect('/user/login')    
                    })
                    .catch((err) => {
                        console.log('El error es: ' + err)
                    });
                }
            }
        })
        .catch((err) => {
            console.log('El error es: ' + err)
        })

    }
}

module.exports = userController;