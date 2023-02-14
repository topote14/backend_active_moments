const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    owner: {
        id: { type: String, required: true },
        username: { type: String, required: true },
        name: { type: String, default: "" },
        lastname: { type: String, default: "" },
        image: { type: String, default: "" }
    },
    content: { type: String, default: "" },
    image: { type: String, default: "" },
    likes: { type: Array, default: [] },
    commentsQuantity: { type: Number, default: 0 }
}, {
    timestamps: true,
})

const postModel = model('Post', postSchema);

module.exports = postModel;