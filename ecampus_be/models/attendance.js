const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const attendanceSchema = new mongoose.Schema({
    stream: {
        type: ObjectId,
        ref:'Stream',
        required: true
    },
    studentPresent: [
        {type: ObjectId, ref: 'User'}
    ],
    studentAbsent: [
        {type: ObjectId, ref: 'User'}
    ],
    subject: {
        type: ObjectId,
        ref:'Subject',
        required: true
    },
    year: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    postedtDate : { type : Date, default: Date.now }
}, {
    timestamp: true
})

module.exports = mongoose.model('Attendance', attendanceSchema)