const mongoose = require('mongoose')
const crypto = require('crypto')

const studentSchema = new mongoose.Schema({
    dateofbirth: {
        type: String,
        required: true,
    },
    year: {
        type: String,
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