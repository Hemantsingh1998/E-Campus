const express = require('express')
const router = express.Router()

const { addAnnounce, getAnnounce } = require('../controllers/announcement')

router.post('/add-announce', addAnnounce)
router.get('/get-announce', getAnnounce)

module.exports = router