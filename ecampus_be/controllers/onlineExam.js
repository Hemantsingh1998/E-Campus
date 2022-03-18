const User = require('../models/user')
const onlineExam = require('../models/onlineExam')

exports.addOnlineExam = (req, res) => {
    console.log(req.body)

    const { course, link, postedBy } = req.body
    let newExam = new onlineExam({course, link, postedBy})
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