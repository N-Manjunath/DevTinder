import React, { useEffect, useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';

const Feed =() => {
  const[data,setdata]=useState(null);
  const feed=async()=>{
  try{
    const res=await axios("http://localhost:1234/user/feed",{
      withCredentials:true,
    });
    setdata(res.data);
  }catch(err)
  {
    console.log(err);
  }
}
useEffect(()=>
{
  feed();
},[])
  return (
    <div>
      <UserCard user={data}/>
    </div>
  )
}

export default Feed;
