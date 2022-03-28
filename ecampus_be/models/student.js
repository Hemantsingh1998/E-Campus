const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const studentSchema = new mongoose.Schema({
    studentId: {
        type: ObjectId,
        ref:'User',
        required: true
    },
    dateofbirth: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    admissionNumber: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    }
}, {
    timestamp: true
})

module.exports = mongoose.model('Student', studentSchema)