import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
const EditProfile = ({user}) => {
    if(!user) return;
    const[firstName,setfirstName]=useState(user.firstName);
    const[lastName,setlastName]=useState(user.lastName);
    const[Age,setAge]=useState(user.Age||" ");
    const[Gender,setGender]=useState('male'||user.Gender);
    const[Bio,setBio]=useState(user.Bio||" ");
    const[Skills,setSkills]=useState(user.Skills ||" ");
    const[PhotoUrl,setPhotoUrl]=useState(user.PhotoUrl);
    const[show,setshow]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const saveprofile=async()=>{
        try{
            const res=await axios.patch('http://localhost:1234/user/edit',{firstName,lastName,Gender,Bio,Age,Skills,PhotoUrl},{withCredentials:true});
            dispatch(addUser(res.data));
            navigate("/");
          }catch(err){
            console.log(err);
        }
    }
    const preview=()=>
    {
      setshow(!show);
      console.log("hi !");
    }
  return (
  <div className='flex'>
    <div className="card bg-base-300 w-80 shadow-sm mx-auto my-12">
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
      <button className="btn btn-primary" onClick={preview}>Preview</button>
    </div>
  </div>
</div>
{show &&
<div className="card bg-base-300 w-80 shadow-md mr-96 my-12 rounded-lg overflow-hidden">
  {/* Image */}
  <figure className="h-56 w-full flex justify-center items-center bg-base-200">
    <img
      className="max-h-56 w-auto p-4 object-contain"
      src={PhotoUrl}
      alt={firstName + " " + lastName}
    />
  </figure>

  {/* Content */}
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    <h1 className="mt-1 text-sm">Age: {Age}</h1>
    <h3 className="text-sm font-medium">{Gender}</h3>
    <p className="text-sm">{Bio}</p>
    {/* Actions */}
    <div className="card-actions justify-center mt-1">
      <button
        className="btn btn-secondary btn-sm mx-2"
        onClick={() => handlesentreq("Ignored", _id)}
      >
        Ignore
      </button>
      <button
        className="btn btn-primary btn-sm mx-2"
        onClick={() => handlesentreq("Interested", _id)}
      >
        Interested
      </button>
    </div>
  </div>
</div>
}
</div>
  )
}

export default EditProfile
