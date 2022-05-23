module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        post_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
        },
        user_id: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image_url: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        likes: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        dislikes: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
    });
    return Post;
};