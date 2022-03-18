const express = require("express")
const router = express.Router()
const { registerTeacher } = require("../controllers/teachers")

router.post('/add-teacher', registerTeacher)

module.exports = router