const express=require('express')
const ejs=require('ejs')
const webController = require('../Controller/webController')

const imgupload=require('../utilits/imgupload')

const webRoute=express.Router()

webRoute.get('/',webController.home)
 webRoute.get('/adduser',webController.AddUser)
 webRoute.post('/postuser',imgupload.array('images',3),webController.PostUser)
// webRoute.post('/postuser',webController.PostUser)
webRoute.get('/edit/page/:id',webController.EditUser)
// webRoute.post('/update/user/:id',webController.UpdateUser)
webRoute.post('/update/user/:id',imgupload.array('images',3),webController.UpdateUser)
webRoute.get('/delete/user/:id',webController.DeleteUser)

module.exports=webRoute