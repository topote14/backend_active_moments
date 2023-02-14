const Post = require("../models/Post");

const likePost = async (req, res)=> {
    let postId = req.body.postId;
    let userId = req.user.id;
    try {
        // Busco el post
        let post = await Post.findOne({ _id: postId });
        let isLike;
        // Si la id del usuario no existe en los likes
        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
            isLike = true;
        }
        // Si existe
        else {
            let index = post.likes.findIndex((user) => user == userId);
            post.likes.splice(index, 1);
            isLike = false;
        }
        // Guardo y retorno la accion
        await post.save();
        return res.status(200).send({ isLike });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports = likePost;
