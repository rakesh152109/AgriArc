import React, { useState } from "react";
import "../Styleing.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  // axios.defaults.withCredentials= true

  const accountSignINhandler = (e) => {
    e.preventDefault();

    axios
      .post("/api/v1/users/login", data)
      .then((res) => {
        toast.success(res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data));
      
        redirectTo();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };


  const redirectTo = () => {
    navigate("/home", { replace: true });
  }

  return (
    <>
      <div className=" w-full h-screen">
        <div className="box bg-[#fdfddb] overflow-hidden w-[65%] flex h-[70%]  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
          <div className=" bg-[#45b86a]  relative left w-[50%]  h-[100%]">
            <form
              onSubmit={accountSignINhandler}
              className="flex flex-col absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2  gap-3"
              action=""
            >
              <h1 className="mx-auto text-3xl mb-2">Sign In</h1>

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
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
              </div>

              {/* <div className="elem flex flex-col gap-1">
                    <label className='text-xl ml-2' htmlFor="email">Email</label>
                     <input  id='email' name={'email'}  className='px-4  py-2 bg-[#93E9BE] text-black outline-none rounded-xl' type="email" placeholder='Email' onChange={(e) => setData({ ...data, email: e.target.value })} /> 
                    </div> */}

              <div className="elem flex flex-col gap-1">
                <label className="text-xl ml-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name={"password"}
                  className="px-4  bg-[#93E9BE] text-black outline-none py-2 rounded-xl"
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>

              <div className="button items-center w-full flex flex-col gap-2  ">
                <button
                  type="submit"
                  className={"p-3 px-4 rounded-xl w-fit bg-[#00AB66]"}
                >
                  Sign IN
                </button>

                <NavLink className={"p-3 w-fit px-4 rounded-xl bg-[#00AB66]"}>
                  SignIn With Google
                </NavLink>
              </div>
              <NavLink
                className={
                  "hover:text-blue-200 duration-300 ease-in-out  text-center"
                }
                to={"/signup"}
              >
                Create an Account
              </NavLink>
            </form>
          </div>

          <div className=" rounded_bg right w-[50%] bg-[#45b86a] h-[100%] py-2  ">
            <img
              className="w-full p-3 h--full object-cover  "
              src="/signin1.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
