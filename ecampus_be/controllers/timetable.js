const User = require('../models/user')
const timeTable = require('../models/timetable')

exports.addTimetable = (req, res) => {
    console.log(req.body)

    const { section, image, postedBy } = req.body
    let newTimeTable = new timeTable({section, image, postedBy})
    newTimeTable.save((err, success) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: err
            })
        }
        res.send({
            message: "Time Table registered SuccessFully",
            success
        })
    })
}