const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const onlineExams = new mongoose.Schema({
    subject: {
        type: ObjectId,
        ref:'Subject',
        required: true
    }, 
    link: {
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

module.exports = mongoose.model('onlineExam', onlineExams)