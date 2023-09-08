const express=require('express')
import uploadAllImages from "../controller/imageUploadController"
const imageUploadRoute=express.Router()

imageUploadRoute.post('/', uploadAllImages)

module.exports= imageUploadRoute