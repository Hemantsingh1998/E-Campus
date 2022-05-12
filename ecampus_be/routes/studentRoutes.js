const express = require('express')
const router = express.Router()

const { addStudent, listStudentsForAttendance, getSingleStudent } = require('../controllers/student')
const { registerAttendance, getAttendanceByTeacher } = require('../controllers/attendance')

router.post('/add-student', addStudent)
router.get('/getstudentforattendance', listStudentsForAttendance)
router.post('/postattendance', registerAttendance)
router.get('/getattendbyteacher', getAttendanceByTeacher)
router.get('/getsinglestudent', getSingleStudent)
// router.get('/get-events', getEvents)

module.exports = router