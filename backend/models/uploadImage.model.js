const { Timestamp } = require('mongodb')
const mongoose=require('mongoose')

const FileSchema= new mongoose.Schema({
    image_url:{
       type: String,
       require:true
    }
},{
    timestamps:{
        createdAt:true,
        updatedAt:false
    },
    versionKey:false
})

const FileModel=mongoose.model('files',FileSchema)

module.exports={FileModel}