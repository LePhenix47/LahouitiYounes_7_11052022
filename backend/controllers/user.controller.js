const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async(req, res, next) => {
    console.log("Email attempting to register: " + req.body.email);
};

exports.login = async(req, res, next) => {};