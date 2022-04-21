const User = require('../models/user')
const stream = require('../models/stream')

exports.addStream = (req, res) => {
    console.log(req.body)
    stream.findOne({streamName: req.body.streamName}).exec((err, c) => {
        if (c) {
            return res.send({
                message: 'Already Exist'
            })
        } else {
            const { streamName, duration } = req.body
            let newStream = new stream({streamName, duration})
            newStream.save((err, success) => {
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

exports.getStream = (req, res) => {
    stream.find().exec((err, success) => {
        res.send(success)
    })
}