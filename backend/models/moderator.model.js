module.exports = (sequelize, Sequelize) => {
    const Moderator = sequelize.define("moderators", {
        mod_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
    });
    return Moderator;
};