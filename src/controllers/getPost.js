const Post = require("../models/Post");
const User = require("../models/User")

const getPost = async (req, res) => {
    let page = req.params.page;
    try {
        let countDocuments = await Post.countDocuments({})
        let result = await Post.find({}, null, { skip: parseInt(page * 10), limit: 10, sort: { createdAt: -1 } });
        return res.status(200).send({ data: result, total: countDocuments });
    } catch (error) {
        return res.status(400).json({ error })
    }
}

module.exports = getPost;