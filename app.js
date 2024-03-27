const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser');
require('dotenv').config();
//APP
const app = express();
//Middlewares

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(cors())
app.use(morgan("tiny"))
app.set('view engine', 'ejs');
app.set("views", path.resolve(__dirname, "views"))

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")))
app.use("/js", express.static(path.resolve(__dirname, "assets/js")))
app.use("/img", express.static(path.resolve(__dirname, "assets/img")))

//import Routes
const postsRoute = require('./routes/posts')
const requestsRoute = require('./routes/requests')
const usersRoute = require('./routes/users')
const todosRoute = require('./routes/todos')
const logsRoute = require('./routes/logs')
const commentsRoute = require('./routes/comments')
const albumsRoute = require('./routes/albums')
const photosRoute = require('./routes/photos')

//Routes
app.use('/posts', postsRoute);
app.use('/requests', requestsRoute);
app.use('/users', usersRoute);
app.use('/todos', todosRoute);
app.use('/routes', logsRoute);
app.use('/comments', commentsRoute);
app.use('/photos', photosRoute);
app.use('/albums', albumsRoute);



app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "views/README.html"))
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