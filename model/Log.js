const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
    _id: Number,
    type: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Log', LogSchema)