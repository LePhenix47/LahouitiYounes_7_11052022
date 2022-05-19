module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        user_id: {
            type: Sequelize.INTEGER,
        },
        user_email: {
            type: Sequelize.STRING,
        },
        user_password: {
            type: Sequelize.STRING,
        },
    });
    return User;
};

/*
RAPPEL: 

sequelize (s minuscule) → Classe qui permet de connaître les types & connecte B2D w/ librairie pour gérer les différentes requetes SQL

Sequelize (S majuscule) → Instance de la B2D
*/