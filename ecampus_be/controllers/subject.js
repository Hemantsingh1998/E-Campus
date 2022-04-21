const User = require('../models/user')
const subject = require('../models/subject')

exports.AddSubject = (req, res) => {
    console.log(req.body)
    subject.findOne({subjectName: req.body.subjectName}).exec((err, c) => {
        if (c) {
            return res.send({
                message: 'Already Exist'
            })
        } else {
            const { subjectName, belongsTo, duration } = req.body
            let newCourse = new subject({subjectName, belongsTo, duration})
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

exports.getSubject = (req, res) => {
    subject.find()
    .populate('belongsTo', 'streamName')
    // .select('belongsTo, subjectName, duration')
    .exec((err, success) => {
        res.send(success)
        console.log(success)
    })
}