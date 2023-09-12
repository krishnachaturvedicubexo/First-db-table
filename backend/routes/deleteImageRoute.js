const express=require('express')
const { deleteImage } = require('../controller/deleteImageController')
const deleteImageRoute=express.Router()

deleteImageRoute.delete('/:id/:filename',deleteImage)

module.exports={deleteImageRoute}