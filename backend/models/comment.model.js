module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
        comment_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        comment: {
            type: Sequelize.STRING(180),
        },
    });
    return Comment;
};