const { FileModel } = require("../models/uploadImage.model")
const {ObjectId} =require('mongodb')
const fs=require('fs')
const path = require('path');

async function deleteImage(req,res,next){
    try {
        let {id,filename}= req.params
        console.log("id before",id)
        id= new ObjectId(id?.slice(1))
        filename=filename.slice(1)
        const uploadFolderFilePath=path.join(__dirname,'..','/uploads',filename)
        console.log("In delete controller-",id,uploadFolderFilePath)
        fs.unlink(uploadFolderFilePath,(error)=>{
            if(error){
                return res.status(400).send('Error in deleting from server')
            }
        })
        const deleteOutput=await FileModel.deleteOne({image_url:filename})
        return res.status(200).send("File deleted from server and database")
    } catch (error) {
        return res.status(400).send({error,message:'Unable to delete either from server or db'})
    }
}
module.exports={deleteImage}