const express = require('express')
const router = express.Router()

const { addEvent, getEvents } = require('../controllers/events')

router.post('/add-event', addEvent)
router.get('/get-events', getEvents)

module.exports = router