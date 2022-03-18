const User = require('../models/user')
const course = require('../models/course')

exports.addCourse = (req, res) => {
    console.log(req.body)
    course.findOne({courseName: req.body.courseName}).exec((err, c) => {
        if (c) {
            return res.send({
                message: 'Already Exist'
            })
        } else {
            const { courseName, duration } = req.body
            let newCourse = new course({courseName, duration})
            newCourse.save((err, success) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        error: err
                    })
                }
                res.send({
                    message: "Course registered SuccessFully"
                })
            })
        }
    })

}

exports.getCourses = (req, res) => {
    course.find().exec((err, success) => {
        res.send(success)
    })
}