const express = require('express')
const router = express.Router()

const { addAnnounce } = require('../controllers/announcement')

router.post('/add-announce', addAnnounce)

module.exports = router