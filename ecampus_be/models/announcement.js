const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const annouSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
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

module.exports = mongoose.model('announcement', annouSchema)