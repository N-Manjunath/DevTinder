import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import Footer from './Footer'
import API from '../api'

const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const fetchUser=async()=>{
    try{
    const res= await API.get('/user');
      dispatch(addUser(res.data));
      return navigate('/');
    }
  catch(err)
  {
    navigate('/login');
    console.log(err);
  }
  }
  useEffect(()=>
  {
    fetchUser();
  },[]);
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
