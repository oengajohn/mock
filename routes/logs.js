const express = require('express');
const Log = require('../model/Log');

const router = express.Router()


router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const start = parseInt(req.query.start) || 0;
    const searchKey = req.query.time;

    try {
        const totalCount = await Log.find().count();
        let records;
        if (searchKey) {
            records = await Log.find({
                time: searchKey
            })
                .skip(start)
                .limit(limit);
        } else {
            records = await Log.find()
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
router.post('/seed', async (req, res) => {
    try {
        const data = req.body;
        if (Array.isArray(data)) {
            data.forEach(async (record) => {
                const recordToBeSaved = await new Log({
                    _id: record.id,
                    type: record.type,
                    message: record.message,
                    time: record.time
                });
                await recordToBeSaved.save()
            });
            res.json({
                success: true
            })

        } else {
            const recordToBeSaved = await new Log({
                _id: data.id,
                type: data.type,
                message: data.message,
                time: data.time
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
        const recordToBeSaved = await new Log({
            _id: data.id,
            type: data.type,
            message: data.message,
            time: data.time
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
router.get('/:logID', async (req, res) => {
    try {
        const record = await Log.findById(req.params.logID);
        res.json({
            success: true,
            data: record,
        })
    } catch (err) {
        res.json({
            msg: err.message,
            success: false
        })
    }
})

router.delete('/:logID', async (req, res) => {
    try {
        await Log.remove({
            _id: req.params.logID
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
router.put('/:logID', async (req, res) => {
    try {
        const data = req.body;
        await Log.updateOne({
            _id: req.params.logID
        }, {
            $set: {
                type: data.type,
                compeleted: data.compeleted
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