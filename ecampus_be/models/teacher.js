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
    subjects: [{
        type: ObjectId,
        ref:'Subject',
        required: true
    }],
    stream: {
        type: ObjectId,
        ref:'Stream',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('teacher', teacherSchema)