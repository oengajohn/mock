const mongoose = require('mongoose');

const AlbumSchema = mongoose.Schema({
    _id: Number,
    title: {
        type: String,
        required: true
    },
    userId: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Album', AlbumSchema)