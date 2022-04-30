const express = require('express')
const router = express.Router()

const { addStudent, listStudentsForAttendance } = require('../controllers/student')

router.post('/add-student', addStudent)
router.get('/getstudentforattendance', listStudentsForAttendance)
// router.get('/get-events', getEvents)

module.exports = router