const User = require('../models/user')
const Student = require('../models/student')

exports.addStudent = (req, res) => {
    console.log(req.body)

    Student.findOne({studentId: req.body.studentId}).exec((err, student) => {
        if (student) {
            // console.log("STUDENT ALREADY EXIST")
            return res.status(400).send({
                error: 'Data already available'
            })
        }
        const { 
            dateofbirth,
            year,
            stream,
            admissionNumber,
            fatherName,
            motherName,
            studentId } = req.body
        let newStudent = new Student({
            dateofbirth,
            year,
            stream,
            admissionNumber,
            fatherName,
            motherName,
            studentId})
        newStudent.save((err, success) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    error: err
                })
            }
            res.send({
                message: "Student registered SuccessFully",
                success
            })
        })
    })
}

