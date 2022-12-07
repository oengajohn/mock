const express = require('express');
const Todo = require('../model/Todo');

const router = express.Router()


router.get('/', async (req, res) => {
    const limit = parseInt(req.query._limit) || 10;
    const start = parseInt(req.query._start) || 0;
    const searchKey = req.query.searchKey;

    try {
        const todoCount = await Todo.find().count();
        const todos = await Todo.find()
            .skip(start)
            .limit(limit);
        res.json({
            totalCount: todoCount,
            rows: todos,
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
            data.forEach(async (todo) => {
                const todoToBeSaved = await new Todo({
                    _id: todo.id,
                    title: todo.title,
                    completed: todo.completed,
                    userId: todo.userId
                });
                await todoToBeSaved.save()
            });
            res.json({
                success: true
            })

        } else {
            const todo = await new Todo({
                _id: data.id,
                title: data.title,
                completed: data.completed,
                userId: data.userId
            });
            await todo.save()
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
        const todo = await new Todo({
            _id: data.id,
            title: data.title,
            completed: data.completed,
            userId: data.userId
        });
        await todo.save()
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
        const todo = await Todo.findById(req.params.todoId);
        res.json({
            success: true,
            data: todo,
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
        const removedTodo = await Todo.remove({
            _id: req.params.todoId
        });
        res.json({
            success: true,
            data: removedTodo,
        })
    } catch (err) {
        res.json({
            msg: err.message,
            success: false
        })
    }
})
router.patch('/:todoId', async (req, res) => {
    try {
        const updatedTodo = await Todo.updateOne({
            _id: req.params.todoId
        }, {
            $set: {
                title: req.body.title,
                compeleted: req.body.compeleted
            }
        });
        res.json({
            success: true,
            data: updatedTodo,
        })
    } catch (err) {
        res.json({
            msg: err.message,
            success: false
        })
    }
})
module.exports = router;