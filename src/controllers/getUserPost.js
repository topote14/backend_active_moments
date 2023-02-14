const Post = require("../models/Post");
const User = require("../models/User");

const getUserPost = async (req, res) => {
    let page = req.params.page;
    let userId = req.params.userId
    try {
        // Busco al usuario para que en caso de que no exista, devuelva error
        let user = await User.find({ _id: userId })
        let countDocuments = await Post.countDocuments({ "owner.id": userId })
        let result = await Post.find({ "owner.id": userId }, null, { skip: parseInt(page * 10), limit: 10, sort: { createdAt: -1 } });
        return res.status(200).send({ data: result, total: countDocuments });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports = getUserPost;
