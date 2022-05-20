const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.signup = async(req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        console.log("Email attempting to signup: " + email);

        let user = await User.findOne({ user_email: email });
        if (!user) {
            console.log(
                "User with email :" +
                email +
                " hasn't signed up yet → Beginning account creation"
            );
            let hashedPassword = await bcrypt.hash(password, 15);
            if (hashedPassword === null || hashedPassword === password) {
                return res.status(500).json({ message: "Server ERROR" });
            }
            const newUser = new User({
                user_email: email,
                user_password: hashedPassword,
            });

            let saveNewUserInDatabase = await newUser.create();
            console.log("New user added to the database: " + saveNewUserInDatabase);

            return res.status(201).json({ message: "User SUCCESSFULLY signed up" });
        } else {
            console.log(
                "User with the email: " +
                req.email +
                " has already an account registered in the DB"
            );
            return res.status(401).json({
                message: "User already signed up with this email" + email,
            });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
};

exports.login = async(req, res, next) => {
    try {
        let email = req.email;
        let passwordFromBodyRequest = req.body.password;

        console.log("Email attempting to login: " + email);

        let user = await User.findOne({ user_email: req.email });
        let hashedPasswordInDatabase = user.password;
        if (!user) {
            console.log(
                "ERROR! User with email: " +
                email +
                " isn't registered in the Database! (Logging in is impossible)"
            );
            return res.status(401).json({ error: "User isn't registered" });
        }
        let isPasswordValid = await bcrypt.compare(
            passwordFromBodyRequest,
            hashedPasswordInDatabase
        );
        if (!isPasswordValid) {
            console.log("The password is INCORRECT! BOOLEAN:" + isPasswordValid);
            return res.status(401).json();
        }
        console.log(
            "The password is correct! SUCCESSFUL AUTHENTIFICATION, BOOLEAN:" +
            isPasswordValid +
            " for user with email: " +
            email
        );
        return res.status(200).json({
            user_id: user.user_id, //← Ne va JAMAIS marcher
            token: jwt.sign({ user_id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "24h",
            }),
        });
    } catch (error) {
        return res.status(400).json({ error });
    }
};

/*
Exemple commandes en SQL
const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = (req, res) => {
  
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};
*/

/*
Pour créer un nouvel objet dans le controleur:


exports.create = async (req, res) => {
    // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

   // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };


  // Save Tutorial in the database
  try{
    let saveTutorial = await Tutorial.create(tutorial);
    let response = await saveTutorial.json();
    res.status(200).json({response});
  }catch(error){
    res.status(400).json({error});
    console.log(error);
  }
  
};
*/