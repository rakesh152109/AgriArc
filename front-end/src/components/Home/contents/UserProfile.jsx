import React from 'react';
import LogOut from '../Logout.jsx'
// import deleteUser from '../delete.jsx'
import DeleteUser from '../delete.jsx'


function UserProfile() {


  const UserData= JSON.parse(localStorage.getItem("user"))?.data?.user;
console.log(UserData)
  return (
    <>
    
      {/* <LogOut /> */}
      <div className="main flex justify-center items-center w-full h-full bg-slate-500">
          {/* <h1>hello</h1> */}
          <div className="left  w-1/3 h-2/3 p-10 flex-col bg-slate-800 flex justify-start items-center">
          <div className="img flex  flex-col justify-center items-center">
          <img className='w-[250px] rounded-full h-[250px]' src={UserData.profileImage} alt="" />
          <p className='m-2 text-white  m-2 mt-3 bg-red-400 px-4 text-2xl rounded'>{UserData.username}</p>
            </div>
          <h1 className='m-2 text-white  m-2 mt-3  px-4 text-2xl rounded'>{UserData.fullName}</h1>
          <p className='m-2 text-white  m-2 mt-3  px-4 text-2xl rounded '>{UserData.email}</p>
          <div className="btn">
            <LogOut />
            <DeleteUser/>
          </div>

</div>
      </div>

        

    </>
  )
}

export default UserProfile