import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdOutlineDeleteSweep } from "react-icons/md"
interface ImagesUrlArrayType {
  _id:string,
  image_url:string,
  createdAt:Date
}

const ImageUpload = () => {
    const [selectedImages, setSelectedImages]=useState<File[]>([])
    const [allImagesUrl,setAllImagesUrl]=useState<ImagesUrlArrayType[]>([])

    const handleFileUpload=(e:React.ChangeEvent<HTMLInputElement>)=>{
    let fileListObject=e.target.files
    if(fileListObject){
      const selectedFilesArray:File[]=Array.from(fileListObject)
      console.log("selectedFiles-",selectedFilesArray)
      setSelectedImages(selectedFilesArray)
    }   
   }

  console.log("selectedImages State-",selectedImages)

   const handleImageUpload=(e:React.MouseEvent<HTMLButtonElement>)=>{
    console.log(e)
    const formData=new FormData()
    selectedImages.map((file)=>{
       formData.append("images", file)
    })
    console.log("formData-",formData)

    axios.post('http://localhost:5000/upload',formData,{
      headers: {
        "Content-Type":"multipart/form-data"
      },
    })
    .then((res)=>{
      console.log(res)
    })
    .then(()=>{
      getAllImagesUrl()
      setSelectedImages([])
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  const getAllImagesUrl=()=>{
    axios.get('http://localhost:5000/getImagesUrl')
    .then((res)=>{
      console.log("GetallImageData",res)
        setAllImagesUrl(res.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const handleDeleteImage=(id:string,filename:string)=>{
    axios.delete(`http://localhost:5000/deleteImage/:${id}/:${filename}`)
    .then((res)=>{
      console.log("after delete",res)
    })
    .then(()=>{
      getAllImagesUrl()
    })
    .catch((error)=>{
      console.log(error)
    })

  }

  useEffect(()=>{
    getAllImagesUrl()
  },[])

 console.log("allImages-",allImagesUrl)

  return (
    <>
          <div>
        <div className='relative bg-gray-500 left-2/5 top-5 text-center p-3 cursor-pointer rounded-xl w-40 h-24 transitio hover:bg-gray-700 m-auto ' >
          <label>Browse</label>
          <input  type='file' name='images' id='imageInput' multiple
          className='rounded-xl opacity-0 absolute left-0 top-0 w-full h-full  border-2 cursor-pointer bg-slate-400  mb-10 ' onChange={(e)=>{handleFileUpload(e)}}  />
          <button className='absolute left-8 z-10 bottom-0' id='uploadButton' onClick={(e)=>handleImageUpload(e)} >Upload</button>
        </div>
        <div id='dispalyImageDiv' className='flex flex-wrap m-auto p-10 border border-gray-50 justify-center' >
          {
            selectedImages?.map((file,index)=>{
              console.log("file-",URL.createObjectURL(file))
              return <img src={URL.createObjectURL(file)}
                        className='w-50 h-40 m-2'
                        key={index}
                       />
            })
          }
        </div>
        <main>
         <div className='flex flex-wrap m-auto p-10 border border-gray-50 justify-center' >
          {
            allImagesUrl?.map((ele)=>{
              return (
                <div className='flex flex-col items-center' >
                <img className='w-50 h-40 m-2' src={`http://localhost:5000/static/${ele.image_url}`} alt={`image-${ele._id}`}/>
                 <div className='flex w-full justify-between p-2' >
                   <a target='_blank' href={`http://localhost:5000/static/${ele.image_url}`} >Visit</a>
                   <div className='cursor-pointer' onClick={()=>handleDeleteImage(ele._id,ele.image_url)} ><MdOutlineDeleteSweep size={20} /></div>
                 </div>   
                </div>
              ) 
            })
          }
          </div>
        </main>
      </div>

    </>
  )
}

export default ImageUpload