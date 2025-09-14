import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const dispatch=useDispatch();
    const[EmailId,setEmailId]=useState("");
    const[Password,setPassword]=useState("");
     const[firstName,setfirstName]=useState("");
    const[lastName,setlastName]=useState("");
    const[error,seterror]=useState("");
    const[isLogin,setisLogin]=useState(false);
    const navigate=useNavigate();
    const handlelogin=async()=>
    {
        try{
        const res = await axios.post("http://localhost:1234/login",{
            EmailId,
            Password,
        },{withCredentials:true});
      //  console.log(res.data);
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
        const res = await axios.post("http://localhost:1234/signup",{
          firstName,
          lastName,
            EmailId,
            Password,
        },{withCredentials:true});
      console.log(res);
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
    {!isLogin && <><label>firstName
  <input type="text" value={firstName} placeholder="Enter firstName" className="input my-2" onChange={(e)=>setfirstName(e.target.value)} />
    </label>
     <label>lastName
  <input type="text" value={lastName} placeholder="Enter lastName " className="input my-2" onChange={(e)=>setlastName(e.target.value)} />
    </label>
    </>}
    <label>Email
    <input type="text" value={EmailId} placeholder="Enter Email" className="input my-2" onChange={(e)=>setEmailId(e.target.value)}/>
    </label>

    <label>Password
  <input type="password" value={Password} placeholder="Enter password" className="input my-2" onChange={(e)=>setPassword(e.target.value)} />
    </label>
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
