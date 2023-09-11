import './App.css'
import {database} from './db.tsx'
import './App.css'
import { DatabaseType } from './db.tsx'
import { useEffect, useRef, useState } from 'react'

function App() {
  const [testDbSort,setTestDbSort]=useState<DatabaseType[]>([])
  const [db, setDb]=useState<DatabaseType[]>(database)
  const [dbAfterDelete,setDbAfterDelete]=useState<DatabaseType[]>([])
  const [carbSortType,setCarbSortType]=useState<string>('asc')
  const [page,setPage]=useState<number>(1)
  const [perPageLimit,setPerPageLimit]=useState<number>(5)
  const [startIndex,setStartIndex]=useState<number>(0)
  const [lastIndex,setLastIndex]=useState<number>(perPageLimit-1)
  const [iWantToDelete,setIWantToDelete]=useState<boolean>(false)
  const [selectedCheckboxIdArr,setSelectedCheckboxIdArr]=useState<number[]>([])
  const checkboxRef: (React.MutableRefObject<HTMLInputElement | null>[]) =database.map(() => useRef(null));
  
  const totalAgain=iWantToDelete?dbAfterDelete.length:dbAfterDelete?.length||database.length
  const giveLastPage=():number=>Math.ceil((iWantToDelete?dbAfterDelete.length:dbAfterDelete?.length||database.length||0)/perPageLimit)
  console.log("Last-page-",giveLastPage())

  useEffect(()=>{
    setStartIndex((perPageLimit*page)-perPageLimit)
    if(totalAgain<=perPageLimit){
      setLastIndex(dbAfterDelete.length!==0?dbAfterDelete.length-1:database.length-1)
    }else if(page>=giveLastPage()){
      setLastIndex(dbAfterDelete.length!==0?dbAfterDelete.length-1:database.length-1)
    }else{
      setLastIndex(perPageLimit*page-1)
    }
  },[perPageLimit,page,dbAfterDelete])

  function createDatabasePerPage(){
    let databasePerPage:DatabaseType[]=[]
    console.log("loop func called - db after delete is-", dbAfterDelete.length-1)
    for(let i=startIndex;i<=lastIndex;i++){
      if(dbAfterDelete.length===0 && !iWantToDelete ){
        databasePerPage.push(database[i])
      }else if((dbAfterDelete.length!==0 && !iWantToDelete )){
        databasePerPage.push(dbAfterDelete[i]) 
      }
    }
    console.log("databasePerPage-",databasePerPage)
    setTestDbSort(databasePerPage)

  }
  useEffect(()=>{
    console.log("indexes---------------------> ",startIndex,lastIndex)
    createDatabasePerPage()
  },[startIndex,lastIndex])

  useEffect(()=>{
    if(totalAgain>perPageLimit){
      createDatabasePerPage()
    }
  },[dbAfterDelete])


  

  const handleSelectAll=(e: React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.checked){
        checkboxRef.forEach((ele)=>{
          if(ele.current){
            ele.current.checked=true
          }
        })
    }
    else if(!e.target.checked){
      checkboxRef.forEach((ele)=>{
        if(ele.current){
          ele.current.checked=false
        }
      })
    }
  }
  console.log("checkboxRef-",checkboxRef)

  let debounceTimer:any
  const handleCarbSortType=()=>{
    
    if(debounceTimer){
      clearTimeout(debounceTimer)
    }
    
    debounceTimer=setTimeout(()=>{
      setCarbSortType((prevSortType) => (prevSortType === 'asc' ? 'desc' : 'asc'));
      handleCarbSort()
    },500) 
  }
  
  const handleCarbSort=()=>{
    if(carbSortType==='asc'){
      setTestDbSort((prevArr)=>[...prevArr].sort((a,b)=>{return a.carbs-b.carbs}))
    }
    else{
      setTestDbSort((prevArr)=>[...prevArr].sort((a,b)=>{return b.carbs-a.carbs}))
    }
    if(debounceTimer){
      clearTimeout(debounceTimer)
    }

  }

  const handleDelete=(id:number)=>{
    let newUpdatedDb:DatabaseType[]=[]
    console.log(id)
    if(dbAfterDelete.length!==0){
      newUpdatedDb=dbAfterDelete.filter((ele)=>ele.id!==id)
    }else{
      newUpdatedDb=database.filter((ele)=>ele.id!==id)
    }
    console.log("newDb",newUpdatedDb)
    setDbAfterDelete(newUpdatedDb)
    createDatabasePerPage()
  }
  
  const handleDeleteAll=()=>{
    setDbAfterDelete([])
    setIWantToDelete(true)
    setTestDbSort([])
    // const searchInput=document.getElementById('searchInput')as HTMLInputElement;
    // if(searchInput){searchInput.disabled = true;}
  }
  const handlePageLimitChange=(e: React.ChangeEvent<HTMLSelectElement>)=>{
   setPerPageLimit(parseInt(e.target.value))
  }

  const handlePageChange=(editBy:number)=>{
    setPage((prevPage)=>prevPage+editBy)
  }

  type CapitalFuncType=(str:string)=>string
  const capitaliseFirstLetter:CapitalFuncType=(str)=>{
      str= str[0]?.toUpperCase()+str?.slice(1)
      return str
  }

  let desertDebounceTimer:any
  const handleDesertSearch=( e: React.ChangeEvent<HTMLInputElement>)=>{
    
    if(desertDebounceTimer){
      clearTimeout(desertDebounceTimer)
    }

    desertDebounceTimer=setTimeout(()=>{
      let str=e.target.value
      console.log("str outside--",str)
      if(str.length>0){
        const q:string=capitaliseFirstLetter(str)
        console.log(q,q.length)
        let searchResult:DatabaseType[]=[]

        if(dbAfterDelete.length>0 && q!=undefined){
          searchResult=dbAfterDelete.filter((ele)=>{
             let desertStr=ele.desert
             if(q.length>ele.desert.length){return false}
             return q.localeCompare(desertStr.slice(0,q.length))===0       
          })
        }
        else if(q!=undefined) {
          searchResult=database.filter((ele)=>{
            let desertStr=ele.desert
            if(q.length>ele.desert.length){return false}
            return q.localeCompare(desertStr.slice(0,q.length))===0       
         })
        }
        searchResult.length>0?setTestDbSort(searchResult):null
      }else{
        console.log("goes to calll perPageDb")
        createDatabasePerPage()
      }
      clearInterval(desertDebounceTimer)
    },1000)

  }
  type handleMultipleType=(e: React.ChangeEvent<HTMLInputElement>) => void
  const handleMultipleDelete:handleMultipleType=(e)=>{
     const idComing=parseInt(e.target.value)
     let flag=true;
     let idsArr:number[]=[]
     if(selectedCheckboxIdArr.length>0){
       idsArr=selectedCheckboxIdArr.filter((idInside)=>{
        if(idInside===idComing){ flag=false; return false}
        else{ return true } 
       })
     }else{
       flag=false;
       idsArr.push(idComing)
     }
     if(flag){idsArr.push(idComing)}
     console.log("idsArr---->",idsArr)
     setSelectedCheckboxIdArr(idsArr)
  }
  const deleteSelected=()=>{
    let output:DatabaseType[]=[]
    if(dbAfterDelete.length>0){
        output=dbAfterDelete.filter((ele)=>{return !selectedCheckboxIdArr.includes(ele.id)})
    }else{
        output=database.filter((ele)=>{return !selectedCheckboxIdArr.includes(ele.id)})   
    }
    setDbAfterDelete(output)
    // createDatabasePerPage()
    setSelectedCheckboxIdArr([])

  }
