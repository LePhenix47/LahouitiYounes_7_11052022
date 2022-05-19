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
const db = {};
db.Sequelize = Sequelize; //Classe qui permet de donnaitre les types &  connecte B2D w/ librairie pour gérer les différentes requetes SQL
db.sequelize = sequelize; //Instance de la B2D
db.user = require("./user.model")(sequelize, Sequelize);
module.exports = db;