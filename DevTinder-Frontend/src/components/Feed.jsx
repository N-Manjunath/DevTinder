import React, { useEffect, useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';

const Feed =() => {
  const dispatch=useDispatch();
  const data=useSelector((store)=>store.feed);
  const feed=async()=>{
  try{
    const res=await axios("http://localhost:1234/user/feed",{
      withCredentials:true,
    });
    dispatch(addFeed(res.data));
  }catch(err)
  {
    console.log(err);
  }
}
useEffect(()=>
{
  feed();
},[])
  return (data &&(
    <div>
      <UserCard user={data}/>
    </div>
  )
)
}

export default Feed;
