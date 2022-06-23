module.exports = function (sequelize, dataTypes){
    
    let alias = 'Comment'; 

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
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
        timestamps: false, 
        underscored: true 
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