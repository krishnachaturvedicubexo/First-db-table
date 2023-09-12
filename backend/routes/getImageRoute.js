const express=require('express')
const { getAllImages } = require('../controller/getImagesController')
const getImageRoute=express.Router()

getImageRoute.get('/',getAllImages)

module.exports=getImageRoute