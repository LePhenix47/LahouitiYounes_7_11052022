const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const postController = require("../controllers/post.controller");

const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    commentPost,
} = postController;

const multer = require("../middlewares/multer-config");

router.get("/", auth, getAllPosts);

router.get("/:id", auth, getPostById);

router.post("/", auth, multer, createPost);

router.put("/:id", auth, multer, updatePost);

router.delete("/:id", auth, deletePost);

router.post("/:id/like", /*auth,*/ likePost);

router.post("/:id/comment", /*auth,*/ commentPost);

module.exports = router;