import React from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function Logout() {

    const navigate = useNavigate();
    
  let logout = () => {
    
   


    axios.post("/api/v1/users/logout")
    .then((res) => {
        // console.log(res.data.statusCode)
        // console.log(res.data.message)
    toast.success(res.data.message)
  navigate('/signin', { replace: true })
    }).catch((err) => {
      toast.error(err?.response?.data?.message)
    })

    localStorage.clear();
  }








  return (
      <>
      
      <button className='p-3 m-4 rounded-xl bg-slate-400' onClick={logout}>Logout</button>
      </>
  )
}

export default Logout