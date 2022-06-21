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
        comment_description: {
            type: dataTypes.STRING
        },
        image:{
            type : dataTypes.STRING
        },
        created_at:{
            type: dataTypes.DATE
        },
        deleted_at:{
            type: dataTypes.DATE
        },
        updated_at:{
            type: dataTypes.DATE
        }
    }

    let config = {
        tableName : "comments",
        timestamps: true, //Aclareción en caso de no explicitar created_at, deleted_at y updated_at
        underscored: true, //Aclareción en caso que los timestamps usen guiones bajos en lugar de camelCase.
    };

    const Comment = sequelize.define(alias, cols, config);

    Comment.associate = function(models) {
        Comment.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'user_id',
        }),
        Comment.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id',
        })
    };
    
    return Comment;

}