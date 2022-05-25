module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        user_email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        user_password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    return User;
};

/*
RAPPEL: 

Sequelize (S majuscule) → Classe qui permet de connaître les types 

sequelize (s minuscule) → Instance de la B2D qui la connecte w/ librairie pour gérer les différentes requetes SQL
*/