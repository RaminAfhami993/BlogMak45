const path = require('path');
const multer = require('multer');

let generalTools = {};

generalTools.sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/user/profile');
    } else {
        next();
    }
};


const avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let a = path.join(__dirname, '../public/images/avatars');
        cb(null, path.join(__dirname, '../public/images/avatars'))
    },
    filename: function (req, file, cb) {
        let a = `${req.session.user.username}-${Date.now()}-${file.originalname}`;
        cb(null, `${req.session.user.username}-${Date.now()}-${file.originalname}`)
    }
});


generalTools.uploadAvatar = multer({
    storage: avatarStorage,
    fileFilter: function (req, file, cb) {
        // !file.originalname.match(/\.(jpg|jpeg|png)$/)
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg') {
                cb(null, true)

        } else {
            cb(new Error('invalid type!'), false);

        }
    }
})





module.exports = generalTools;