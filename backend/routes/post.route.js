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
    modifyComment,
    deleteComment,
    getAllCommentsInOnePost,
} = postController;

const multer = require("../middlewares/multer-config");

router.get("/", auth, getAllPosts);

router.get("/:id", auth, getPostById);

router.post("/", auth, multer, createPost);

router.put("/:id", auth, multer, updatePost);

router.delete("/:id", auth, deletePost);

router.post("/:id/like", auth, likePost);

router.post("/:id/comment/", /*auth,*/ commentPost);

router.get("/:id/comment/:comment", /*auth*/ getAllCommentsInOnePost);

router.put("/:id/comment/:comment", /*auth,*/ modifyComment);

router.delete("/:id/comment/:comment", /*auth,*/ deleteComment);

module.exports = router;