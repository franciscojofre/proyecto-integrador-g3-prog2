module.exports = function (sequelize, dataTypes){
    
    let alias = 'Follower';

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        user_id_follower: {
            type: dataTypes.INTEGER
        },
        user_id_followed: {
            type: dataTypes.INTEGER
        }
    };

    let config = {
        tableName: "followers",
        timestamps: false,
        underscored: true
    };
    const Follower = sequelize.define(alias, cols, config)
    
    Follower.associate = function(models){
        // Follower.belongsToMany(models.User, {
        // as: 'users',
        // through: 'followers',
        // foreignKey:'user_id_followed',
        // otherKey: 'user_id_follower',
        // timestamps: false
        // })
    }

return Follower
}
