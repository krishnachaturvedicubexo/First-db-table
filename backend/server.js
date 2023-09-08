const express=require('express')
const imageUploadRoute = require('./routes/imageUploadRoute') 
const app=express()

app.use(express.json())
app.use('/upload',imageUploadRoute)

app.listen(5000,()=>{
  console.log(`Server is listening to http://localhost:5000`)
})