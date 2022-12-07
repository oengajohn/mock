const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
    _id: Number,
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    albumId: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Photo', PhotoSchema)