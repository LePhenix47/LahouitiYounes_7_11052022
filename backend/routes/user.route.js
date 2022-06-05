const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

const email = require("../middlewares/email-validator");
const password = require("../middlewares/password-validator");

const { signup, login, loginModerator } = userController;

router.post("/signup", email, password, signup);
router.post("/login", login);
router.post("/login/mod", loginModerator);

module.exports = router;