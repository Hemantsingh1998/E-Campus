const express = require('express')
const router = express.Router()

const { addStudent } = require('../controllers/student')

router.post('/add-student', addStudent)
// router.get('/get-events', getEvents)

module.exports = router