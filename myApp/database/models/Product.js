module.exports = function (sequelize, dataTypes) {
    //Alias 
    let alias = 'Product';

    //Configurando columnas de la tabla 
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        title:{
            type: dataTypes.STRING
        },
        descrip:{
            type: dataTypes.STRING
        },
        comments:{
            type: dataTypes.STRING
        },
        novedad:{
            type:dataTypes.BOOLEAN
        },
        image: {
            type:dataTypes.STRING
        },
        user_id: {
            type: dataTypes.INTEGER
        }
    }


    let config = {
        tableName: 'products',
        timestamps: false, //Si la tabla tiene los campos created_at y updated_at
        underscore: true //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.hasMany(models.Comment, {
            as:'porductComment', //Como voy a llamar a la relación dentro del controlador
            foreignKey:'product_id' //hasMany= Columna del segundo modelo
        })
    }

    return Product
}




