import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import React from 'react'

interface ToggleProjectContextType {
    toggle:boolean,
    setToggle:Dispatch<SetStateAction<boolean>>;
}
export const ToggleProjectContext=createContext<ToggleProjectContextType|undefined>(undefined)

interface ToggleProjectContextProviderPropsType {
    children: ReactNode;
}
  
const ToggleProjectContextProvider:React.FC<ToggleProjectContextProviderPropsType> = ({children}) => {
    const [toggle,setToggle]=useState<boolean>(false)
  return (
    <ToggleProjectContext.Provider value={{toggle,setToggle}} >
        {children}
    </ToggleProjectContext.Provider>
  )
}

export default ToggleProjectContextProvider