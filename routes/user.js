const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const generalTools = require('../tools/general-tools');
const User = require('../models/user');
const acc = require('../tools/acc')


const router = express.Router();

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {user: req.session.user})
});


router.post('/avatar', (req, res) => {
    const upload = generalTools.uploadAvatar.single('avatar');

    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send('Server Error!')   
        } else if (err) {
            res.status(404).send(err.message)   
        } else {
            User.findByIdAndUpdate(req.session.user._id, {avatar: req.file.filename}, {new: true}, (err, user) => {
                if (err) {
                    res.status(500).json({msg: 'Server Error!'})   
                } else {
                    if (req.session.user.avatar) {
                        fs.unlink(path.join(__dirname, '../public/images/avatars', req.session.user.avatar), err => {
                            if (err) {
                                res.status(500).json({msg: 'Server Error!'})
                            } else {
                                req.session.user = user;

                                res.redirect('/user/dashboard');
                            }
                        })

                    } else {
                        req.session.user = user;


                        res.redirect('/user/dashboard');
                    }
                }
            });    
        }
    })
});


// n = 13
// i = 5

// 0 -> 0i - i - 1
// 1 -> i  - 2i -1
// 2 -> 2i  - 3i -1
// 3 -> 3i  - 4i -1



router.get('/allUsers/:page/:num', acc.userManagement, (req, res) => {

    User.countDocuments({role: {$ne: 'admin'}}, (err, count) => {
        if (err) return res.json({err, msg: "Something went wrong"});

        User.find({role: {$ne: 'admin'}}).sort({createdAt: -1}).skip(Number(req.params.page) * Number(req.params.num)).limit(Number(req.params.num)).exec((err, users) => {
            if (err) return res.json({err, msg: "Something went wrong"});
            res.json({users, count});
        })
    })

})


router.post('/editUser', acc.editUser, (req, res) => {

    res.json(true)
  
})






module.exports = router;