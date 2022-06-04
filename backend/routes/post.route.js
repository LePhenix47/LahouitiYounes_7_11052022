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

router.get("/", /*auth,*/ getAllPosts);

router.get("/:postId", /*auth,*/ getPostById);

router.post("/", /*auth,*/ multer, createPost);

router.put("/:postId", /*auth,*/ multer, updatePost);

router.delete("/:postId", /*auth,*/ deletePost);

router.post("/:postId/like", /*auth,*/ likePost);

router.post("/:postId/comment/", /*auth,*/ commentPost);

router.get("/:postId/comment/:commentId", /*auth,*/ getAllCommentsInOnePost);

router.put("/:postId/comment/:commentId", /*auth,*/ modifyComment);

router.delete("/:postId/comment/:commentId", /*auth,*/ deleteComment);

module.exports = router;