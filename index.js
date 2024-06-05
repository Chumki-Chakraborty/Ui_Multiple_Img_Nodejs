const express=require('express')
const ejs=require('ejs')
const app=express()
const path=require('path')
const fs=require('fs')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const dotenv=require('dotenv')
dotenv.config()
const mongodb_Connection=require('./app/Config/Database')
mongodb_Connection()

app.set('view engine','ejs')
app.set('views',"views")
// for image
app.use('/uploads',express.static('uploads'))

// webRoute
const webRoute=require('./app/Route/WebRoute')
app.use(webRoute)

const port=1999
app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}`);
})
