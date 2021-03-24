const express = require('express');
const router = express.Router();
const auth = require('./auth');
// const user = require('./user');
// const comment = require('./comment');
// const article = require('./article');
const User = require('../models/user')



router.use('/auth', auth);
// router.use('/user', user);
// router.use('/comment', comment);
// router.use('/article', article);


// router.post('/createAdmin', (req, res) => {
//     User.findOne({role: 'admin'}, (err, existAdmin) => {
//         if (err) return res.send('err in create admin');
//         if (existAdmin) return res.status(404).send('Not Found!');

//         new User({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             username: req.body.username,
//             password: req.body.password,
//             role: 'admin',
//             sex: req.body.sex,
//             mobile: req.body.mobile
//         }).save(err => {
//             if (err) return res.send('err in create admin')
//             return res.send('admin created successfully')
//         });
//     });
// })


router.post('/createAdmin', async (req, res) => {
    try {
        const existAdmin = await User.findOne({role: 'admin'});
        if (existAdmin) return res.status(404).send('Not Found!');

        let admin = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            role: 'admin',
            sex: req.body.sex,
            mobile: req.body.mobile
        });

        admin = await admin.save();

        res.json(admin)
    } catch (err) {
        res.status(500).send('err in create admin')
    }
});


module.exports = router;