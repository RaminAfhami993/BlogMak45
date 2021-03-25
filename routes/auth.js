const express = require('express');
const router = express.Router();
const url = require('url');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const generalTools = require('../tools/general-tools');

router.get('/registerPage', generalTools.sessionChecker, (req, res) => {
    res.render('auth/register', {msg: req.query.msg})
});


router.post('/register', (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.sex || !req.body.mobile) {
        return res.redirect(url.format({
            pathname:"/auth/registerPage",
            query: {
               "msg": 'Empty Field :('
             }
        }));
    };

    User.findOne({username: req.body.username.trim()}, (err, existUser) => {
        if (err) {
            return res.redirect(url.format({
                pathname:"/auth/registerPage",
                query: {
                   "msg": 'Server Error :('
                 }
            }));
        };
         
        if (existUser) {
            return res.redirect(url.format({
                pathname:"/auth/registerPage",
                query: {
                   "msg": 'Username Already Exist :('
                 }
            }));
        };

        new User({
            username: req.body.username.trim(),
            password: req.body.password,
            sex: req.body.sex,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobile: req.body.mobile
        }).save(err => {
            if (err) {
                return res.redirect(url.format({
                    pathname:"/auth/registerPage",
                    query: {
                       "msg": 'Server Error :('
                     }
                }));
            };

            return res.redirect("/auth/loginPage");
        });
    });
});


router.get('/loginPage', generalTools.sessionChecker, (req, res) => {
    res.render('auth/login', {msg: req.query.msg})
});

router.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.redirect(url.format({
            pathname:"/auth/loginPage",
            query: {
               "msg": 'Empty Field :('
             }
        }));
    };

    User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            return res.redirect(url.format({
                pathname:"/auth/loginPage",
                query: {
                   "msg": 'Server Error :('
                 }
            }));
        };

        if (!user) {
            return res.redirect(url.format({
                pathname:"/auth/loginPage",
                query: {
                   "msg": 'User Not Found :('
                 }
            }));
        };

        bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
            if (err) {
                return res.redirect(url.format({
                    pathname:"/auth/loginPage",
                    query: {
                       "msg": 'Server Error :('
                     }
                }));
            };

            if (!isMatch) return res.redirect(url.format({
                pathname:"/auth/loginPage",
                query: {
                   "msg": 'User Not Found :('
                 }
            }));

            req.session.user = user;

            res.redirect('/user/dashboard');
        });
    });
});




module.exports = router;