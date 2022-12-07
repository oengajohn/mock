const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
//APP
const app = express();
//Middlewares
app.use(express.json())
app.use(cors())

//import Routes
const postsRoute = require('./routes/posts')
const usersRoute = require('./routes/users')
const todosRoute = require('./routes/todos')
const commentsRoute = require('./routes/comments')
const photosRoute = require('./routes/photos')

//Routes
app.use('/posts', postsRoute);
app.use('/users', usersRoute);
app.use('/todos', todosRoute);
app.use('/comments', commentsRoute);
app.use('/photos', photosRoute);



app.get('/test', (req, res) => {
    res.send({
        success: true,
        msg: "We are home"
    })
});
mongoose.connect(
    process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
const db = mongoose.connection;
const {
    users,
    posts
} = db.collections
// posts.drop();
// users.drop();
db.on("error", console.error.bind(console, "MongoDB connection error:"));
//listen
app.listen(3000)