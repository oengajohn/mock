const express = require('express');
const Album = require('../model/Album');
const Photo = require('../model/Photo');

const router = express.Router()

router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const start = parseInt(req.query.start) || 0;
    const searchKey = req.query.searchKey;
    try {
        const totalCount = await Album.find().count();
        const records = await Album.find()
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
router.get('/:albumId/photos', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const start = parseInt(req.query.start) || 0;
    const albumId = parseInt(req.params.albumId);

    try {
        const totalCount = await Photo.where("albumId").equals(albumId).count();
        const records = await Photo.where("albumId").equals(albumId)
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
router.post('/seed', async (req, res) => {
    try {
        const data = req.body;
        if (Array.isArray(data)) {
            data.forEach(async (record) => {
                const objectToBeSaved = await new Album({
                    _id: record.id,
                    title: record.title,
                    userId: record.userId
                });
                await objectToBeSaved.save()
            });
            res.json({
                success: true
            })

        } else {
            const record = await new Album({
                _id: data.id,
                title: data.title,
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
        const record = await new Album({
            _id: data.id,
            title: data.title,
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
router.get('/:albumId', async (req, res) => {
    try {
        const record = await Album.findById(req.params.albumId);
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
router.delete('/:albumId', async (req, res) => {
    try {
        await Album.remove({
            _id: req.params.albumId
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
router.put('/:albumId', async (req, res) => {
    const data = req.body;
    try {
        await Album.updateOne({
            _id: req.params.albumId
        }, {
            $set: {
                title: data.title,
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