const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database = require("../models");
const User = database.user;
const Operator = database.Sequelize.Op;

exports.signup = (req, res, next) => {
    console.log("++++++++++++++++++++++++++Body request: " + req.body);
    let emailFromBodyRequest = req.body.user_email;
    let passwordFromBodyRequest = req.body.user_password;
    console.log(
        "-------------Email attempting to signup: " + emailFromBodyRequest
    );
    let condition = {
        user_email: {
            [Operator.eq]: `${emailFromBodyRequest}`, //SELECT * FROM public.user u WHERE u.user_email = 'email@frombody.req'
        },
    };

    User.findAll({ where: condition })
        .then((user) => {
            let emailFromDatabase = JSON.stringify(user.user_email);
            let userIdFromDatabase = user.user_id;
            console.log("Type of the user_email: " + typeof emailFromDatabase);
            console.log(
                "USER +++++++++++++++++++++++++++++++++==========" +
                JSON.stringify(user)
            ); //findAll returns an ARRAY of Objects corresponding to the tuples in the table we did a query on
            console.log(
                "Value of email from DB = " +
                emailFromDatabase +
                " with a type of: " +
                typeof emailFromDatabase +
                " of user ID = " +
                userIdFromDatabase
            );
            if (user ? user.length < 1 : true) {
                //SIGNUP: The email isn't registered in the database → creating new account
                console.log(
                    "User with email :" +
                    emailFromBodyRequest +
                    " hasn't signed up yet → Beginning account creation"
                );
                bcrypt
                    .hash(passwordFromBodyRequest, 15)
                    .then((hashedPassword) => {
                        const newUser = {
                            user_email: emailFromBodyRequest,
                            user_password: hashedPassword,
                        };

                        let saveNewUserInDatabase = User.create(newUser);
                        console.log(
                            "New user added to the database: " + saveNewUserInDatabase
                        );

                        res.status(201).json({ message: "User SUCCESSFULLY signed up" });
                    })
                    .catch((hashingError) => {
                        console.log("ERROR while HASHING → " + hashingError);
                        res
                            .status(500)
                            .json({ hashingError: "Error while attempting to hash:" });
                    });
            } else {
                console.log(
                    "~~~~~~~~~~~~~~~~~~~~~~~~~~ERROR User with the email: " +
                    emailFromBodyRequest +
                    " has already an account registered in the DB"
                );
                res.status(401).json({
                    message: "User already signed up with this email" + emailFromBodyRequest,
                });
            }
        })
        .catch((emailSearchError) => {
            console.log(
                "ERROR-SIGNUP while attempting to find the email in the Database: " +
                emailSearchError
            );
            res.status(500).json({
                emailSearchError: "Error found while attempting to search the email in the database",
            });
        });
};

exports.login = (req, res, next) => {
    let emailFromBodyRequest = req.body.user_email;
    let passwordFromBodyRequest = req.body.user_password;

    console.log(
        "Email attempting to login: " +
        emailFromBodyRequest +
        " with the PW: " +
        passwordFromBodyRequest
    );

    let condition = {
        user_email: {
            [Operator.eq]: `${emailFromBodyRequest}`, //SELECT * FROM public.user u WHERE u.user_email = 'email@frombody.req'
        },
    };
    User.findAll({ where: condition }).then((user) => {
        let parsedUser = JSON.stringify(user);
        console.log("xxxxxxxxxxxxxxUSER logging in: " + parsedUser);
        if (user.length < 1) {
            console.log(
                "User with email: " + emailFromBodyRequest + " does not exist"
            );
            return res.status(400).json({ message: "User does not exist" });
        }
        let emailFromDatabase = user[0].user_email;
        let hashedPasswordInDatabase = user[0].user_password;
        console.log(
            "LOGIN user +++++++++++++++++++++++++++++++++==========" + parsedUser
        );
        if (user ? user.length < 1 : true) {
            //The email isn't registered in the database → logging error, unexsiting
            console.log(
                "ERROR! User with email: " +
                email +
                " isn't registered in the Database! (Logging in is impossible)"
            );
            res.status(401).json({ error: "User isn't registered" });
        }
        console.log(
            `User with email: ${emailFromBodyRequest} has been found in the database → ${emailFromDatabase} Comparing the passwords`
        );
        bcrypt
            .compare(passwordFromBodyRequest, hashedPasswordInDatabase)
            .then((isPasswordValid) => {
                if (!isPasswordValid) {
                    console.log("The password is INCORRECT! BOOLEAN:" + isPasswordValid);
                    res.status(401).json({
                        message: "The password is incorrect → Access unauthorized",
                    });
                }
                console.log(
                    "The password is correct! SUCCESSFUL AUTHENTIFICATION, BOOLEAN:" +
                    isPasswordValid +
                    " for user with email: " +
                    emailFromBodyRequest
                );
                res.status(200).json({
                    user_id: user.user_id,
                    token: jwt.sign({ user_id: user.user_id },
                        process.env.ACCESS_TOKEN_SECRET, {
                            expiresIn: "24h",
                        }
                    ),
                });
            })
            .catch((passwordComparisonError) => {
                console.log(
                    "The BOOLEAN value of the password is false error: " +
                    passwordComparisonError
                );
                res.status(500).json({
                    passwordComparisonError: "Either the data OR the hash is missing or at least one of these 2 values is undefined",
                });
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