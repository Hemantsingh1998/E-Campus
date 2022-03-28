const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const teacherSchema = new mongoose.Schema({
    teacherId: {
        type: ObjectId,
        ref:'User',
        required: true
    },
    salutation: {
        type: String,
        required: true
    }, 
    course: [{
        type: ObjectId,
        ref:'Course',
        required: true
    }],
    stream: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('teacher', teacherSchema)