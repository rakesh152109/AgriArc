import React from 'react'
import { NavLink } from "react-router-dom";
function MustLogIN() {
  return (
      <>
      
      <div className="flex flex-col h-full  justify-center items-center gap-4 ">
      <h1 className='text-red-600 text-3xl' > &#9888; You Must be logged IN </h1>



<NavLink to={"/signin"} className={"p-3 w-fit px-4 rounded-xl bg-[#00AB66]"}>
                  SignIn 
                </NavLink>

     </div>
      </>
  )
}

export default MustLogIN