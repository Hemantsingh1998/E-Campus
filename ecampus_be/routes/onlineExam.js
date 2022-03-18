const express = require('express')
const router = express.Router()

const { addOnlineExam } = require('../controllers/onlineExam')

router.post('/add-onlineexam', addOnlineExam)

module.exports = router