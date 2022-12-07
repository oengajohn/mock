const express = require('express');
const User = require('../model/User');
const router = express.Router()

//GET ALL Users
router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10
    const start = parseInt(req.query.start) || 0
    const page = parseInt(req.query.page) || 1

    try {
        const userCount = await User.find().count();
        const users = await User.find()
            .skip(start)
            .limit(limit);
        res.json({
            totalCount: userCount,
            rows: users,
            success: true
        })

    } catch (err) {
        res.json({
            success: false,
            msg: err.message,
        })
    }
});
//SAVE User
router.post('/seed/', async (req, res) => {
    try {
        const data = req.body;
        if (Array.isArray(data)) {
            data.forEach(async (user) => {
                const userToBeSaved = await new User({
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
                await userToBeSaved.save()

            });
            res.json({
                success: true
            })

        } else {
            const user = await new User({
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
        const user = await new User({
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
        await user.save()
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
        const user = await User.findById(req.params.userId);
        res.json({
            success: true,
            data: user,
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
        const removedUser = await User.remove({
            _id: req.params.userId
        });
        res.json({
            success: true,
            data: removedUser,
        })
    } catch (err) {
        res.json({
            msg: err.message,
            success: false
        })
    }
})
//Update User
router.patch('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne({
            _id: req.params.userId
        }, {
            $set: {
                title: req.body.title,
                description: req.body.description
            }
        });
        res.json({
            success: true,
            data: updatedUser,
        })
    } catch (err) {
        res.json({
            msg: err.message,
            success: false
        })
    }
})
module.exports = router;