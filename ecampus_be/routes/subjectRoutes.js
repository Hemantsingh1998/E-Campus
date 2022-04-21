const express = require('express')
const router = express.Router()

const { AddSubject, getSubject } = require('../controllers/subject')

router.post('/add-course', AddSubject)
router.get('/get-course', getSubject)

module.exports = router