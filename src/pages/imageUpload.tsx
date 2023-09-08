import React, { useState } from 'react'

const imageUpload = () => {
    const [selectedImages, setSelectedImages]=useState<File[]>([])
  
    const handleFileUpload=(e:React.ChangeEvent<HTMLInputElement>)=>{
    let fileListObject=e.target.files
    if(fileListObject){
      const selectedFilesArray:File[]=Array.from(fileListObject)
      console.log("selectedFiles-",selectedFilesArray)
      setSelectedImages(selectedFilesArray)
    }
  
  
    }
   const handleImageUpload=(e:React.MouseEvent<HTMLButtonElement>)=>{
    console.log(e)
    const formData=new FormData
    selectedImages.map((file,index)=>{
       formData.append(`image-${index+1}`, file )
    })
    console.log(formData)
  }
  
  return (
    <>
          <div>
        <div className='relative bg-gray-500 left-2/5 top-5 text-center p-3 cursor-pointer rounded-xl w-40 h-24 transitio hover:bg-gray-700 m-auto ' >
          <label>Browse</label>
          <input  type='file' id='imageInput' multiple
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
      </div>

    </>
  )
}

export default imageUpload