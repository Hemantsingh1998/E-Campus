const express = require('express')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()

const Mongoose = require('mongoose')

require('dotenv').config()

const authRouter = require('./routes/authRoutes')

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

const port = process.env.PORT || 9000;
app.listen(port,() => {
    console.log(`server is running on port ${port}`);
});