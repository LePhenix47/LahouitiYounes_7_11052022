const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = verifiedToken.userId;
        req.auth = { userId }; //"Request authorization" HTTP header = {userId: userId}
        if (req.body.user_id && req.body.user_id !== userId) {
            throw "Invalid User ID";
        } else {
            next();
        }
    } catch (authError) {
        console.log("ERREUR middleware authentification: " + authError);
        res
            .status(401)
            .json({ message: "Unauthorized request: user not logged in" });
    }
};