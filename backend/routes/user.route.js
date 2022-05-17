const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/signup", email, password, userController.signup);
router.post("/login", userController.login);

module.exports = router;