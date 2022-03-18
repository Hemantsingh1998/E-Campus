const express = require('express')
const router = express.Router()

const { addOnlineLecture } = require('../controllers/onlineLecture')

router.post('/add-onlinelecture', addOnlineLecture)

module.exports = router