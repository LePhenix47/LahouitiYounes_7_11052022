const db = require("../models");
const Post = db.post;
const Op = db.Sequelize.Op;
// Create and Save a new Post
exports.create = (req, res) => {
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
        post_id: x,
        user_id: req.body.user_id,
        title: req.body.title,
        description: req.body.description,
        image: req.body.image ? req.body.image : false,
        likes: 0,
        dislikes: 0,
    };
    // Save Post in the PostgreSQL database
    Post.create(post)
        .then((data) => {
            console.log("Post created");
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial.",
            });
        });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {};

/*
create a new Tutorial: create(object)

find a Tutorial by id: findByPk(id)

get all Tutorials: findAll()


update a Tutorial by id: update(data, where: { id: id })

remove a Tutorial: destroy(where: { id: id })

remove all Tutorials: destroy(where: {})

find all Tutorials by title: findAll({ where: { title: ... } })

*/