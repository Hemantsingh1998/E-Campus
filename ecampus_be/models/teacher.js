const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const teacherSchema = new mongoose.Schema({
    teacherId: {
        type: ObjectId,
        ref:'user',
        required: true
    },
    salutation: {
        type: String,
        required: true
    }, 
    course: [{
        type: ObjectId,
        ref:'course',
        required: true
    }],
    section: {
        type: String,
        required: true
    },
    yearClass: {
        type: Number,
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

module.exports = mongoose.model('teacher', teacherSchema)