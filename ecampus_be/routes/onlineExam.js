const express = require('express')
const router = express.Router()

const { addOnlineExam, getExamsByTeacher } = require('../controllers/onlineExam')

router.post('/add-onlineexam', addOnlineExam)
router.get('/get-exams/:id', getExamsByTeacher)

module.exports = router