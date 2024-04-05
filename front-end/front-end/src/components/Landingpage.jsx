import { NavLink } from "react-router-dom"



function Landingpage() {
  return (
      <>
          <div className="main h-full p-2 px-4 w-full bg-slate-600]">
              <div className=" w-full flex justify-start items-center gap-5 p-2 ">
                   <NavLink className='px-4 py-2 bg-green-400  rounded-xl' to={"/signup"}>SignUp  </NavLink>
                   <NavLink className='px-4 py-2 bg-green-400  rounded-xl' to={"/signin"}>SignIn </NavLink>
        </div>
        
      

        <iframe className="absolute  top-[10%] bottom-[0%] right-2 " src='https://my.spline.design/untitled-549406a934ddba187e22c14e8d85202c/' frameborder='0' width='45%' height='800px'></iframe>
      
       



      </div>
      
      </>
  )
}

export default Landingpage