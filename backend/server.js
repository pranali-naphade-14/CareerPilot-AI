
require('dotenv').config()



const app=require("./app")
const connectDB = require("./db")


connectDB()

app.get("/",(req,res)=>{
    console.log("Hello")
    res.send("Hey server is running")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Listening on port no. ${PORT}`);
});
