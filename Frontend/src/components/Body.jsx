import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import Footer from './Footer'
import { useState } from 'react'
import { API_URL } from '../utils/api'
import api from "../utils/axios";

const Body = () => {
  const dispatch=useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const navigate=useNavigate();
  const fetchUser=async()=>{
    const res = await api.get("/user");
dispatch(addUser(res.data));
navigate("/")
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
