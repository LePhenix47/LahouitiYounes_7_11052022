const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

const email = require("../middlewares/email-validator");
const password = require("../middlewares/password-validator");

const { signup, login, loginAdministrator } = userController;

router.post("/signup", email, password, signup);
router.post("/login", login);
router.post("/admin", loginAdministrator);

module.exports = router;