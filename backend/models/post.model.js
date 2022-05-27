module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        post_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            //   references: "user", //Nom de notre table
            //   referencesKey: "user_id", //L'attribut référencé de la PK ce cette table
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
    });
    return Post;
};