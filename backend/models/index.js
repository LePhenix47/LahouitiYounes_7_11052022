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

/*
Variables
*/
const User = require("./user.model")(sequelize, Sequelize);
const Post = require("./post.model")(sequelize, Sequelize);
const Like = require("./like.model")(sequelize, Sequelize);
/* 
Relations entre les tables
*/
//1-à-n
User.hasMany(Like, {
    foreignKey: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});
Like.belongsTo(User);

//1-à-n
Post.hasMany(Like, {
    foreignKey: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});
Like.belongsTo(Post);

database.user = User;
database.post = Post;
database.like = Like;

/*
//Tutorial as to how to create relations with tables in Sequelize
We have 5 models: User, ContactInfo, Tweet, Actors and Movies


1️⃣ 1-to-1:

User.hasOne(ContactInfo,
    {
        foreignKey: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }
);
ContactInfo.belongsTo(User);

2️⃣ 1-to-many:

User.hasMany(Tweet, 
    {
        foreignKey: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }
);
Tweet.belongsTo(User);

3️⃣ many-to-many: ⚠⚠⚠ The many-to-many can have DIFFERENT options! ⚠⚠⚠
 🅰 Where we have a normal m-to-m relationship with 2 different tables (ex: An actor can play in many movies, a movie can be played by many actors)
Actor.belongsToMany(Movie, 
    {
        through: "Actor_Movie"
    }
);

Movie.belongsToMany(Actor, 
    {
        through: "Actor_Movie"
    }
);

🅱 Where we have a m-to-m relationship with 1 single table (ex: In Twitter, a user can follow many users, an user can be followed by many users)

//Sequelize doesn't know how to determine who does what → Give them an alias
//Also Sequelize will create for us a jonction table, we'll name it "Followed"

User.belongsToMany(User, 
    {
        as: "User",
        foreignKey: "user_id",
        through: "Follow"
    }
);

User.belongsToMany(User, 
    {
        as: "Followed",
        foreignKey: "followed_id",
        through: "Followed"
    }
);
 
//In this case we won't have TWICE an user_id in the jonction table, instead we're gonna have a user_id and a followed_id

*/

module.exports = database;