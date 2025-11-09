import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'

const Pending_req = () => {
    const[pending,setpending]=useState([]);
    const fetchPending=async ()=>{
        const res=await axios.get('http://localhost:1234/users/requests/sent',{withCredentials:true});
        setpending(res.data);
    };
    useEffect(()=>{
        fetchPending();
    },[]);
  return (
    pending.map((data)=>
    {
       return(
   <div className="card bg-base-300 w-80 shadow-md mx-auto my-12 rounded-lg overflow-hidden" key={data.user._id}>
  {/* Image */}
  <figure className="h-56 w-full flex justify-center items-center bg-base-200">
    <img
      className="max-h-56 w-auto p-4 object-contain"
      src={data.user.PhotoUrl}
      alt={data.user.firstName + " " + data.user.lastName}
    />
  </figure>

  {/* Content */}
  <div className="card-body items-center">
    <h2 className="card-title">{data.user.firstName + " " + data.user.lastName}</h2>
    <h1 className="mt-1 text-sm">Status: {'Pending' || data.status}</h1>
  </div>
</div>
  );
}));
};

export default Pending_req;