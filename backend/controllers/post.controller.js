const database = require("../models");
const Post = database.post;
const Like = database.like;
const Comment = database.comment;
const Operator = database.Sequelize.Op;
const fileSystem = require("fs");

/*
// Retrieve all Posts from the database.
*/
exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then((posts) => {
            console.log("Posts truvés: \n" + posts);
            res.status(200).send(posts);
        })
        .catch((getAllPostsError) => {
            console.log("Posts NON trouvés! ----ERREUR : " + getAllPostsError);
            res.status(500).send({
                message: getAllPostsError.message ||
                    "Some unexpected error occurred while retrieving all the posts.",
            });
        });
};

/*
// Find a single Post with an id
*/
exports.getPostById = (req, res, next) => {
    const postId = req.params.id;
    Post.findByPk(postId)
        .then((post) => {
            if (post) {
                console.log("Post trouvé: " + post);
                res.status(200).send(post);
            } else {
                console.log("Post NON trouvé w/ id = " + postId);
                res.status(404).send({
                    message: `Cannot find Post with id of ${postId}.`,
                });
            }
        })
        .catch((getPostByIdError) => {
            console.log(
                "Une erreur est survenue en tentant de trouver le post w/ ID = " +
                postId +
                ", erreur: " +
                getPostByIdError
            );
            res.status(500).send({
                message: "An unexpected error has occured while retrieving the post with id of " +
                    postId,
            });
        });
};

/*
// Create and Save a new Post
*/
exports.createPost = (req, res, next) => {
    // Validate reques
    let descriptionFromBodyRequest = req.body.description;
    let titleFromBodyRequest = req.body.title;
    let areTitleAndDescriptionFilled =
        descriptionFromBodyRequest !== "" && titleFromBodyRequest !== "" ?
        true :
        false;

    console.log(
        "title: " +
        titleFromBodyRequest +
        "\n description: " +
        descriptionFromBodyRequest
    );
    if (!areTitleAndDescriptionFilled) {
        console.log(
            "ERROR while attempting to create the post: Title or description is empty, BOOLEAN value = " +
            areTitleAndDescriptionFilled
        );
        return res.status(400).send({
            message: "The title or description of the post cannot be empty!",
        });
    }
    // Create a Post
    const post = {
        user_id: req.body.user_id,
        title: req.body.title,
        description: req.body.description,
        image_url: req.file ?
            `${req.protocol}://${req.get("host")}/images/${req.file.filename}` :
            null,
    };

    console.log(post + " has been created!");
    // Save Post in the PostgreSQL database
    Post.create(post)
        .then((savedPost) => {
            console.log("Post created");
            res.status(201).send(savedPost);
        })
        .catch((postCreationError) => {
            res.status(500).send({
                message: postCreationError.message ||
                    "Some error occurred while creating the Post.",
            });
        });
};

/*
// Update a Post by the id in the request
*/
exports.updatePost = (req, res, next) => {
    const postId = req.body.post_id;
    console.log(`Mis à jour du post w/ ID = ${postId}`);
    Post.update(req.body, {
            where: { post_id: postId },
        })
        .then((numberReturned) => {
            if (numberReturned == 1) {
                res.status(200).send({
                    message: "Post was updated successfully.",
                });
            } else {
                res.status(400).send({
                    message: `Cannot update Post with id of ${postId}. Maybe Post was not found or req.body is empty!`,
                });
            }
        })
        .catch((updatePostError) => {
            res.status(500).send({
                message: "Error updating Post with id=" + postId + " " + updatePostError,
            });
        });
};

