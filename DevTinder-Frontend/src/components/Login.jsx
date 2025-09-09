import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Login = () => {
  const dispatch=useDispatch();
    const[EmailId,setEmailId]=useState("manju@gmail.com");
    const[Password,setPassword]=useState("manju@123");
    const handlelogin=async()=>
    {
        try{
        const res = await axios.post("http://localhost:1234/login",{
            EmailId,
            Password,
        },{withCredentials:true});
        dispatch(addUser(res.data));
        }
        catch(err)
        {
            console.log(err);
        }
    }
  return (
    <div className='flex justify-center my-4'>
    <div className="card bg-base-300 text-primary-content w-80  justify-center">
  <div className="card-body">
    <h4 className='flex justify-center text-2xl font-bold'>Login</h4>
    <label>Email
    <input type="text" value={EmailId} placeholder="Type here" className="input my-2" onChange={(e)=>setEmailId(e.target.value)}/>
    </label>
    <label>Password
  <input type="text" value={Password} placeholder="Type here" className="input my-3" onChange={(e)=>setPassword(e.target.value)} />
    </label>
  
    <div className="card-actions justify-center">
      <button className="btn" onClick={handlelogin}>Login</button>
    </div>
  </div>
  </div>
</div>
  )
}

export default Login
