const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const postController = require("../controllers/post.controller");
const {
    getAllPosts,
    getOnePost,
    createPost,
    modifyPost,
    deletePost,
    likePost,
} = postController;

const multer = require("../middlewares/multer-config");

router.get("/", auth, getAllPosts);

router.get("/:id", auth, getOnePost);

router.post("/", auth, multer, createPost);

router.put("/:id", auth, multer, modifyPost);

router.delete("/:id", auth, deletePost);

router.post("/:id/like", auth, likePost);

module.exports = router;