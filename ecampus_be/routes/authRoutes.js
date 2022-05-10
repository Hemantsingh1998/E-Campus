const express = require('express')
const router = express.Router()

const { register, login, getRegisterStatus } = require('../controllers/auth')

router.post('/register', register)
router.get('/get-register-status', getRegisterStatus)
router.post('/login', login)

module.exports = router