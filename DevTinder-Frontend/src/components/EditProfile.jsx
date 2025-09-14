import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const EditProfile = ({user}) => {
    if(!user) return;
    const[firstName,setfirstName]=useState(user.firstName);
    const[lastName,setlastName]=useState(user.lastName);
    const[Age,setAge]=useState(user.Age||" ");
    const[Gender,setGender]=useState('male'||user.Gender);
    const[Bio,setBio]=useState(user.Bio||" ");
    const[Skills,setSkills]=useState(user.Skills ||" ");
    const[PhotoUrl,setPhotoUrl]=useState(user.PhotoUrl);
    const dispatch=useDispatch();
    const saveprofile=async()=>{
        try{
            const res=await axios.patch('http://localhost:1234/user/edit',{firstName,lastName,Gender,Bio,Age,Skills,PhotoUrl},{withCredentials:true});
        //console.log(res.data);
            dispatch(addUser(res.data));
          }catch(err){
            console.log(err);
        }
    }
  return (
  
    <div className="card bg-base-300 w-82 shadow-sm mx-auto my-12">
  <div className="card-body">
    <h2 className="text-xl font-bold mx-2">Edit Profile</h2>
    <input type="text" placeholder="firstName" onChange={(e)=>setfirstName(e.target.value)} value={firstName} className="input m-1" />
    <input type="text" placeholder="lastName" onChange={(e)=>setlastName(e.target.value)} value={lastName} className="input m-1" />
    <input type="text" placeholder="Age" onChange={(e)=>setAge(e.target.value)} value={Age} className="input m-1" />
    <input type="text" placeholder="Gender"  onChange={(e)=>setGender(e.target.value)} value={Gender} className="input m-1" />
    <input type="text" placeholder="Photo Url" onChange={(e)=>setPhotoUrl(e.target.value)} value={PhotoUrl} className="input m-1" />
    <input type="text" placeholder="Skills" value={Skills} onChange={(e)=>setSkills(e.target.value)} className="input m-1" />
    <input type="text" placeholder="Bio" value={Bio} onChange={(e)=>setBio(e.target.value)} className="input m-1" />
    
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={saveprofile}>Save Profile</button>
    </div>
  </div>
</div>
  )
}

export default EditProfile
