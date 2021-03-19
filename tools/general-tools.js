let generalTools = {};

generalTools.sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/api/user/profile');
    } else {
        next();
    }    
};

module.exports = generalTools;