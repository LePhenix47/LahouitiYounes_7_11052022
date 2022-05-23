const { post } = require("../models");
const database = require("../models");
const Post = database.post;
const Operator = database.Sequelize.Op;
// Create and Save a new Post
exports.createPost = (req, res, next) => {
    // Validate request
    let areTitleAndDescriptionFilled =
        req.body.description !== null && req.body.title !== null ? true : false;
    if (!areTitleAndDescriptionFilled) {
        res.status(400).send({
            message: "Content of title and description cannot be empty!",
        });
        return;
    }
    // Create a Post
    const post = {
        post_id: req.params.id,
        user_id: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image ? req.body.image : null,
        likes: 0,
        dislikes: 0,
    };
    // Save Post in the PostgreSQL database
    Post.create(post)
        .then((data) => {
            console.log("Post created");
            res.status(201).send(data);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Some error occurred while creating the Post.",
            });
        });
};
// Retrieve all Posts from the database.
exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then((posts) => {
            console.log("Posts found!" + posts);
            res.status(200).send(posts);
        })
        .catch((error) => {
            console.log("Posts NOT found! ----ERROR : " + error);
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving posts.",
            });
        });
};
// Find a single Post with an id
exports.getPostById = (req, res, next) => {
    const postId = req.params.id;
    Post.findByPk(postId)
        .then((post) => {
            if (post) {
                console.log("Post found: " + post);
                res.status(200).send(post);
            } else {
                res.status(404).send({
                    message: `Cannot find Post with id of ${postId}.`,
                });
            }
        })
        .catch((error) => {
            res.status(500).send({
                message: "Error retrieving Post with id of " + postId + ", error: " + error,
            });
        });
};
// Update a Post by the id in the request
exports.updatePost = (req, res, next) => {
    const postId = req.params.id;
    Post.update(req.body, {
            where: { post_id: postId },
        })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    message: "Post was updated successfully.",
                });
            } else {
                res.status(400).send({
                    message: `Cannot update Post with id of ${postId}. Maybe Post was not found or req.body is empty!`,
                });
            }
        })
        .catch((error) => {
            res.status(500).send({
                message: "Error updating Post with id=" + postId + ", error: " + error,
            });
        });
};
// Delete a Post with the specified id in the request
exports.deletePost = (req, res, next) => {
    const postId = req.params.id;
    Post.destroy({
            where: { post_id: postId },
        })
        .then((num) => {
            if (num == 1) {
                res.stauts(200).send({
                    message: "Post was deleted successfully!",
                });
            } else {
                res.status(400).send({
                    message: `Cannot delete Post with id = ${postId}. Post was not found!`,
                });
            }
        })
        .catch((error) => {
            res.status(500).send({
                message: "Could not delete Post with id=" +
                    postId +
                    " beacuse of error: " +
                    error,
            });
        });
};

exports.likePost = (req, res, next) => {
    const postId = req.params.id;
};

/*
// Delete all Posts from the database.
exports.deleteAll = (req, res) => {};
// Find all published Posts
exports.findAllPublished = (req, res) => {};


create a new Post: create(object)

find a Post by id: findByPk(id)

get all Posts: findAll()


update a Post by id: update(data, where: { id: id })

remove a Post: destroy(where: { id: id })

remove all Posts: destroy(where: {})

find all Posts by [condition]: findAll({ where: { condition: ... } })


WITH CONDITION
exports.findAll = (req, res, next) => {
    const post_id = req.query.post_id;
    let condition = post_id ?
        {
            title: {
                [Operator.iLike]: `%${post_id}%`,
            },
        } :
        null;
    Post.findAll({ where: condition })
        .then((data) => {
            console.log("Posts found!");
            res.status(200).send(data);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving posts.",
            });
        });
};

*/