const express = require('express');
const Todo = require('../model/Todo');

const router = express.Router()


router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const start = parseInt(req.query.start) || 0;
    const searchKey = req.query.userId;

    try {
        const totalCount = await Todo.find().count();
        let records;
        if (searchKey) {
            records = await Todo.find({
                userId: searchKey
            })
                .skip(start)
                .limit(limit);
        } else {
            records = await Todo.find()
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
                const recordToBeSaved = await new Todo({
                    _id: record.id,
                    title: record.title,
                    completed: record.completed,
                    userId: record.userId
                });
                await recordToBeSaved.save()
            });
            res.json({
                success: true
            })

        } else {
            const recordToBeSaved = await new Todo({
                _id: data.id,
                title: data.title,
                completed: data.completed,
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
        const recordToBeSaved = await new Todo({
            _id: data.id,
            title: data.title,
            completed: data.completed,
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
router.get('/:todoId', async (req, res) => {
    try {
        const record = await Todo.findById(req.params.todoId);
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

router.delete('/:todoId', async (req, res) => {
    try {
        await Todo.remove({
            _id: req.params.todoId
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
router.put('/:todoId', async (req, res) => {
    try {
        const data = req.body;
        await Todo.updateOne({
            _id: req.params.todoId
        }, {
            $set: {
                title: data.title,
                completed: data.completed
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