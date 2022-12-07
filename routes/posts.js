const express = require('express');
const Post = require('../model/Post');

const router = express.Router()

//GET ALL POSTS
router.get('/', async (req, res) => {
    const limit = parseInt(req.query._limit) || 10;
    const start = parseInt(req.query._start) || 0;
    const searchKey = req.query.searchKey;

    try {
        const postCount = await Post.find().count();
        const posts = await Post.find()
            .skip(start)
            .limit(limit);
        res.json({
            totalCount: postCount,
            rows: posts,
            success: true
        })

    } catch (err) {
        res.json({
            success: false,
            msg: err.message,
        })
    }
});
//SAVE POST
router.post('/seed/', async (req, res) => {
    try {
        const data = req.body;
        if (Array.isArray(data)) {
            data.forEach(async (post) => {
                const postToBeSaved = await new Post({
                    _id: post.id,
                    title: post.title,
                    body: post.body,
                    userId: post.userId
                });
                const savedPost = await postToBeSaved.save()
            });
            res.json({
                success: true
            })

        } else {
            const user = await new Post({
                _id: data.id,
                title: data.title,
                body: data.body,
                userId: data.userId
            });
            await user.save()
            res.json({
                success: true
            })

        }
    } catch (err) {
        res.json({
            msg: err.message,
            success: false
        })
    }


});
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const user = await new Post({
            _id: data.id,
            title: data.title,
            body: data.body,
            userId: data.userId
        });
        await user.save()
        res.json({
            success: true
        })
    } catch (err) {
        res.json({
            msg: err.message,
            success: false
        })
    }
});
//SPECIFIC POST
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json({
            success: true,
            data: post,
        })
    } catch (err) {
        res.json({
            msg: err.message,
            success: false
        })
    }
})

//DELETE
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({
            _id: req.params.postId
        });
        res.json({
            success: true,
            data: removedPost,
        })
    } catch (err) {
        res.json({
            msg: err.message,
            success: false
        })
    }
})
//Update
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({
            _id: req.params.postId
        }, {
            $set: {
                title: req.body.title,
                description: req.body.description
            }
        });
        res.json({
            success: true,
            data: updatedPost,
        })
    } catch (err) {
        res.json({
            msg: err.message,
            success: false
        })
    }
})
module.exports = router;