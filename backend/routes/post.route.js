const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const postController = require("../controllers/post.controller");
const {
    create,
    findAll,
    findOne,
    update,
    deletePost,
    deleteAll,
    findAllPublished,
} = postController;

const multer = require("../middlewares/multer-config");

router.get("/", auth, findAll);

router.get("/:id", auth, findOne);

router.post("/", auth, multer, create);

router.put("/:id", auth, multer, update);

router.delete("/:id", auth, deletePost);

router.post("/:id/like", auth, likePost);

module.exports = router;