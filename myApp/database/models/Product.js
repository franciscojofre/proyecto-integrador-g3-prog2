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
        image: {
            type:dataTypes.STRING
        },
        user_id: {
            type: dataTypes.INTEGER
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        },
        deletedAt:{
            type: dataTypes.DATE
        }
    }


    let config = {
        tableName: 'products',
        timestamps: true, //Si la tabla tiene los campos created_at y updated_at
        underscore: false //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsTo(models.User, {
            as:'users', //Como voy a llamar a la relación dentro del controlador
            foreignKey: 'user_id' //hasMany= Columna del segundo modelo
        })
        Product.hasMany(models.Comment, {
            as: 'comments',
            foreignKey: 'product_id'
        })
        
    }

    return Product;
}




