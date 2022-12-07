const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    street: {
        type: String,
        required: true
    },
    suite: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    website: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyCatchPhrase: {
        type: String,
        required: true
    },
    companyBs: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', UserSchema)