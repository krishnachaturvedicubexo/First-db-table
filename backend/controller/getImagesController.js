const { FileModel } = require("../models/uploadImage.model")

async function getAllImages(req,res,next){
   try {
    const output=await FileModel.find()
    res.status(200).send(output)
   } catch (error) {
    res.status(400).error({error})
   }
}
module.exports={getAllImages}