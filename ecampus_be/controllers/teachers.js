const User = require('../models/user')
const Teacher = require('../models/teacher')

exports.registerTeacher = (req, res) => {
    console.log(req.body)
    const {teacherId, salutation, subjects, stream} = req.body
    
    if (!salutation || !stream) {
        return res.status(400).json({
            error: "ALL FIELDS ARE REQUIRED"
        })
    }

    if (!subjects || subjects.length === 0) {
        return res.status(400).json({
            error: "ATLEAST ONE subjects IS REQUIRED"
        })
    }

    let newTeacher = new Teacher()
    newTeacher.teacherId = teacherId,
    newTeacher.salutation = salutation,
    newTeacher.stream = stream
    
    let arrayOfsubjects = subjects

    newTeacher.save((err, success) => {
        if (err) {
            console.log("TEACHER REGISTER ERR",err)
            return res.status(400).json({
                error: "THERE WAS A PROBLEM IN REGISTRATING THE TEACHER"
            })
        }
        Teacher.findByIdAndUpdate(success._id, {$push:{subjects: arrayOfsubjects}}, {new:true})
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

exports.getTeacher = (req, res) => {
    User.find({role: 1}).exec((err, teacher) => {
        if (err) {
            console.log("cannot get teachers",err)
            return res.status(400).json({
                error: err
            })
        } else {
            console.log(teacher)
            res.json(teacher)
        }
    })
}

exports.getSingleTeacher = (req, res) => {
    console.log(req.query)
    Teacher.findOne({teacherId: req.query.id})
    .populate('teacherId', '_id, firstName lastName')
    .populate('subjects', '_id, subjectName')
    .exec((err, teacher) => {
        if (err) {
            res.status(400).json({
                error: "Teacher not found"
            })
        } else {
            res.json(teacher)
        }
    })
}

exports.getAddedTeacher = (req, res) => {
    Teacher.find({})
    .populate('teacherId', '_id, firstName lastName')
    .populate('subjects', '_id, subjectName')
    .exec((err, teachers) => {
        if (err || !teachers) {
            console.log("Cannot get Teacher",err)
            return res.status(400).json({
                error: err
            })
        } else {
            console.log(teachers)
            res.json(teachers)
        }
    })
}