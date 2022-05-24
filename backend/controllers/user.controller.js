const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user } = require("../models");
const database = require("../models");
const User = database.user;
const Operator = database.Sequelize.Op;

exports.signup = (req, res, next) => {
    let emailFromBodyRequest = req.body.email;
    let password = req.body.password;
    console.log("Email attempting to signup: " + emailFromBodyRequest);

    let isEmailAlreadyInDatabaseCondition =
        emailFromBodyRequest === User.user_email ?
        {
            user_email: {
                [Operator.iLike]: `%${emailFromBodyRequest}%`,
            },
        } :
        null;
    Post.findAll({ where: isEmailAlreadyInDatabaseCondition })
        .then((user) => {
            if (!user) {
                console.log(
                    "User with email :" +
                    emailFromBodyRequest +
                    " hasn't signed up yet → Beginning account creation"
                );
                let hashedPassword = bcrypt.hash(password, 15);

                hashingPasswordHasFailed =
                    hashedPassword === null || hashedPassword === password;
                if (hashingPasswordHasFailed) {
                    console.log(
                        "ERROR-SIGNUP: Password hashing failed! Value of hash: " +
                        hashingPasswordHasFailed
                    );
                    res.status(500).json({ message: "Server ERROR, hashing failed" });
                }
                const newUser = new User({
                    user_email: email,
                    user_password: hashedPassword,
                });

                let saveNewUserInDatabase = newUser.create();
                console.log("New user added to the database: " + saveNewUserInDatabase);

                res.status(201).json({ message: "User SUCCESSFULLY signed up" });
            } else {
                console.log(
                    "User with the email: " +
                    req.email +
                    " has already an account registered in the DB"
                );
                res.status(401).json({
                    message: "User already signed up with this email" + email,
                });
            }
        })
        .catch((error) => {
            console.log(
                "ERROR-SIGNUP while attempting to find the email in the Database: " +
                error
            );
            res.status(500).json({ error });
        });
};

exports.login = (req, res, next) => {
    let emailFromBodyRequest = req.body.email;
    let passwordFromBodyRequest = req.body.password;

    console.log("Email attempting to login: " + emailFromBodyRequest);

    let isEmailAlreadyInDatabaseCondition =
        emailFromBodyRequest === User.user_email ?
        {
            user_email: {
                [Operator.iLike]: `%${emailFromBodyRequest}%`,
            },
        } :
        null;
    Post.findAll({ where: isEmailAlreadyInDatabaseCondition }).then((user) => {
        if (!user) {
            console.log(
                "ERROR! User with email: " +
                email +
                " isn't registered in the Database! (Logging in is impossible)"
            );
            res.status(401).json({ error: "User isn't registered" });
        }
        let hashedPasswordInDatabase = user.password;
        let isPasswordValid = bcrypt.compare(
            passwordFromBodyRequest,
            hashedPasswordInDatabase
        );
        if (!isPasswordValid) {
            console.log("The password is INCORRECT! BOOLEAN:" + isPasswordValid);
            res.status(401).json();
        }
        console.log(
            "The password is correct! SUCCESSFUL AUTHENTIFICATION, BOOLEAN:" +
            isPasswordValid +
            " for user with email: " +
            emailFromBodyRequest
        );
        res.status(200).json({
            user_id: user.user_id,
            token: jwt.sign({ user_id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "24h",
            }),
        });
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