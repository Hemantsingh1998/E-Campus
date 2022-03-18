const express = require('express')
const router = express.Router()

const { addEvent } = require('../controllers/events')

router.post('/add-event', addEvent)

module.exports = router