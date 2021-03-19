const User = require('../models/user')
module.exports = (function() {
    // createAdmin();
    
})();

// function createAdmin() {
//     User.findOne({role: 'admin'}, (err, existAdmin) => {
//         if (err) return console.log('err in create admin');
//         if (existAdmin) return console.log('admin already exist');

//         new User({
//             firstName: 'admin',
//             lastName: 'admin',
//             username: 'admin',
//             password: '123456',
//             role: 'admin',
//             sex: 'male',
//             mobile: '+989121234567'
//         }).save(err => {
//             if (err) return console.log('err in create admin');
//             console.log('admin created successfully');
//         });
//     });
// };



