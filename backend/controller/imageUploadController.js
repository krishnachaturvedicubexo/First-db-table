const uploadAllImages=(req, res, next)=>{
  console.log("Inside controler")
  res.send('Getting request to controller')
  next()
}
module.exports=uploadAllImages