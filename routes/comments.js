const express = require('express');
const Comment = require('../model/Comment');

const router = express.Router()

router.get('/', async (req, res) => {
    const limit = parseInt(req.query._limit) || 10;
    const start = parseInt(req.query._start) || 0;
    const searchKey = req.query.searchKey;
    try {
        const totalCount = await Comment.find().count();
        const records = await Comment.find()
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
router.post('/seed/', async (req, res) => {
    try {
        const data = req.body;
        if (Array.isArray(data)) {
            data.forEach(async (record) => {
                const objectToBeSaved = await new Comment({
                    _id: record.id,
                    email: record.title,
                    name: record.name,
                    body: record.body,
                    userId: record.userId
                });
                await objectToBeSaved.save()
            });
            res.json({
                success: true
            })

        } else {
            const record = await new Comment({
                _id: data.id,
                title: data.title,
                body: data.body,
                userId: data.userId
            });
            await record.save()
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
        const record = await new Comment({
            _id: data.id,
            title: data.title,
            body: data.body,
            userId: data.userId
        });
        await record.save()
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
router.get('/:commentId', async (req, res) => {
    try {
        const record = await Comment.findById(req.params.commentId);
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
router.delete('/:commentId', async (req, res) => {
    try {
        await Comment.remove({
            _id: req.params.commentId
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
router.put('/:commentId', async (req, res) => {
    const data = req.body;
    try {
        await Comment.updateOne({
            _id: req.params.commentId
        }, {
            $set: {
                title: data.title,
                body: data.body,
                userId: data.userId
            }
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
module.exports = router;