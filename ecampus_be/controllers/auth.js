const User = require('../models/user')
const jwt = require('jsonwebtoken')
// const Noti  = require('../models/notiFiyToken')
const Student = require('../models/student')
const user = require('../models/user')
// const { admin } = require('../firebase');


// exports.fetchEmail = (req, res) => {
//     console.log(req.body)
//     let exist = false
//     User.findOne({email: req.body.email}).exec((err, user) => {
//         if (err || !user) {
//             console.log(err)
//             res.send({
//                 message: "User Dosn't Exists",
//                 exist
//             })
//         } else {
//             res.send({
//                 message: "User Exists",
//                 exist: true
//             })
//         }
//     })
// }

exports.register = (req, res) => {
    console.log(req.body)
    User.findOne({email: req.body.email}).exec((err, user) => {
        if (user) {
            return res.status(400).send({
                error: 'Email is taken'
            })
        }

        const { firstName, middleName, lastName, email, deviceToken, password} =  req.body

        let newUser = new User({firstName, middleName, lastName, email, deviceToken, password})
        newUser.save((err, success) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    error: err
                })
            }
            res.send({
                message: "registered Succesfully"
            })
        })
    })
}

exports.login = (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    User.findOne({ email })
    .exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({error: 'User with that email does not exist.'});
        }
        if (!user.authenticate(password)) {
            return res.status(400).send({
                error: 'Email and password do not match.'
            });
        }
        if (user.deviceToken === req.body.deviceToken) {
            console.log("TOKEN AVAILABLE")
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    
            res.cookie('token', token, { expiresIn: '1d' });
            const { _id, firstName, middleName, lastName, email, role } = user;
            res.send({
                token,
                user: { _id, firstName, middleName, lastName, email, role }
            });
        } else {
                User.findByIdAndUpdate(user._id, {
                    $set: {deviceToken : req.body.deviceToken}
                }, (err, success) => {
                    if (err) {
                        console.log(err)
                    } else {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                                
                        res.cookie('token', token, { expiresIn: '1d' });
                        const { _id, firstName, middleName, lastName, email, role } = user;

                        if (role === 0) {
                            Student.findOne({studentId: _id}).exec((err, student) => {
                                if (err || !student) {
                                    res.send({
                                        dataAvailable: false,
                                        token,
                                        user: { _id, firstName, middleName, lastName, email, role }
                                    });
                                } else {
                                    res.send({
                                        dataAvailable: true,
                                        token,
                                        user: { _id, firstName, middleName, lastName, email, role }
                                    });
                                }
                            })
                        } else {
                            res.send({
                                dataAvailable: true,
                                token,
                                user: { _id, firstName, middleName, lastName, email, role }
                            });
                        }
                        // res.send({
                        //     message: "Notification channel updated successfully"
                        // })
                    }
                })
            }
        
        console.log(user)
    });
};

// exports.updateToken = (req, res) => {
//     // const { deviceToken } = req.body;
//     console.log(req.body)
//     User.findByIdAndUpdate(req.body.id, {
//         $set: {deviceToken: req.body.deviceToken}
//     }, (err, success) => {
//         if(err) {
//             console.log(err)
//             res.send({
//                 message: "Something went wrong check logs"
//             })
//         } else {
//             console.log("TOKEN_UPDATED")
//             res.send({
//                 message: "token updated"
//             })
//         }
//     })
// }

// exports.listUser = (req, res) => {
//     User.find().exec((err, user) => {
//         if (err) {
//             return res.json({
//                 message: "Error"
//             })
//         }
//         console.log(user.name)
//         res.send(user)
//     })
// }

// exports.getUser = (req, res) => {
//     User.findById(req.params.id).exec((err, user) => {
//         if (err) {
//             return res.json({
//                 error: err
//             })
//         }
//         res.send(user)
//     })
// }