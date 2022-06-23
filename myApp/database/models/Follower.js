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
        user_id_following: {
            type: dataTypes.INTEGER
        }
    };

    let config = {
        tableName: "followers",
        timestamps: false,
        underscored: true
    };
    const Follower = sequelize.define(alias, cols, config)

    return Follower
}
