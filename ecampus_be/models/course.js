const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('course', courseSchema)