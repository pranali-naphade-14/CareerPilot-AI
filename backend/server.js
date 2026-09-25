
require('dotenv').config()



const app=require("./app")
const connectDB = require("./db")


connectDB()

app.get("/",(req,res)=>{
    console.log("Hello")
    res.send("Hey server is running")
})

app.listen(3000,()=>{
    console.log("listening on port no. 3000")
})