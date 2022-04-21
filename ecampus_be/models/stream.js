const mongoose = require('mongoose')

const streamSchema = new mongoose.Schema({
    streamName: {
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

module.exports = mongoose.model('Stream', streamSchema)