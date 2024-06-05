 const UserModel=require('../model/usermodel')
const path=require('path')
const fs=require('fs')

class WebController{

    home=async(req,res)=>{
        try{
            const alluser=await UserModel.find()
            if(alluser){
                res.render('home',{
                    title:"home page",
                    alldata:alluser
                })
            }
        }catch(error){
            console.log(`all data not found`);
        }
       
    }
    AddUser=(req,res)=>{
        res.render('adduser',{
            title:"add user page"
        })
    }
    // ------------------------PostUser-----------------//
    PostUser=async(req,res)=>{
        try{
            
            const{name,location,images}=req.body
           const img=req.files.map(file=>file.path)
        const adduser=new UserModel({
            name,
            location,
            images:img
        })
        const saveuser=await adduser.save()
        if(saveuser){
            res.redirect('/')
        }else{
            res.redirect('/adduser')
        }
        }catch(error){
            console.log(error);
        }
    }
    // ---------------EditUser------------//
    EditUser=async(req,res)=>{
        try{
            const id=req.params.id
            const edituser=await UserModel.findById(id)
            if(edituser){
                res.render('edituser',{
                    title:"edit user page",
                    edit:edituser
                })
            }
        }catch(error){
            console.log(error);
        }
    }
    // ------------------------UpdateUser---------------//
    UpdateUser=async(req,res)=>{
        try{
            const id=req.params.id
            const{name,location}=req.body
            const fisher=await UserModel.findById(id)
            const files=req.files.map(file=>file.path)

            // for(let img of fisher.images){ ////for of loop is also work
            //     fs.unlinkSync(img)
            //     }
            fisher.images.forEach((img)=>{
                fs.unlinkSync(img)
            })
            const updatedata=await UserModel.findByIdAndUpdate(id,{
                name,location,images:files
            },{new:true})
            if(updatedata){
                console.log(`data has been updated`);
                res.redirect('/')
            }
        }catch(error){
            console.log(error);
        }
    }
    // --------------------DeleteUser------------------//
    DeleteUser=async(req,res)=>{
        try{
            const id=req.params.id
            const imgdelete=await UserModel.findById(id)
            const deleteuser=await UserModel.findByIdAndDelete(id) 
            if(deleteuser){
                console.log(`data is deleted`,deleteuser);
                // for(let img of imgdelete.images){ //for of loop is also work
                //     fs.unlinkSync(img)
                // }
                imgdelete.images.forEach((img)=>{
                    fs.unlinkSync(img)
                })
                res.redirect('/')
            }
        }catch(error){
            console.log(error);
        }
    }
}

module.exports=new WebController()

