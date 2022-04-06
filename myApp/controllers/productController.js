const periferics = require('../db/dataProducts');

let listadoPeriferics = periferics.lista;

const productController = {
    create: function (req, res) {  
        // let queryString = req.search //Caputramso qs
        // let queryStringToObject = new URLSearchParams(queryString); //OL
        // let aBuscar = queryStringToObject.get('search'); //Acá va el name del campo input del formulario.   
        return res.render('search-results', {
                listadoProducts: listadoPeriferics,
                //busquedaUsuario: aBuscar
        })
    },
    detalleProducto: function (req, res) {
        let idSolicitado = req.params.id;
        return res.render('product', {
            listaProductos: listadoPeriferics,
            idProducto: idSolicitado,
        })
    }
}

module.exports = productController;
