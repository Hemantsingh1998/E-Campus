const User = require('../models/user')
const onlineLecture = require('../models/onlineLecture')

exports.addOnlineLecture = (req, res) => {
    console.log(req.body)

    const { subject, link, postedBy } = req.body
    let newClass = new onlineLecture({subject, link, postedBy})
    newClass.save((err, success) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: err
            })
        }
        res.send({
            message: "Course registered SuccessFully",
            success
        })
    })
}

exports.getClassByTeacher = (req, res) => {
    console.log(req.params)

    onlineLecture.find({postedBy: req.params.id})
    .populate('subject', '_id, subjectName')
    .exec((err, classes) => {
        if (err) {
            console.log(err)
        } else {
            console.log(classes)
            return res.send({
                classes
            })
        }
    })
}