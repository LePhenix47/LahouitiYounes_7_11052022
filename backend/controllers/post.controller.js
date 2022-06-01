const database = require("../models");
const Post = database.post;
const Like = database.like;
const Operator = database.Sequelize.Op;
const fileSystem = require("fs");

/*
// Retrieve all Posts from the database.
*/
exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then((posts) => {
            console.log("Posts found: \n" + posts);
            res.status(200).send(posts);
        })
        .catch((getAllPostsError) => {
            console.log("Posts NOT found! ----ERROR : " + getAllPostsError);
            res.status(500).send({
                message: getAllPostsError.message ||
                    "Some error occurred while retrieving the posts.",
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
                console.log("Post found: " + post);
                res.status(200).send(post);
            } else {
                res.status(404).send({
                    message: `Cannot find Post with id of ${postId}.`,
                });
            }
        })
        .catch((getPostByIdError) => {
            res.status(500).send({
                message: "Error retrieving Post with id of " +
                    postId +
                    ", error: " +
                    getPostByIdError,
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
    console.log(`Post ID = ${postId}`);
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
                    "Post DELETED successfully ! → Number returned = " + numberReturned
                );
                return res.status(200).send({
                    message: "Post was deleted successfully!",
                });
            } else {
                console.log(
                    "Post cannot be deleted! → Number returned = " + numberReturned
                );
                return res.status(400).send({
                    message: `Cannot delete Post with id = ${postId}. Post was not found!`,
                });
            }
        })
        .catch((deletePostError) => {
            res.status(500).send({
                message: "Could not delete Post with id=" +
                    postId +
                    " beacuse of error: " +
                    deletePostError,
            });
        });
};

/*
//Likes or unlikes the post  
*/
exports.likePost = (req, res, next) => {
    const postIdFromBodyRequest = req.params.id;
    const userIdFromBodyRequest = req.body.user_id;
    console.log(postIdFromBodyRequest);
    Like.findAll({
            attributes: ["userUserId", "postPostId", "liked"],
            where: {
                [Operator.and]: [
                    { userUserId: userIdFromBodyRequest },
                    { postPostId: postIdFromBodyRequest },
                ], //SELECT userUserId, postPostId FROM likes WHERE userUserId = [req.body.userUserId] AND postPostId = [req.body.post_id]
            },
        })
        .then((likeTuple) => {
            //Is the tuple empty? yes or no?
            let isTupleEmpty = likeTuple.length === 0 ? true : false;

            console.log(
                "Tuple found by the DB = " +
                JSON.stringify(likeTuple) +
                " with a type of: " +
                typeof likeTuple +
                " test of isTupleEmpty = " +
                JSON.stringify(isTupleEmpty)
            );
            console.assert(likeTuple.length === 0, "Error, likeTuple !== []");
            console.assert(isTupleEmpty === true, "The isTupleEmpty isn't empty");
            if (isTupleEmpty) {
                console.log(
                    `Post with Id = ${postIdFromBodyRequest} hasn't been found, creating a tuple on the Like table for the post...`
                );
                const liked = {
                    userUserId: userIdFromBodyRequest,
                    postPostId: postIdFromBodyRequest,
                    liked: true,
                };
                Like.create(liked)
                    .then((likedPost) => {
                        console.log(
                            `Like tuple successfully added to the table: ${likedPost}`
                        );
                        res.status(200).json({ message: "Liked!" });
                    })
                    .catch((addLikeTupleError) =>
                        res.status(500).json({
                            message: "Error while attempting to like" + addLikeTupleError,
                        })
                    );
            } else if (!isTupleEmpty) {
                console.log(
                    `Post with ID = ${postIdFromBodyRequest} has been found in the table of liked → Verifying if it has already been liked`
                );
                let postAlreadyLiked = likeTuple[0].liked;
                console.assert(
                    typeof postAlreadyLiked === Boolean,
                    "Fail, not a boolean"
                );
                console.log(
                    "\nResult of likeTuple = " +
                    JSON.stringify(likeTuple) +
                    " " +
                    typeof likeTuple +
                    likeTuple
                );
                console.log(
                    "++++++++++++ likeTuple[0].liked = " +
                    JSON.stringify(likeTuple[0].liked)
                );
                console.log("likeTuple = " + JSON.stringify(likeTuple));
                console.log(
                    "The post has already been UNLIKED POST → set the liked = false in the DB"
                );
                Like.update({
                        liked: !postAlreadyLiked,
                    }, {
                        where: {
                            [Operator.and]: [
                                { userUserId: userIdFromBodyRequest },
                                { postPostId: postIdFromBodyRequest },
                            ],
                        },
                    })
                    .then(() => {
                        console.log("SUCCESS while updating the post by removing the like");
                        res.status(200).json({
                            message: "The post has been " +
                                (postAlreadyLiked ? "unliked (-1)" : "liked (+1)"),
                        });
                    })
                    .catch((updatingPostLikeError) => {
                        console.log(
                            "ERROR while updating the post by removing the like (liked = false)"
                        );
                        res.status(500).json({
                            message: "Error" + updatingPostLikeError,
                        });
                    });
            }
        })
        .catch((findingLikeError) => {
            res.status(500).json({
                message: "Error while attempting to find the tuple → " + findingLikeError,
            });
        });
};

/*


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
 sequelize.fn('[FONCTION SQL]', sequelize.col([ATTRIBUT]), '[ALIAS SQL]')

 ex: exports.getMaxPrice = () => Item.findAll({
    attributes: [[sequelize.fn('max', sequelize.col('price')), 'maxPrice']],
    raw: true,
    order: sequelize.literal('count DESC')
  });
*/