const acc = {};


acc.userManagement = (req, res, next) => {
    if (req.session.user.role !== 'admin') return res.status(403).json({msg: 'Permission denied :('})
    else next();
};


acc.editUser = (req, res, next) => {
    if (req.session.user.role === 'admin') return next();
    if (req.session.user._id === req.body.userId) return next();
    else res.status(403).json({msg: 'Permission denied :('})
};

module.exports = acc;