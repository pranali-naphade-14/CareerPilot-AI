const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true, "username already taken"]
    },
    email:{
        type:String,
        required:true, 
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const User=mongoose.model("Users",userSchema)

module.exports=User