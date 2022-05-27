const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = verifiedToken.userId;
        req.auth = { userId };
        if (req.body.user_id && req.body.useri_d !== userId) {
            throw "Invalid User ID";
        } else {
            next();
        }
    } catch (authError) {
        res
            .status(401)
            .json({ message: "Unauthorized request: user not logged in" });
    }
};