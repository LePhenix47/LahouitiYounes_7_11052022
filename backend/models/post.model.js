module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        post_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING(180),
            allowNull: false,
        },
        image_url: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });
    return Post;
};

/*
Pour respecter les normes RGPD, il ne faut pas supprimer en dur les données, à la place, il faut les supprimer "en douce"
C'est-à-dire qu'on va marquer un commentaire, post ou utilisateur comme supprimé mais il reste l'audit dans la B2D


// Paranoid
// Sequelize supports the concept of paranoid tables. A paranoid table is one that, when told to delete a record, it will not truly delete it. Instead, a special column called deletedAt will have its value set to the timestamp of that deletion request.

// This means that paranoid tables perform a soft-deletion of records, instead of a hard-deletion.

// Defining a model as paranoid
// To make a model paranoid, you must pass the paranoid: true option to the model definition. Paranoid requires timestamps to work (i.e. it won't work if you also pass timestamps: false).

// You can also change the default column name (which is deletedAt) to something else.

// class Post extends Model {}
// Post.init({ [attributs HERE]  }, {
//   sequelize,
//   paranoid: true,

//   // If you want to give a custom name to the deletedAt column
//   deletedAt: 'destroyTime'
// });

// Restoring
// To restore soft-deleted records, you can use the restore method, which comes both in the static version as well as in the instance version:

// // Example showing the instance `restore` method
// // We create a post, soft-delete it and then restore it back
// const post = await Post.create({ title: 'test' });
// console.log(post instanceof Post); // true
// await post.destroy();
// console.log('soft-deleted!');
// await post.restore();
// console.log('restored!');

// // Example showing the static `restore` method.
// // Restoring every soft-deleted post with more than 100 likes
// await Post.restore({
//   where: {
//     likes: {
//       [Op.gt]: 100
//     }
//   }
// });
*/