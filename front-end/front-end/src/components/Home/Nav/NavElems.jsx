import React from 'react'
import { NavLink } from 'react-router-dom'




function NavElems() {
  return (
      <>
      <div className="NavElem w-full items-center justify-center flex flex-col gap-3">
        <NavLink to={'/home/weather'} className='text-2xl bg-[#64c290] w-[200px] py-2 text-center rounded-xl tracking-wide'>Weather</NavLink>
        <NavLink to={'/home/plantDetector'} className='text-2xl  bg-[#64c290] w-[200px] py-2 text-center rounded-xl '>Plant Decetor</NavLink>
        <NavLink to={'/home/plantSuggestion'} className='text-2xl  bg-[#64c290] w-[200px] py-2 text-center rounded-xl tracking-wide'>Plant Suggestion</NavLink>
        <NavLink to={'/home/plantDetails'} className='text-2xl  bg-[#64c290] w-[200px] py-2 text-center rounded-xl tracking-wide'>Plant Details</NavLink>
            </div>
      </>
  )
}

export default NavElems