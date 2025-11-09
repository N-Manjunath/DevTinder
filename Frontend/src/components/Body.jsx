import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import Footer from './Footer'
import { useState } from 'react'

const Body = () => {
  const dispatch=useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const navigate=useNavigate();
  const fetchUser=async()=>{
    await axios.get('http://localhost:1234/user',{withCredentials:true})
    .then(res=>{
      dispatch(addUser(res.data));
      return navigate('/');
    })
  .catch(err=>{
    navigate('/login');
    console.log(err);
  })
  .finally(()=>{
    setAuthChecked(true);
  }),[dispatch,navigate]};

  useEffect(()=>
  {
    fetchUser();
  },[]);

  if(!authChecked)
  {
    return <div>Loading the feed ..</div>
  }
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
