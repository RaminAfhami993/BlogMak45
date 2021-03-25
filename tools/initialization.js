const User = require('../models/user')
const fs = require("fs");
const path = require("path");

module.exports = (function() {
    // createAdmin();
    (fs.existsSync(path.join(__dirname, '../public/images')) || fs.mkdirSync(path.join(__dirname, '../public/images')));
    (fs.existsSync(path.join(__dirname, '../public/images/avatars')) || fs.mkdirSync(path.join(__dirname, '../public/images/avatars')));

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

// async function createAdmin() {
//     try {
//         let existAdmin = await User.findOne({role: 'admin'});

//         if (existAdmin) throw new Error('admin already exist');
        
//         let admin = await new User({
//                 firstName: 'admin',
//                 lastName: 'admin',
//                 username: 'admin',
//                 password: '123456',
//                 role: 'admin',
//                 sex: 'male',
//                 mobile: '+989121234567'
//             }).save();

//         console.log(admin);
//     } catch (err) {
//         console.log(err.message);
//     };
// };


// async function createAdmin() {

//     try {
//         let existAdmin = await new Promise((resolve, reject) => {
//             User.findOne({role: 'admin'}, (err, existAdmin) => {
//                 if (err) reject('err in create admin');
//                 if (existAdmin) resolve(existAdmin);
//             })
//         });

//         if (existAdmin) return console.log("admin already exist");
        
//         let admin = await new Promise((resolve, reject) => {
//             new User({
//                 firstName: 'admin',
//                 lastName: 'admin',
//                 username: 'admin',
//                 password: '123456',
//                 role: 'admin',
//                 sex: 'male',
//                 mobile: '+989121234567'
//             }).save((err, admin) => {
//                 if (err) reject('err in create admin');
//                 if (admin) resolve(admin);
//             });
//         });

//         console.log(admin);
        

//     } catch (err) {
//         console.log(err);
//     };
// };




