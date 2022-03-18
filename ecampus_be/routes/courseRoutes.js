const express = require('express')
const router = express.Router()

const { addCourse, getCourses } = require('../controllers/course')

router.post('/add-course', addCourse)
router.get('/get-course', getCourses)

module.exports = router