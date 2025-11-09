import React, { useEffect, useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';

const Feed =() => {
  const dispatch=useDispatch();
  const feed=useSelector((store)=>store.feed);
  const feeds=async()=>{
    if(feed) return;
  try{
    const res=await axios.get('http://localhost:1234/user/feed',{withCredentials:true});
    dispatch(addFeed(res.data));
  }catch(err)
  {
    console.log(err);
  }
}
useEffect(()=>
{
  feeds();
},[])
  return (
    feed &&<div>
        <UserCard user={feed[0]} />
    </div>
    
  )
}

export default Feed;
