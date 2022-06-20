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
        createAt: {
            type: dataTypes.DATE
        },
        updateAt: {
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
        // Product.belongsTo(models.Comment, {
        //     as: 'comments_association', //Naming collision between attribute 'comments' and association 'comments' on model Product.
        //     foreignKey: 'user_id',
        //     otherKey: 'product_id'
        // })
    }

    return Product;
}




