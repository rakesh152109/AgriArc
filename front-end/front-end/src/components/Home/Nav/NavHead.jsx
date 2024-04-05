import React from 'react'
import { Link } from 'react-router-dom'

function NavHead({imgUrl , tittle , url}) {
  return (
    <div className="NavHead  bg-slate-100 p-2 w-fit  px-4 rounded-lg flex gap-5 items-center ">
             <Link to={url}><img src={imgUrl} alt="logo" className='w-10 h-10 rounded-full' /></Link>
         <Link to={url}><h1 className='font-bold'>{tittle}</h1></Link>
               </div>
  )
}

export default NavHead