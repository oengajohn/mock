const express = require('express');
const User = require('../model/User');
const Post = require('../model/Post');
const Album = require('../model/Album');
const Todo = require('../model/Todo');
const router = express.Router()

//GET ALL Users
router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const start = parseInt(req.query.start) || 0;
    const searchKey = req.query.searchKey;

    try {
        const totalCount = await User.find().count();
        const records = await User.find()
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
router.get('/:userId/posts', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const start = parseInt(req.query.start) || 0;
    const userId = parseInt(req.params.userId);

    try {
        const totalCount = await Post.where("userId").equals(userId).count();
        const records = await Post.where("userId").equals(userId)
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
router.get('/:userId/albums', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const start = parseInt(req.query.start) || 0;
    const userId = parseInt(req.params.userId);

    try {
        const totalCount = await Album.where("userId").equals(userId).count();
        const records = await Album.where("userId").equals(userId)
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
router.get('/:userId/todos', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const start = parseInt(req.query.start) || 0;
    const userId = parseInt(req.params.userId);

    try {
        const totalCount = await Todo.where("userId").equals(userId).count();
        const records = await Todo.where("userId").equals(userId)
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
            data.forEach(async (user) => {
                const objectToBeSaved = await new User({
                    _id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    street: user.address.street,
                    suite: user.address.suite,
                    city: user.address.city,
                    zipcode: user.address.zipcode,
                    lat: user.address.geo.lat,
                    lng: user.address.geo.lng,
                    phone: user.phone,
                    website: user.website,
                    companyName: user.company.name,
                    companyCatchPhrase: user.company.catchPhrase,
                    companyBs: user.company.bs,

                });
                await objectToBeSaved.save()

            });
            res.json({
                success: true
            })

        } else {
            const recordToBeSaved = await new User({
                _id: data.id,
                name: data.name,
                username: data.username,
                email: data.email,
                street: data.address.street,
                suite: data.address.suite,
                city: data.address.city,
                zipcode: data.address.zipcode,
                lat: data.address.geo.lat,
                lng: data.address.geo.lng,
                phone: data.phone,
                website: data.website,
                companyName: data.company.name,
                companyCatchPhrase: data.company.catchPhrase,
                companyBs: data.company.bs,

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
        const recordToBeSaved = await new User({
            _id: data.id,
            name: data.name,
            username: data.username,
            email: data.email,
            street: data.street,
            suite: data.suite,
            city: data.city,
            zipcode: data.zipcode,
            lat: data.lat,
            lng: data.lng,
            phone: data.phone,
            website: data.website,
            companyName: data.companyName,
            companyCatchPhrase: data.companyCatchPhrase,
            companyBs: data.companyBs,

        });
        await recordToBeSaved.save()
        res.json({
            success: true
        });

    } catch (err) {
        res.json({
            msg: err.message,
            success: false
        })
    }


});
//SPECIFIC User
router.get('/:userId', async (req, res) => {
    try {
        const record = await User.findById(req.params.userId);
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

//DELETE User
router.delete('/:userId', async (req, res) => {
    try {
        await User.remove({
            _id: req.params.userId
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
//Update User
router.put('/:userId', async (req, res) => {
    try {
        const data = req.body;
        await User.updateOne({
            _id: req.params.userId
        }, {
            $set: {
                name: data.name,
                username: data.username,
                email: data.email,
                street: data.street,
                suite: data.suite,
                city: data.city,
                zipcode: data.zipcode,
                lat: data.lat,
                lng: data.lng,
                phone: data.phone,
                website: data.website,
                companyName: data.companyName,
                companyCatchPhrase: data.companyCatchPhrase,
                companyBs: data.companyBs,
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