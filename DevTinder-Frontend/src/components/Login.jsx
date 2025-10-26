import React, { useState } from 'react'
import axios from 'axios';
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import API from '../api';
const Login = () => {
  const dispatch=useDispatch();
    const[EmailId,setEmailId]=useState("");
    const[Password,setPassword]=useState("");
     const[firstName,setfirstName]=useState("");
    const[lastName,setlastName]=useState("");
    const[error,seterror]=useState("");
    const[isLogin,setisLogin]=useState(false);
    const[showPassword,setShowPassword]=useState(false);
    const navigate=useNavigate();
    const handlelogin=async()=>
    {
        try{
        const res = await API.post('/login',{
            EmailId,
            Password,
        });
        dispatch(addUser(res.data));
       return navigate("/");
        }
        catch(err)
        {
          seterror(err.response.data);
            //console.log(err.response.data);
        }
    }
       const handlesignup=async()=>
      {
        try{
        const res = await API.post('/signup',{
          firstName,
          lastName,
            EmailId,
            Password,
        });
        dispatch(addUser(res.data));
       return navigate("/profile");
        }
        catch(err)
        {
          seterror(err.response.data);
            //console.log(err.response.data);
        }
      }
  return (
    <div className='flex justify-center my-4'>
    <div className="card bg-base-300 text-primary-content w-80  justify-center">
  <div className="card-body">
    <h4 className='flex justify-center text-2xl font-bold'>{isLogin?"Login":"SignUp"}</h4>
    {!isLogin && <><label className='block text-sm font-medium mb-1'>firstName
  <input type="text" value={firstName} placeholder="Enter firstName" className="input my-1" onChange={(e)=>setfirstName(e.target.value)} />
    </label>
     <label className='block text-sm font-medium mb-1'>lastName
  <input type="text" value={lastName} placeholder="Enter lastName " className="input my-1" onChange={(e)=>setlastName(e.target.value)} />
    </label>
    </>}
  <div className="form-control w-full max-w-sm">
  <label htmlFor="email" className="block text-sm font-medium mb-1">
    Email
  </label>
  <div className="input validator flex items-center gap-2">
    <svg
      className="h-[1em] opacity-50"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2.5"
        fill="none"
        stroke="currentColor"
      >
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </g>
    </svg>
    <input
      value={EmailId}
      type="text"
      placeholder="mail@site.com"
      onChange={(e)=>setEmailId(e.target.value)}
      className="flex-1 bg-transparent outline-none my-1"
    />
  </div>
</div>
  <div className="form-control w-full max-w-sm">
  <label htmlFor="email" className="block text-sm font-medium mb-1">
    password
  </label>
  <div className="input validator flex items-center gap-2">
    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      ></path>
     
    </g>
  </svg>
  <input
    className='my-1'
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={Password}
    onChange={(e)=>setPassword(e.target.value)} 
  />
  <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-0"
>
  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
</button>

  </div>
</div>
    <p className='text-red-500 mx-2 mb-3'>{error}</p>
    <div className="card-actions justify-center">
      <button className="btn" onClick={isLogin?handlelogin:handlesignup}>{isLogin?"Login":"Signup"}</button>
    </div>
    <p  className="cursor-pointer text-center my-1" onClick={()=>setisLogin(!isLogin)}>{isLogin?"New user?Signup here":"Already a user?Login"}</p>
  </div>
  </div>
</div>
  )
}

export default Login
