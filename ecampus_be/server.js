const express = require('express')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()

const Mongoose = require('mongoose')

require('dotenv').config()

const authRouter = require('./routes/authRoutes')
const courseRouter = require('./routes/courseRoutes')
const onlineLectureRoutes = require('./routes/onlineLectureRoutes')
const onlineExamsRoutes = require('./routes/onlineExam')
const announRoutes = require('./routes/announRoutes')
const eventRoutes = require('./routes/eventsRoutes')
const timeTableRoutes = require('./routes/timetableRoutes')
const teacherRoutes = require('./routes/teacherRoutes')
const studentRoutes = require('./routes/studentRoutes')

app.use(bodyparser.json());

Mongoose
.connect(process.env.DATABASE_LOCAL, {useNewUrlParser:true, useUnifiedTopology: true})
.then(() => console.log('dbConnected'))
.catch(err => {
    console.log(err)
})
app.use(morgan('dev'));
if(process.env.NODE_ENV==='developement'){
    app.use(cors({origin: `${process.env.CLIENT_URL}`}));
}

app.use('/api', authRouter)
app.use('/api', courseRouter)
app.use('/api', onlineLectureRoutes)
app.use('/api', onlineExamsRoutes)
app.use('/api', announRoutes)
app.use('/api', eventRoutes)
app.use('/api', timeTableRoutes)
app.use('/api', teacherRoutes)
app.use('/api', studentRoutes)

const port = process.env.PORT || 9000;
app.listen(port,() => {
    console.log(`server is running on port ${port}`);
});