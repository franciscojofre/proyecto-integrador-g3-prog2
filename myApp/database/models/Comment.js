module.exports = function (sequelize, dataTypes){
    
    let alias = 'Comment'; //Este alias se busca como nombre en de la tabla en plural dentro de la base de datos.

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        username: {
            type: dataTypes.STRING
        },
        user_id: {
            type: dataTypes.INTEGER
        },
        product_id: {
            type: dataTypes.INTEGER
        },
        commentDescription: {
            type: dataTypes.STRING
        },
        image:{
            type : dataTypes.STRING
        }

    }

    let config = {
        tableName : "comments",
        timestamps:true, //Aclareción en caso de no explicitar created_at, deleted_at y updated_at
        underscored: true, //Aclareción en caso que los timestamps usen guiones bajos en lugar de camelCase.
    };

    const Comment = sequelize.define(alias, cols, config);

    Comment.associate = function(models) {
        Comment.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id'
        })
    }

    return Comment;

}