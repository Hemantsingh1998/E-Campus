const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const timeTableSchema = new mongoose.Schema({
    section: {
        type: String,
        required: true
    }, 
    image: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('timetable', timeTableSchema)