const express = require('express')
const router = express.Router()

const { addTimetable, uploadTimeTableImage } = require('../controllers/timetable')

router.post('/add-timetable', addTimetable)
router.post('/upload-timetable-image', uploadTimeTableImage)

module.exports = router