const User = require('../models/user')
const event = require('../models/events')

exports.addEvent = (req, res) => {
    console.log(req.body)

    const { title, description, postedBy } = req.body
    let newEevnt = new event({title, description, postedBy})
    newEevnt.save((err, success) => {
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

exports.getEvents = (req, res) => {
    event.find({}).exec((err, events) => {
        if (err || !events) {
            console.log(err)
            return res.status(400).json({
                error: err
            })
        } else{
            res.send(events)
        }
    })
}