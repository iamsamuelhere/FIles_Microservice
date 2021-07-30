const { model } = require("mongoose");
const Uploadmodel =require("../model/uploadModel");
const cloudinary=require("../config/cloudinary")

module.exports.fetchResults=async(req,res)=>{
   

    try{
      await  Uploadmodel.find({},(err,results)=>{
            if(err)
            {
                res.status(401).json({
                    "error":true
                })
            }
            else{
                res.status(201).json({
                    result:results
                })
            }
         })
    }
    catch(e){
        res.json({
            error:true,
            msg:e
        })
    }

}


module.exports.postData=async(req,res)=>{
    const data=req.body
    try{
        const result = await cloudinary.uploader.upload(req.file.path,{folder:"sam"});
        console.log(result)
        const url=result.url;
        const fileid=result.public_id;
        const text=req.body.text;
        
           await Uploadmodel.create({text:text,imgId:fileid,urlofimg:url},(err,result)=>{
            if(err){
                res.json({
                    "uploaded":false,
                    "result":err
                })
      
            }
            else{
                res.json({
                    "uploaded":true,
                    "results":result
                })
            }
          })   
    }
    catch(e){
        console.log(e);
        res.json({"error":e})
    }
}


module.exports.deletePost=async(req,res)=>{
    const id="sam/"+req.params.id;
    //finding doc
    console.log(id)
    try{
        await Uploadmodel.find({imgId:id},async(err,results)=>{
            
            console.log(results)
            if(err){
                res.status(401).json({
                    error:err
                })
            }
            else{
                await cloudinary.uploader.destroy(results[0].imgId,{folder:"sam"});
                console.log("Deleted on cloudinary")
                await Uploadmodel.findOneAndDelete({imgId:id},(err,results)=>{
                    if(err)res.status(401).json({error:err})
                    else 
                    res.status(201).json({"removed":true})
                
                })
                console.log("Deleted from mongodb")
             
            }
             
            })

            
    
    }
    catch(e){
        res.json({
            error:e
        })
    }
}