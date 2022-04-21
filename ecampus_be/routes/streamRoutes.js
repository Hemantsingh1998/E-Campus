const express = require('express')
const router = express.Router()

const { addStream, getStream } = require('../controllers/stream')

router.post('/add-stream', addStream)
router.get('/get-streams', getStream)

module.exports = router