import React, { useEffect } from 'react'
// import { AuthUser } from '../utils/Context.jsx'
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import {Outlet} from 'react-router-dom'


import Nav from './Nav/Nav.jsx'
function Home() {
  const navigate = useNavigate();
  
  


  return (
    <>
      {/* <Logout /> */}
      <div className="w-[100%] #69c793py-2 px-2 py-2 gap-2 overflow-hidden  h-[100%] flex bg-[#53a678] rounded-lg  home">
        <Nav />
        
        <div className="right p-1 h-full w-[85%] rounded-2xl bg-[#50C878]">
        
          <Outlet></Outlet>  


        </div>
      </div>
      
    </>
  )
}

export default Home