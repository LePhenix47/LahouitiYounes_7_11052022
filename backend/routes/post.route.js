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
    getAmountOfLikesInPost,
    likePost,
    commentPost,
    modifyComment,
    deleteComment,
    getAllCommentsInOnePost,
} = postController;

const multer = require("../middlewares/multer-config");

//Opérations CRUD pour les posts
router.get("/", /*auth,*/ getAllPosts);

router.get("/:postId", /*auth,*/ getPostById); //←←←←←←

router.post("/", /*auth,*/ multer, createPost);

router.put("/:postId", /*auth,*/ multer, updatePost);

router.delete("/:postId", /*auth,*/ deletePost);

//Like d'un post
router.get("/:postId/like", /*auth,*/ getAmountOfLikesInPost);
router.post("/:postId/like", /*auth,*/ likePost);

//Opérations CRUD d'un commentaire
router.post("/:postId/comments/", /*auth,*/ commentPost);

router.get("/:postId/comments/", /*auth,*/ getAllCommentsInOnePost); //←←←←←←

router.put("/:postId/comments/:commentId", /*auth,*/ modifyComment);

router.delete("/:postId/comments/:commentId", /*auth,*/ deleteComment);

module.exports = router;