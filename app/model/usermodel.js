const mongoose=require('mongoose')
const { array } = require('../utilits/imgupload')

const schema=mongoose.Schema

const UserSchema=new schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true,
        validate : [arrLimit, 'You can upload only 5 images....']
    },
    status:{
        type:String,
        default:1
    }
})
function arrLimit(val){
  
    return val.length <= 5
  
  }
const UserModel=mongoose.model('user',UserSchema)

module.exports=UserModel