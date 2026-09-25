const mongoose=require("mongoose")

const tokenBlacklistSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true
    }
},
{
    timestamps: true
})

const tokenBlacklistModel=mongoose.model("blacklist",tokenBlacklistSchema)

module.exports=tokenBlacklistModel