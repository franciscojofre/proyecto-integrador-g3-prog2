module.exports = function (sequelize, dataTypes) {

    let alias = 'Product';

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
        }
    }

    let config = {
        tableName: 'products',
        timestamps: true, 
        underscore: true 
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsTo(models.User, {
            as:'users',
            foreignKey: 'user_id' 
        })
        Product.hasMany(models.Comment, {
            as: 'comments',
            foreignKey: 'product_id'
        })
        
    }

    return Product;
}




