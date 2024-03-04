const express = require('express');
const Comment = require('../model/Comment');
const Post = require('../model/Post');

const router = express.Router()

//GET ALL POSTS
router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const start = parseInt(req.query.start) || 0;
    const searchKey = req.query.searchKey;

    try {
        const totalCount = await Post.find().count();
        const records = await Post.find()
            .skip(start)
            .limit(limit);
        res.json({
            totalCount: totalCount,
            rows: records,
            success: true
        })

    } catch (err) {
        res.json({
            success: false,
            msg: err.message,
        })
    }
});
router.get('/:postId/comments', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const start = parseInt(req.query.start) || 0;
    const postId = parseInt(req.params.postId);

    try {
        const totalCount = await Comment.where("postId").equals(postId).count();
        const records = await Comment.where("postId").equals(postId)
            .skip(start)
            .limit(limit);
        res.json({
            totalCount: totalCount,
            rows: records,
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
router.post('/seed', async (req, res) => {
    try {
        const data = req.body;
        if (Array.isArray(data)) {
            data.forEach(async (record) => {
                const recordToBeSaved = await new Post({
                    _id: record.id,
                    title: record.title,
                    body: record.body,
                    userId: record.userId
                });
                await recordToBeSaved.save()
            });
            res.json({
                success: true
            })

        } else {
            const recordToBeSaved = await new Post({
                _id: data.id,
                title: data.title,
                body: data.body,
                userId: data.userId
            });
            await recordToBeSaved.save()
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
        const recordToBeSaved = await new Post({
            _id: data.id,
            title: data.title,
            body: data.body,
            userId: data.userId
        });
        await recordToBeSaved.save()
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

router.get('/:postId', async (req, res) => {
    try {
        const record = await Post.findById(req.params.postId);
        res.json({
            success: true,
            data: record
        })
    } catch (err) {
        res.json({
            msg: err.message,
            success: false
        })
    }
})


router.delete('/:postId', async (req, res) => {
    try {
        await Post.remove({
            _id: req.params.postId
        });
        res.json({
            success: true
        })
    } catch (err) {
        res.json({
            msg: err.message,
            success: false
        })
    }
})

router.put('/:postId', async (req, res) => {
    try {
        const data = req.body;
        await Post.updateOne({
            _id: req.params.postId
        }, {
            $set: {
                title: data.title,
                description: data.description,
                body: data.body
            }
        });
        res.json({
            success: true,
        })
    } catch (err) {
        res.json({
            msg: err.message,
            success: false
        })
    }
})
module.exports = router;