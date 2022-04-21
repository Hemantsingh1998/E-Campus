const User = require('../models/user')
const onlineExam = require('../models/onlineExam')

exports.addOnlineExam = (req, res) => {
    console.log(req.body)

    const { subject, link, postedBy } = req.body
    let newExam = new onlineExam({subject, link, postedBy})
    newExam.save((err, success) => {
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

exports.getExamsByTeacher = (req, res) => {
    console.log(req.params)

    onlineExam.find({postedBy: req.params.id})
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