console.log("SelectedCheckboxIdArr(",selectedCheckboxIdArr)
console.log("testDbSortArr-",testDbSort)

  return (
    <>
     <div>
      <div className='desertSearchDiv' >
        <input type='search' placeholder='Search desert...' id='desertSearch' name='desertSearch' onChange={(e)=>{handleDesertSearch(e)}}/>
        <button disabled={selectedCheckboxIdArr.length<=0} onClick={deleteSelected} >Delete Selected({selectedCheckboxIdArr.length})</button>
        <button onClick={handleDeleteAll} >Delete All</button>
      </div>
      <table>
        <thead>
          <tr>
            <th><input disabled={iWantToDelete} type='checkbox' onChange={(e)=>handleSelectAll(e)}  /></th>
            <th>Desert</th>
            <th onClick={()=>{handleCarbSortType()}} >{'('+carbSortType+')'}Carbs</th>
            <th>Fats</th>
            <th>Protein</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          { testDbSort.length>0?testDbSort.map((ele,index)=>{
            return(<tr key={ele.id} >
              <td><input ref={checkboxRef[index]} onChange={(e)=>handleMultipleDelete(e)} id='searchInput' value={ele.id} type='checkbox' /></td>
              <td>{ele.desert}</td>
              <td>{ele.carbs}</td>
              <td>{ele.fats}</td>
              <td>{ele.proteins}</td>
              <td onClick={()=>{handleDelete(ele.id)}} >{"Delete"}</td>
            </tr>)
          }):"Chart empty"      
          }
        </tbody>
      </table>
      <div className='paginationDiv' >
        <div>Total:{iWantToDelete?dbAfterDelete.length:dbAfterDelete?.length||database.length}</div>
        <div>
          <label>Row per page</label>
          <select name='pageLimit' onChange={(e)=>handlePageLimitChange(e)} >
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
          </select>
        </div>
        <div>
          <div>{page} of 1-{giveLastPage()}</div>
        </div>
        <div className='prevNextDiv' >
          <button disabled={page===1} onClick={()=>handlePageChange(-1)} >Prev</button>
          <button disabled={page>=giveLastPage()} onClick={()=>handlePageChange(1)} >Next</button>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
