const Follower = require("./Follower");

module.exports = function (sequelize, dataTypes){
    
    let alias = 'User'; 

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        contrasenia:{
            type : dataTypes.STRING
        },
        fecha_nacimiento : {
            type: dataTypes.DATE,
        },
        numero_documento: {
            type: dataTypes.INTEGER
        },
        foto_perfil: {
            type: dataTypes.STRING
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true,
        }
    }

    let config = {
        tableName : "users",
        timestamps: false,
        underscored: true 
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.hasMany(models.Product, {
            as:'products',
            foreignKey: 'user_id'       
        })
        User.hasMany(models.Comment, {
            as: 'comments',
            foreignKey: 'user_id',
        })
        User.belongsToMany(models.User, {
            as: 'follower',
            through: 'followers',
            foreignKey:'user_id_following', //seguidor
            otherKey: 'user_id_follower', //seguido
            timestamps: false
            })
    }

    return User;
}