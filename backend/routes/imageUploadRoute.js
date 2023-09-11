const express=require('express')
const uploadAllImages=require ("../controller/imageUploadController")
const imageUploadRoute=express.Router()

imageUploadRoute.get('/', uploadAllImages)

module.exports= imageUploadRoute