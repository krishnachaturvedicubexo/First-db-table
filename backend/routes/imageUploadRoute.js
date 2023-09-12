const express=require('express')
const {uploadAllImages}=require ("../controller/imageUploadController")
const imageUploadRoute=express.Router()

imageUploadRoute.post('/', uploadAllImages)

module.exports= imageUploadRoute