/*
// Delete a Post with the specified id in the request
*/
exports.deletePost = (req, res, next) => {
    const postId = req.params.id;
    Post.destroy({
            where: { post_id: postId },
        })
        .then((numberReturned) => {
            if (numberReturned == 1) {
                console.log(
                    "Post SUPPRIMÉ AVEC SUCCÈS ! → Nombre retourné = " + numberReturned
                );
                return res.status(200).send({
                    message: "Post was deleted successfully!",
                });
            } else {
                console.log(
                    "Post cannot be deleted! → Number returned = " + numberReturned
                );
                return res.status(404).send({
                    message: `Cannot delete Post with id = ${postId}. Post was not found!`,
                });
            }
        })
        .catch((deletePostError) => {
            console.log(
                "Tentative de suppresion du post w/ ID = " +
                postId +
                ", erreur: " +
                deletePostError
            );
            res.status(500).send({
                message: "Could not delete Post with id=" +
                    postId +
                    " due to an unexpected error",
            });
        });
};

/*
//Likes or unlikes the post  
*/
exports.likePost = (req, res, next) => {
    const postIdFromURL = req.params.id;
    const userIdFromBodyRequest = req.body.user_id;
    Like.findAll({
            attributes: ["userUserId", "postPostId", "liked"],
            where: {
                [Operator.and]: [
                    { userUserId: userIdFromBodyRequest },
                    { postPostId: postIdFromURL },
                ], //SELECT userUserId, postPostId FROM likes WHERE userUserId = [req.body.userUserId] AND postPostId = [req.body.post_id]
            },
        })
        .then((likeTuple) => {
            //Is the tuple empty? yes or no?
            let isTupleEmpty = likeTuple.length === 0 ? true : false;
            if (isTupleEmpty) {
                const liked = {
                    userUserId: userIdFromBodyRequest,
                    postPostId: postIdFromURL,
                    liked: true,
                };
                Like.create(liked)
                    .then(() => {
                        res.status(200).json({ message: "Liked!" });
                    })
                    .catch((addLikeTupleError) =>
                        res.status(500).json({
                            message: "Error while attempting to like" + addLikeTupleError,
                        })
                    );
            } else if (!isTupleEmpty) {
                let postAlreadyLiked = likeTuple[0].liked;
                Like.update({
                        liked: !postAlreadyLiked,
                    }, {
                        where: {
                            [Operator.and]: [
                                { userUserId: userIdFromBodyRequest },
                                { postPostId: postIdFromURL },
                            ],
                        },
                    })
                    .then(() => {
                        res.status(200).json({
                            message: "The post has been " +
                                (postAlreadyLiked ? "unliked (-1)" : "liked (+1)"),
                        });
                    })
                    .catch((updatingPostLikeError) => {
                        res.status(500).json({
                            message: "Error, couldn't update the post" + updatingPostLikeError,
                        });
                    });
            }
        })
        .catch((findingLikeError) => {
            res.status(500).json({
                message: "Error while attempting to find the liked post because of an error in the DB → " +
                    findingLikeError,
            });
        });
};

/*
//Comment a post
*/
exports.commentPost = (req, res, next) => {
    const postIdFromURL = req.params.id;
    const userIdFromBodyRequest = req.body.user_id;
    let commentFromBodyRequest = req.body.comment;
    console.log(
        "Commentaire du corps de la requête: " +
        JSON.stringify(commentFromBodyRequest)
    );
    let isCommentEmpty = commentFromBodyRequest === "" ? true : false;
    let isCommentTooLong =
        commentFromBodyRequest.split("").length > 180 ? true : false;
    if (isCommentEmpty || isCommentTooLong) {
        res.status(400).json({
            message: `Error, the content of a comment cannot be${
        isCommentEmpty ? " empty" : ""
      }${isCommentTooLong ? " over 180 characters long" : ""}`,
        });
        /*
                 message: `Error, the content of a comment cannot be
                 ${isCommentEmpty ? " empty" : ""}
                 ${isCommentTooLong ? " over 180 characters long" : ""}`,
            */
    } else {
        const commentObject = {
            comment: commentFromBodyRequest,
            userUserId: userIdFromBodyRequest,
            postPostId: postIdFromURL,
        };
        Comment.create(commentObject)
            .then((createdComment) => {
                console.log("Commentaire crée! → " + createdComment);
                res.status(201).json(createdComment);
            })
            .catch((error) => {
                console.log(
                    "Erreur trouvée lors de la création du commentaire: " + error
                );
                res.status(500).json({
                    message: "An error has occured while attempting to create a comment",
                });
            });
    }
};

