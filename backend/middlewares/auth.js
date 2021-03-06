const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
const database = require("../models");
const { user } = require("../models");
const User = database.user;
const Operator = database.Sequelize.Op;

dotEnv.config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; //ACCESS TOKEN to login
        console.log(token);
        const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(verifiedToken);

        const userId = verifiedToken.user_id;
        console.log(userId);
        req.auth = { userId }; //"Request authorization" HTTP header = {userId: userId}
        console.log("REQUEST AUTH = ↓");
        console.log(req.auth);
        console.log("↑");
        if (req.body.user_id && req.body.user_id !== userId) {
            throw (
                "Invalid User ID\nExpected value of user_id of " +
                userId +
                ", instead got userId from body request: " +
                req.body.user_id
            );
        } else {
            next();
        }
    } catch (authError) {
        console.log("ERREUR middleware authentification: " + authError);
        res.status(401).json({
            message: "Unauthorized request: user not logged in" || authError,
        });
    }
};