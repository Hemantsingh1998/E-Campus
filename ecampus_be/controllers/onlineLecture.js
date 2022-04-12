const User = require('../models/user')
const onlineLecture = require('../models/onlineLecture')

exports.addOnlineLecture = (req, res) => {
    console.log(req.body)

    const { course, link, postedBy } = req.body
    let newCourse = new onlineLecture({course, link, postedBy})
    newCourse.save((err, success) => {
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

    onlineLecture.find({postedBy: req.params.id}).exec((err, classes) => {
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