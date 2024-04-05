import NavHead from './NavHead.jsx'
import NavElems from './NavElems.jsx'


import React from 'react'

let userData = JSON.parse(localStorage.getItem('user'))?.data?.user;
console.log(userData)
function Nav() {
  return (
      <div className="left overflow-hidden  h-full w-[15%] flex flex-col justify-between items-center">
          

    <div className="top overflow-hidden flex flex-col gap-5 justify-start ">
      <NavHead imgUrl="https://tse1.mm.bing.net/th?id=OIP.KN12UqY0ao4SRH-3KW8B6wHaFp&pid=Api&P=0&h=180" tittle="AgroArc" url='/home'  />
      
      <NavElems/>

    </div>

    <div className="bottom">
      <NavHead imgUrl={userData.profileImage} tittle={userData.fullName} url='/home/userProfile' />
    </div>

     </div>
  )
}

export default Nav