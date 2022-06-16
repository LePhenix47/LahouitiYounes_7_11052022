const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database = require("../models");
const User = database.user;
const Operator = database.Sequelize.Op;

/*
REMINDER: the findAll function from Sequelize returns an array of objects
*/

/*
// Inscription des utilisateurs
*/
exports.signup = (req, res, next) => {
    let emailFromBodyRequest = req.body.user_email;
    let passwordFromBodyRequest = req.body.user_password;
    let condition = {
        user_email: {
            [Operator.eq]: `${emailFromBodyRequest}`, //SELECT * FROM public.user u WHERE u.user_email = 'email@frombody.req'
        },
    };
    console.log("Signing up → " + req.body);
    User.findAll({ where: condition })
        .then((user) => {
            console.log(JSON.stringify(user) + typeof user + user.length);
            let isUserNotRegistered = user.length === 0 ? true : false;
            if (isUserNotRegistered) {
                //SIGNUP: The email isn't registered in the database → creating new account
                bcrypt
                    .hash(passwordFromBodyRequest, 15)
                    .then((hashedPassword) => {
                        const newUser = {
                            user_email: emailFromBodyRequest,
                            user_password: hashedPassword,
                        };

                        let saveNewUserInDatabase = User.create(newUser);
                        res.status(201).json({ message: "User SUCCESSFULLY signed up" });
                    })
                    .catch((hashingError) => {
                        console.log(
                            "Une erreur est survenue lors du hash du MDP: " + hashingError
                        );
                        res.status(500).json({
                            message: "An unexpected error has occured while attempting to register the password",
                        });
                    });
            } else {
                return res.status(401).json({
                    message: "User already signed up with this email: " + emailFromBodyRequest,
                });
            }
        })
        .catch((emailSearchError) => {
            console.log(
                "ERREUR lors de la recherche de l'email dans la B2D: " +
                emailSearchError
            );
            return res.status(500).json({
                message: "Error found while attempting to search the email in the database",
            });
        });
};

/*
//Authentification pour les utilisateurs
*/
exports.login = (req, res, next) => {
    console.log("Corps de la requête du LOGIN : " + JSON.stringify(req.body));
    let emailFromBodyRequest = req.body.user_email;
    let passwordFromBodyRequest = req.body.user_password;

    User.findAll({
        where: {
            //SELECT * FROM users WHERE user_email = [email]
            user_email: emailFromBodyRequest,
        },
    }).then((user) => {
        let parsedUser = JSON.stringify(user);
        console.log("USER logging in: " + parsedUser);
        let isUserRegistered = user.length >= 1 ? true : false;
        if (!isUserRegistered) {
            //The email isn't registered in the database → logging error, unexsiting
            return res
                .status(401)
                .json({ message: "User does not exist → not registered" });
        }
        //let { user_id, user_email, user_password} = user[0]
        let userIdFromDatabase = user[0].user_id;
        let emailFromDatabase = user[0].user_email;
        let hashedPasswordInDatabase = user[0].user_password;
        bcrypt
            .compare(passwordFromBodyRequest, hashedPasswordInDatabase)
            .then((isPasswordValid) => {
                if (!isPasswordValid) {
                    return res.status(401).json({
                        message: "The password is incorrect → Access unauthorized",
                    });
                }

                res.status(200).json({
                    user_id: userIdFromDatabase,
                    token: jwt.sign({ user_id: user.user_id },
                        process.env.ACCESS_TOKEN_SECRET, {
                            expiresIn: "24h",
                        }
                    ),
                });
            })
            .catch((passwordComparisonError) => {
                console.log(
                    "Erreur lors de la comparaison des MDPs: " + passwordComparisonError
                );
                return res.status(500).json({
                    message: "Either the data OR the hash is missing or at least one of these 2 values is undefined",
                });
            });
    });
};

/*
//Authentification pour les modos
*/
exports.loginModerator = (req, res, next) => {
    console.log(
        "Corps de la requête des MODERATEURS: " + JSON.stringify(req.body)
    );
    console.assert(req.body !== undefined, "Le corps de la requête est indéfini");
    let emailFromBodyRequest = req.body.user_email;
    let passwordFromBodyRequest = req.body.user_password;

    console.log(
        "%cTentative de connexion en tant que modérateur: " +
        JSON.stringify(emailFromBodyRequest) +
        JSON.stringify(passwordFromBodyRequest),
        "color: blue"
    );
    User.findAll({
            where: {
                //SELECT * FROM users WHERE user_email = [email] AND moderator = true
                user_email: emailFromBodyRequest,
                moderator: true,
            },
        })
        .then((mod) => {
            let stringifiedMod = JSON.stringify(mod);
            console.log("USER logging in: " + stringifiedMod);
            let isUserNotMod = mod.length === 0 ? true : false;
            if (isUserNotMod) {
                //The email isn't registered in the database → logging error, unexsiting
                console.log("L'utilisateur n'est pas un modérateur!");
                return res.status(403).json({ message: "User is not a moderator" });
            }
            //let { user_id, user_email, user_password} = mod[0]
            let userIdFromDatabase = mod[0].user_id;
            let emailFromDatabase = mod[0].user_email;
            let hashedPasswordInDatabase = mod[0].user_password;
            bcrypt
                .compare(passwordFromBodyRequest, hashedPasswordInDatabase)
                .then((isPasswordValid) => {
                    if (!isPasswordValid) {
                        return res.status(401).json({
                            message: "The password is incorrect → Access unauthorized",
                        });
                    }

                    res.status(200).json({
                        user_id: userIdFromDatabase,
                        token: jwt.sign({ user_id: mod.user_id },
                            process.env.ACCESS_TOKEN_SECRET, {
                                expiresIn: "24h",
                            }
                        ),
                    });
                })
                .catch((passwordComparisonError) => {
                    console.log("ERREUR ROUTE MODÉRATEURS: " + passwordComparisonError);
                    return res.status(403).json({
                        message: "Forbidden request, couldn't log in as a moderator",
                    });
                });
        })
        .catch((error) => {
            console.log(error);
            res
                .status(500)
                .json({ message: "Error while attempting to login as a moderator" });
        });
};

/*

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {};


// Find all published Posts
exports.findAllPublished = (req, res) => {};


create a new Post: create(object)

find a Post by id: findByPk(id)

get all Posts: findAll()


update a Post by id: update(data, where: { id: id })

remove a Post: destroy(where: { id: id })

remove all Posts: destroy(where: {})

find all Posts by [condition]: findAll({ where: { condition: ... } }) → SELECT * FROM (table) WHERE [condition]


WITH CONDITION
exports.findAll = (req, res, next) => {
    const post_id = req.query.post_id;
    let condition = post_id ?
        {
            title: {
                [Operator.iLike]: `%${post_id}%`,
            },
        } :
        null;
    Post.findAll({ where: condition })
        .then((data) => {
            console.log("Posts found!");
            res.status(200).send(data);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving posts.",
            });
        });
};

*/

/*
Pour créer un nouvel objet dans le controleur:


exports.create =  (req, res) => {
    // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    ;
  }

   // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };


  // Save Tutorial in the database
  try{
    let saveTutorial =  Tutorial.create(tutorial);
    let response =  saveTutorial.json();
    res.status(200).json({response});
  }catch(error){
    res.status(400).json({error});
    console.log(error);
  }
  
};
*/