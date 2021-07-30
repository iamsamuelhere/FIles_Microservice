require('dotenv').config()

const express=require("express")
const app=express()
const db=require("./config/mongooseConfig");
app.use(express.json())
app.use(express.static('public'))
app.use("/",require("./routes/index"))


app.listen(3000,(err)=>{
    if(err)
    console.log(err)
    else
    console.log("server started")
})