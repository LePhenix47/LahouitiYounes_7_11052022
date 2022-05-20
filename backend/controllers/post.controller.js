const Post = require("../models/post.model");
const fileSystem = require("fs");

const { Operation } = require("sequelize");

/*
//Controlleur pour récupérer TOUTES les posts dans la base de données
*/
exports.getAllPosts = async(req, res, next) => {
    let post = await Post.find();
    console.log("SUCCESS trying to find posts! ");
    res.status(200).json(posts);

    if (!post) {
        console.log("Error while getting all the posts");
        res.status(404).json({ message: "Posts not found" });
    }
};

/*
//Controlleur pour récupérer une post à partir de son ID dans l'URL
*/
exports.getOnePost = async(req, res, next) => {
    Post.findOne({
            post_id: req.params.id,
        })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            console.log(
                "Error after trying to fetch the post with the Id :" +
                req.body.user_id +
                " : " +
                error
            );
            res.status(404).json({
                error,
            });
        });
};

/*
//Controlleur pour créer une post
*/
exports.createPost = async(req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject.user_id;
    const newPost = new Post({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    console.log("URL of this new image " + newPost.imageUrl);
    newPost
        .save()
        .then(() => {
            console.log("Post SUCCESSFULLY created");
            res.status(201).json({ message: "Post object SUCCESSFULLY created!" });
        })
        .catch((error) => {
            console.log("Error after creating the post object: " + error);
            res.status(400).json({ error });
        });
};

/*
//Controlleur pour modifier une post
*/
exports.modifyPost = async(req, res, next) => {
    let oldImageUrl = undefined;
    let oldFilename = undefined;
    let newImageUrl = undefined;

    let post = await Post.findOne({ user_id: req.params.id });

    console.log(post);
    oldImageUrl = post.imageUrl;
    oldFilename = oldImageUrl.split("/images")[1];
    console.log("-------------------Old image URL " + oldImageUrl);

    if (req.file) {
        newImageUrl = req.file.filename;

        let oldImageUri = oldFilename.split("@!img$")[0];
        let newImageUri = newImageUrl.split("@!img$")[0];

        if (newImageUri !== oldImageUri) {
            fileSystem.unlink(`images/${oldFilename}`, () => {
                console.log(
                    "OLD Image with uri: " + oldFilename + " successfully deleted"
                );
            });
        }
    }
    const postObject = req.file ?
        {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        } :
        {...req.body };
    Post.updateOne({ user_id: req.params.id }, {...postObject, user_id: req.params.id })
        .then(() =>
            res.status(200).json({ message: "Post Object SUCCESSFULLY modified !" })
        )
        .catch((error) => res.status(400).json({ error }));
};

/*
//Controlleur pour supprimer une post
*/
exports.deletePost = async(req, res, next) => {
    try {
        Post.findOne({ user_id: req.params.id }).then((post) => {
            if (!post) {
                console.log("The post is not registered in the database");
                return res.status(404).json({ error: new Error("Post not found") });
            }
            if (post.userId !== req.auth.userId) {
                console.log("The user IDs do not match");
                return res.status(403).json({ error: new Error("Forbidden request") });
            }

            const filename = post.imageUrl.split("/images")[1];
            fileSystem.unlink(`images/${filename}`, () => {
                let deletePost = Post.deleteOne({ user_id: req.params.id }, {...req.body, user_id: req.params.id });

                if (!deletePost) {
                    console.log(
                        "Error found while attempting to delete the sauce: " + deletePost
                    );
                    return res
                        .status(400)
                        .json({ error: "Deletion fo the post has failed" });
                }
                console.log("Post" + post + " SUCCESSFULLY deleted");
                return res.status(200).json({ message: "Post SUCCESSFULLY deleted" });
            });
        });
    } catch (error) {
        console.log("ERROR FOUND WHILE ATTEMPTING TO DELETE THE POST:" + error);
        res.status(500);
    }
};

/*
//Controlleur pour le like/dislike d'une post
*/

exports.likePost = async(req, res, next) => {
    try {
        let post = await Post.findOne({ user_id: req.params.id });
    } catch (error) {
        console.log("------Error: " + error);
        res.status(400).json({ error });
    }
};