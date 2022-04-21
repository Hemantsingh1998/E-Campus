const User = require('../models/user')
const timeTable = require('../models/timetable')
const cloudinary = require('cloudinary')
exports.addTimetable = (req, res) => {
    console.log(req.body)

    const { stream, image, postedBy } = req.body
    let newTimeTable = new timeTable({stream, image, postedBy})
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

cloudinary.config({
    cloud_name: 'drklghmwt',
    api_key: 488144446814142,
    api_secret: `qonad-9lEE_raPAhxhc71jl3FbY`
})

exports.uploadTimeTableImage =  async (req, res) => {
    // console.log("RESPONSE", req.body.image)
    try{
        let results = await cloudinary.uploader.upload(req.body.image, {
            public_id: `${Date.now()}`,
            resource_type: 'auto'
        })
        // console.log("CLOUDINARY", results)
        res.json({
            public_id: results.public_id,
            url: results.secure_url
        })
    } catch (err){
        // console.log("CLOUDINARY_SERVER_SIDE", err)
    }
}

exports.getTimeTableByClassTeacher = (req, res) => {
    console.log(req.params)

    timeTable.find({postedBy: req.params.id})
    .populate('stream', '_id, streamName')
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