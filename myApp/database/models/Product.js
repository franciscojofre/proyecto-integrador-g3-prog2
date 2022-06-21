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
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        }
    }


    let config = {
        tableName: 'products',
        timestamps: false, //Si la tabla tiene los campos created_at y updated_at
        underscore: true //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsTo(models.User, {
            as:'users', //Como voy a llamar a la relación dentro del controlador
            foreignKey: 'user_id' //hasMany= Columna del segundo modelo
        })
        Product.hasMany(models.Comment, {
            as: 'comentarios',
            foreignKey: 'product_id'
        })
        
    }

    return Product;
}




