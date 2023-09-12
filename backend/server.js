const express=require('express')
const imageUploadRoute = require('./routes/imageUploadRoute') 
const connect= require('./connect/connect')
const app=express()
const multer=require('multer')
const cors=require('cors')
const {uploadAllImages} = require('./controller/imageUploadController')
const getImageRoute = require('./routes/getImageRoute')
const { deleteImageRoute } = require('./routes/deleteImageRoute')
app.use(cors())
app.use(express.json())

app.use('/static', express.static('uploads'))

// const upload = multer({ dest: 'uploads/' })

//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
// Multer Filter
const multerFilter = (req, file, cb) => {
  if (["png", "jpeg", "jpg"].includes(file.mimetype.split("/")[1])) {
    cb(null, true);
  } else {
    cb(new Error("Not a Image File!!"), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

app.use('/upload',upload.array('images'),imageUploadRoute)
app.use('/getImagesUrl',getImageRoute)
app.use('/deleteImage',deleteImageRoute)
app.use('/',(req,res)=>{res.send("hello")})

connect().then(()=>{
  app.listen(5000,()=>{
    console.log(`Server is listening to http://localhost:5000`)
  })
})
.catch(()=>{
  console.log("Error in connecting to mongodb")
})