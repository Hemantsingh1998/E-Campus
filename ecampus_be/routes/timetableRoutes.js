const express = require('express')
const router = express.Router()

const { addTimetable } = require('../controllers/timetable')

router.post('/add-timetable', addTimetable)

module.exports = router