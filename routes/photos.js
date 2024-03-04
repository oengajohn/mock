const express = require('express');
const Photo = require('../model/Photo');

const router = express.Router()

router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const start = parseInt(req.query.start) || 0;
    const searchKey = req.query.searchKey;
    try {
        const totalCount = await Photo.find().count();
        const records = await Photo.find()
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
                const objectToBeSaved = await new Photo({
                    _id: record.id,
                    title: record.title,
                    thumbnailUrl: record.thumbnailUrl,
                    url: record.url,
                    albumId: record.albumId
                });
                await objectToBeSaved.save()
            });
            res.json({
                success: true
            })

        } else {
            const record = await new Photo({
                _id: data.id,
                title: data.title,
                thumbnailUrl: data.thumbnailUrl,
                url: data.url,
                albumId: data.albumId
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
router.post('', async (req, res) => {
    try {
        const data = req.body;
        const record = await new Photo({
            _id: data.id,
            title: data.title,
            thumbnailUrl: data.thumbnailUrl,
            url: data.url,
            albumId: data.albumId
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
router.get('/:photoId', async (req, res) => {
    try {
        const record = await Photo.findById(req.params.photoId);
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
router.delete('/:photoId', async (req, res) => {
    try {
        await Photo.remove({
            _id: req.params.photoId
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
router.put('/:photoId', async (req, res) => {
    const data = req.body;
    try {
        await Photo.updateOne({
            _id: req.params.photoId
        }, {
            $set: {
                title: data.title,
                thumbnailUrl: data.thumbnailUrl,
                url: data.url,
                albumId: data.albumId
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