exports.modifyComment = (req, res, next) => {
    let modifiedCommentFromBodyRequest = req.body.comment;
    let commentIdFromBodyRequest = req.body.comment_id;
    let postIdFromURL = req.params.id;

    console.log(
        "MODIFICATION Commentaire corps de la requête: " + JSON.stringify(req.body)
    );

    console.log(
        "Comment Id + commentaire + postID: " +
        commentIdFromBodyRequest +
        " " +
        modifiedCommentFromBodyRequest +
        " " +
        postIdFromURL
    );

    Comment.update({ comment: modifiedCommentFromBodyRequest }, {
            where: {
                comment_id: commentIdFromBodyRequest,
            },
            //UPDATE comments SET comment = [req.body.comment] (commentaire modifié) WHERE comment_id = [req.body.id]
        })
        .then((modifiedComment) => {
            console.log(
                'Commentaire modifié = "' + JSON.stringify(modifiedComment) + '"'
            );
            res.status(200).json({
                message: "Comment has been successfully modified",
            });
        })
        .catch((updateCommentError) => {
            console.log(
                "Une erreur est survenue lors de la mise à jour d'un commentaire: " +
                updateCommentError
            );
            res.status(500).json({
                message: "An unexpected error has occured while attempting to update the comment",
            });
        });
};

exports.deleteComment = (req, res, next) => {
    let userIdFromBodyRequest = req.body.user_id;
    let commentIdFromBodyRequest = req.body.comment_id;

    Comment.destroy({
            where: { comment_id: commentIdFromBodyRequest },
        })
        .then((numberReturned) => {
            if (numberReturned >= 1) {
                console.log("Nombre retourné ≥ 1");
                res.status(200).json({ message: "" });
            } else {
                console.log("Nombre retourné = " + numberReturned);
                res.status(400).json({
                    message: "Comment couldn't be deleted because of an unknown error",
                });
            }
        })
        .catch((commentDeletionError) => {
            console.log(
                "Erreur trouvée lors de la suppression du commentaire: " +
                commentDeletionError
            );
            res.status(500).json({
                message: "An unexpected error has occured while attempting to delete the comment",
            });
        });
};

/*

  // Create a Post
    const post = {
        user_id: req.body.user_id,
        title: req.body.title,
        description: req.body.description,
        image_url: req.file ?
            `${req.protocol}://${req.get("host")}/images/${req.file.filename}` :
            null,
    };

create a new Post: create(object)

find a Post by id: findByPk(id)

get all Posts: findAll()


update a Post by id: update(data, where: { id: id })

remove a Post: destroy(where: { id: id })

remove all Posts: destroy(where: {})

find all Posts by [condition]: findAll({ where: { condition: ... } }) → SELECT * FROM (table) WHERE [condition]


WITH CONDITION
exports.findAll = (req, res, next) => {
    const post_id = req.query.post_id;
    let condition = post_id ?
        {
            title: {
                [Operator.[SQL operator]]: `%${post_id}%`,
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



*************LIST OF OPERATORS*****************************
[Operator.eq] → = 
[Operator.ne] → ≠
[Operator.gte] → ≥
[Operator.gt] →  >
[Operator.lte] →  ≤
[Operator.lt] →  <
[Operator.and] → AND 
[Operator.or] → OR 
[Operator.join] → JOIN 

LIKE → Case sensitive
ILIKE → NOT case sensitive


On peut ajouter des fonction aggrégées avec:
 sequelize.fn('[FONCTION SQL]', sequelize.col([ATTRIBUT]), '[NOM ALTERNATIF DU TUPLE RETOURNÉ]')

 ex: exports.getMaxPrice = () => Item.findAll({
    attributes: [[sequelize.fn('max', sequelize.col('price')), 'maxPrice']],
    raw: true,
    order: sequelize.literal('count DESC')
  });
*/