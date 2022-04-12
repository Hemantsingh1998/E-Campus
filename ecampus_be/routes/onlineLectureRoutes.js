const express = require('express')
const router = express.Router()

const { addOnlineLecture, getClassByTeacher } = require('../controllers/onlineLecture')

router.post('/add-onlinelecture', addOnlineLecture)
router.get('/get-class/:id', getClassByTeacher)

module.exports = router