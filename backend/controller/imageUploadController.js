const { FileModel } = require("../models/uploadImage.model")

const uploadAllImages=async(req, res, next)=>{
  console.log("Inside controller")
  try {
    const createDbPromise=req.files.map(async(file)=>{
      return await FileModel.create({image_url:file.filename})
    })
    await Promise.all(createDbPromise)
    res.status(200).send("Images uploded to db")
  } catch (error) {
    res.status(400).send("Error in file stored in db")
  }
}
module.exports={uploadAllImages}