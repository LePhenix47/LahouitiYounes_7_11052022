const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});
const database = {};
database.Sequelize = Sequelize; //Classe qui permet de donnaitre les types &  connecte B2D w/ librairie pour gérer les différentes requetes SQL
database.sequelize = sequelize; //Instance de la B2D

/*
Variables d'exportation des modèles
*/
database.user = require("./user.model")(sequelize, Sequelize);
database.post = require("./post.model")(sequelize, Sequelize);
database.like = require("./like.model")(sequelize, Sequelize);

module.exports = database;