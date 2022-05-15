const attendance = require('../models/attendance')

exports.registerAttendance = (req, res) => {
    const { year, studentPresent, subject, studentAbsent, stream, postedBy } = req.body
    // console.log(req.body)
    let newAttendance = new attendance()
    newAttendance.year = year
    newAttendance.stream = stream
    newAttendance.subject = subject
    newAttendance.postedBy = postedBy
    // newTeam.coLeader = coLeader
    let arrayOfPresent = studentPresent
    let arrayOfAbsent = studentAbsent

    newAttendance.save((err, attend) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        attendance.findByIdAndUpdate(attend._id, {$push:{studentPresent: arrayOfPresent, 
            studentAbsent: arrayOfAbsent}, 
            }, {new: true}).exec(
            (err, attend) => {
                if(err) {
                    return res.status(400).json({
                        error: err
                    })
                } else {
                    res.json(attend)
                }
            }    
        )
    })
}

exports.getAttendanceByTeacher = (req, res) => {
    console.log("QUERY ", req.query)
    attendance.find({postedBy: req.query.id})
    .populate('studentPresent', '_id, firstName lastName')
    .populate('studentAbsent', '_id, firstName lastName')
    .populate('stream', '_id, streamName')
    .populate('subject', '_id, subjectName')
    .exec((err, attend) => {
        if (err){
            res.json(err)
        }
        console.log(attend)
        res.json(attend)
    })
}

exports.getAttendForStudent = (req, res) => {
    console.log("QUERY", req.query);
    // const { stream } = req.query;
    if (req.query.id) {
        attendance.find(
            {
                $or: [{ studentPresent :req.query.id },{ studentAbsent :req.query.id }]
            }
        ).populate('studentPresent', '_id, firstName lastName')
        .populate('studentAbsent', '_id, firstName, lastName')
        .populate('stream', '_id, streamName')
        .populate('subject', '_id, subjectName')
        .exec((err, students) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        error: err
                    });
                }
                console.log("STUDENTS", students)
                res.json(students);
        })
    }
};