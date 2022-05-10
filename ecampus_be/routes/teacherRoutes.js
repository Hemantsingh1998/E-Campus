const express = require("express")
const router = express.Router()
const { registerTeacher, getTeacher, getAddedTeacher, getSingleTeacher } = require("../controllers/teachers")

router.post('/add-teacher', registerTeacher)
router.get('/get-teacher', getTeacher)
router.get('/added-teacher', getAddedTeacher)
router.get('/getsingleteacher', getSingleTeacher)

module.exports = router