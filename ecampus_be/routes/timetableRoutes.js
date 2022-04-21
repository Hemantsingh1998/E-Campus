const express = require('express')
const router = express.Router()

const { addTimetable, uploadTimeTableImage, getTimeTableByClassTeacher } = require('../controllers/timetable')

router.post('/add-timetable', addTimetable)
router.post('/upload-timetable-image', uploadTimeTableImage)
router.get('/get-timetable/:id', getTimeTableByClassTeacher)

module.exports = router