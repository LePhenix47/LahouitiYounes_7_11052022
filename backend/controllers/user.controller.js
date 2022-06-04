const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database = require("../models");
const User = database.user;
const Operator = database.Sequelize.Op;

/*
REMINDER: the findAll function from Sequelize returns an array of objects
*/

exports.signup = (req, res, next) => {
    let emailFromBodyRequest = req.body.user_email;
    let passwordFromBodyRequest = req.body.user_password;
    let condition = {
        user_email: {
            [Operator.eq]: `${emailFromBodyRequest}`, //SELECT * FROM public.user u WHERE u.user_email = 'email@frombody.req'
        },
    };

    User.findAll({ where: condition })
        .then((user) => {
            let emailFromDatabase = user[0].user_email;
            let userIdFromDatabase = user[0].user_id;
            if (user ? user.length < 1 : true) {
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
                        res.status(500).json({
                            message: "Error while attempting to hash:" + hashingError,
                        });
                    });
            } else {
                res.status(401).json({
                    message: "User already signed up with this email" + emailFromBodyRequest,
                });
            }
        })
        .catch((emailSearchError) => {
            res.status(500).json({
                message: "Error found while attempting to search the email in the database" +
                    emailSearchError,
            });
        });
};

exports.login = (req, res, next) => {
    let emailFromBodyRequest = req.body.user_email;
    let passwordFromBodyRequest = req.body.user_password;

    let condition = {
        user_email: {
            [Operator.eq]: `${emailFromBodyRequest}`, //SELECT * FROM public.user u WHERE u.user_email = 'email@frombody.req'
        },
    };
    User.findAll({ where: condition }).then((user) => {
        let parsedUser = JSON.stringify(user);
        console.log("USER logging in: " + parsedUser);
        if (user.length < 1) {
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
                    res.status(401).json({
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
                res.status(500).json({
                    message: "Either the data OR the hash is missing or at least one of these 2 values is undefined, error:" +
                        passwordComparisonError,
                });
            });
    });
};

exports.loginAdministrator = (res, req, next) => {};

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