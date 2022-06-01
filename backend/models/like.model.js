module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("likes", {
        like_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        liked: {
            type: Sequelize.BOOLEAN,
        },
    });
    return Like;
};