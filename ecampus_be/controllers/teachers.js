const User = require('../models/user')
const teacher = require('../models/teacher')

exports.registerTeacher = (req, res) => {
    console.log(req.body)
    const {teacherId, salutation, course, section, yearClass, postedBy} = req.body
    
    if (!salutation || !section || !yearClass) {
        return res.status(400).json({
            error: "ALL FIELDS ARE REQUIRED"
        })
    }

    if (!course || course.length === 0) {
        return res.status(400).json({
            error: "ATLEAST ONE COURSE IS REQUIRED"
        })
    }

    let newTeacher = new teacher()
    newTeacher.teacherId = teacherId,
    newTeacher.salutation = salutation,
    newTeacher.section = section,
    newTeacher.yearClass = yearClass
    newTeacher.postedBy= postedBy
    
    let arrayOfCourse = course

    newTeacher.save((err, success) => {
        if (err) {
            console.log("TEACHER REGISTER ERR",err)
            return res.status(400).json({
                error: "THERE WAS A PROBLEM IN REGISTRATING THE TEACHER"
            })
        }
        teacher.findByIdAndUpdate(success._id, {$push:{course: arrayOfCourse}}, {new:true})
        .exec((err, resSucc) => {
            if (err) {
                console.log("TEACHER REGISTER ERR",err)
                return res.status(400).json({
                    error: "THERE WAS A PROBLEM IN REGISTRATING THE TEACHER"
                })
            } else {
                res.json(resSucc)
            }
        })
    })
}