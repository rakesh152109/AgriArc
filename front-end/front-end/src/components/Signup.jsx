import React, { useState } from "react";
import "../Styleing.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup() {
  let [data, setData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    profileImage: "",
  });


  const navigate = useNavigate();


  const accountCreatehandler = (e) => {
    e.preventDefault();

    axios
      .post("/api/v1/users/register", data)
      .then((res) => {
        toast.success(res.data.message);
        console.log(res)
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
   

    
  };

 

  return (
    <>
      <div className=" w-full h-screen">
        <div className="box bg-[#fdfddb] overflow-hidden w-[65%] flex h-[70%]  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
          <div className="  rounded_bg flex justify-center items-center left w-[50%]  h-[100%]">
            <img
              className="w-full p-5  object-cover  "
              src="/signup1.png"
              alt=""
            />
          </div>

          <div className="right justify-center flex items-center w-[50%] bg-[#45b86a] h-[100%] py-2  ">
            <form
              onSubmit={accountCreatehandler}
              className="flex flex-col p-4 w-full gap-2"
              action=""
            >
              <h1 className="mx-auto text-3xl">Create Account</h1>

              <div className="elem flex flex-col gap-1">
                <label className="text-xl ml-2" htmlFor="fullName">
                  FullName
                </label>
                <input
                  id="fullName"
                  name={"fullName"}
                  className="px-4 bg-[#93E9BE] text-black outline-none py-2 rounded-xl"
                  type="text"
                  placeholder="FullName"
                  required
                  onChange={(e) =>
                    setData({ ...data, fullName: e.target.value })
                  }
                />
              </div>

              <div className="elem flex flex-col gap-1">
                <label className="text-xl ml-2" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  name={"username"}
                  className="px-4  bg-[#93E9BE] text-black outline-none py-2 rounded-xl"
                  type="text"
                  placeholder="Username"
                  min={7}
                  required
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
              </div>

              <div className="elem flex flex-col gap-1">
                <label className="text-xl ml-2" htmlFor="email">
                  Email
                </label>
                <input
                  
                  id="email"
                  name={"email"}
                  className="px-4  py-2 bg-[#93E9BE] text-black outline-none rounded-xl"
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>

              <div className="elem flex flex-col gap-1">
                <label className="text-xl ml-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name={"password"}
                  className="px-4  bg-[#93E9BE] text-black outline-none py-2 rounded-xl"
                  type="password"
                  required
                  min={6}
                  placeholder="Password"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>

              <div className="elem flex flex-col gap-1">
                <label className="text-xl ml-2" htmlFor="profileimage">
                  ProfileImage
                </label>
                
                <p  className="px-4 bg-[#93E9BE] w-fit text-center   py-1  rounded-2xl"><label htmlFor="profileimage">Upload Photo</label></p>
                <input 
                  id="profileimage"
                  name={"profileimage"}
                  className="px-4 invisible   "
                  type="file"
                  placeholder="ProfileImage"
                  onChange={(e) =>
                    setData({ ...data, profileImage: e.target.value })
                  }
                />
              </div>

              <div className="button  w-full flex gap-4">
                <button
                  type="submit"
                  className={"p-3 px-4 rounded-xl bg-[#00AB66]"}
                >
                  Create Account
                </button>

                <NavLink className={"p-3 px-4 rounded-xl bg-[#00AB66]"}>
                  SignUp With Google
                </NavLink>
              </div>

              <p className="p-1">
                Already Have an account{" "}
                <NavLink className={"hover:text-blue-200"} to={"/signin"}>
                 LogIn
                </NavLink>
              </p>
            
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
