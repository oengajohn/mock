const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },
    postId: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema)