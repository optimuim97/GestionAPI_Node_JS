const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const EmployeeRoute = require('./routes/employee')
const AuthRoute = require('./routes/auth')
const MovieRoute = require('./routes/movie')

mongoose.connect('mongodb://localhost:27017/test', 
    {useNewUrlParser:true, useUnifiedTopology: true}
)

const db = mongoose.connection

db.on('error', (error)=>{
    console.log('error')
});

db.once('open', ()=> {
    console.log('Databse connection Established')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{ 
    console.log(`server is runing on port ${PORT}`)
})  

app.use('/api/employee', EmployeeRoute)
app.use('/api', AuthRoute)
// app.use('/api/movie', MovieRoute)