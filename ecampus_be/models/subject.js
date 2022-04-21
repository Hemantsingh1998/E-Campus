const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
    },
    belongsTo: {
        type: ObjectId,
        ref:'Stream',
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Subject', subjectSchema)