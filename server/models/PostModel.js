const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group' // Reference to the Group collection
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            comment : { type: String },
            timestamp : { type: Date, default: Date.now }
        }
    ]
}, {timestamps: true});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;