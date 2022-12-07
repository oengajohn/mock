const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    _id: Number,
    title: {
        type: String,
        required: true
    },
    body: String,
    userId: Number
});

module.exports = mongoose.model('Post', PostSchema)