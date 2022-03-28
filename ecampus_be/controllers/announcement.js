const User = require('../models/user')
const announcement = require('../models/announcement')

exports.addAnnounce = (req, res) => {
    console.log(req.body)

    const { title, description, postedBy } = req.body
    let newAnnou = new announcement({title, description, postedBy})
    newAnnou.save((err, success) => {
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

exports.getAnnounce = (req, res) => {
    announcement.find({}).exec((err, announces) => {
        if (err || !announces) {
            console.log(err)
            return res.status(400).json({
                error: err
            })
        } else{
            res.send(announces)
        }
    })
}