const mongoose=require("mongoose")

const uploadSchema=mongoose.Schema({
   text:String,
   imgId:String,
   urlofimg:String,

})

const Uploadmodel=mongoose.model("upload",uploadSchema)

module.exports=Uploadmodel;