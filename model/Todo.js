const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    _id: Number,
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Todo', TodoSchema)