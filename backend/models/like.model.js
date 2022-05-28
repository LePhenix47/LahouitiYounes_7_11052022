module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("like", {
        like_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.STRING,
            allowNull: false,
            //   references: "user", //Nom de notre table
            //   referencesKey: "user_id", //L'attribut référencé de la PK ce cette table
        },
        post_id: {
            type: Sequelize.STRING,
            allowNull: false,
            //   references: "post", //Nom de notre table
            //   referencesKey: "post_id", //L'attribut référencé de la PK ce cette table
        },
    });
    return Like;
};