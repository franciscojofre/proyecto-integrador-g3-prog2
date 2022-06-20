module.exports = function (sequelize, dataTypes){
    
    let alias = 'User'; //Este alias se busca como nombre en de la tabla en plural dentro de la base de datos.

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
            allowNull:true
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true
        }
    }

    let config = {
        tableName : "users",
        timestamps: true, //Aclareción en caso de no explicitar created_at, deleted_at y updated_at
        underscored: true //Aclareción en caso que los timestamps usen guiones bajos en lugar de camelCase.
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
        // User.belongsToMany(models.User, {
        //     as: 'users',
        //     through: 'followers',
        //     foreignKey:'user_id_follower',
        // })
    }

    return User;

}