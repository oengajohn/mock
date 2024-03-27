const express = require('express');
const Comment = require('../model/Comment');
const Request = require('../model/Request');

const router = express.Router()

//GET ALL POSTS
router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const start = parseInt(req.query.start) || 0;
    const searchKey = req.query.userId;

    try {
        const totalCount = await Request.find().count();
        let records;
        if (searchKey) {
            records = await Request.find({
                userId: searchKey
            })
                .skip(start)
                .limit(limit);
        } else {
            records = await Request.find()
                .skip(start)
                .limit(limit);
        }
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
router.get('/:requestID/comments', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const start = parseInt(req.query.start) || 0;
    const requestID = parseInt(req.params.requestID);

    try {
        const totalCount = await Comment.where("requestID").equals(requestID).count();
        const records = await Comment.where("requestID").equals(requestID)
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
                const recordToBeSaved = await new Request({
                    _id: record.id,
                    name: record.name,
                    status: record.status,
                    date: record.date,
                    ipAddress: record.ipAddress,
                    resourceUrl: record.resourceUrl
             
                });
                await recordToBeSaved.save()
            });
            res.json({
                success: true
            })

        } else {
            const recordToBeSaved = await new Request({
                _id: data.id,
                name: data.name,
                status: data.status,
                date: data.date,
                ipAddress: data.ipAddress,
                resourceUrl: data.resourceUrl
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
        const recordToBeSaved = await new Request({
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

router.get('/:requestID', async (req, res) => {
    try {
        const record = await Request.findById(req.params.requestID);
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


router.delete('/:requestID', async (req, res) => {
    try {
        await Request.remove({
            _id: req.params.requestID
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

router.put('/:requestID', async (req, res) => {
    try {
        const data = req.body;
        await Request.updateOne({
            _id: req.params.requestID
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