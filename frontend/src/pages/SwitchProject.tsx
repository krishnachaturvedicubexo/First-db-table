import React, { useContext } from 'react'
import ImageUpload from './ImageUpload'
import App from '../App'
import { ToggleProjectContext } from '../context/ToggleProjectContext'

const SwitchProject = () => {
   const {toggle,setToggle}=useContext(ToggleProjectContext)!
  return (
    <div>   
         <button onClick={()=>setToggle(!toggle)} >Swich Project</button>
         {toggle?<ImageUpload/>:<App/>}
    </div>
  )
}

export default SwitchProject