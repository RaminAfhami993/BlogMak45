const express = require('express');
const multer = require('multer');
const generalTools = require('../tools/general-tools');


const router = express.Router();

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {user: req.session.user})
});


router.post('/avatar', (req, res) => {
    const upload = generalTools.uploadAvatar.single('avatar');

    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            res.status(404).send('Server Error!')   
        } else if (err) {
            res.status(406).send(err.message)   
        } else {
            let a = req.file
            res.json(true)
        }
    })
})


module.exports = router;