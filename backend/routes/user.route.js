const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const email = require("../middlewares/email-validator");
const password = require("../middlewares/password-validator");

router.post("/signup", email, password, userController.signup);
router.post("/login", userController.login);

module.exports = router;
