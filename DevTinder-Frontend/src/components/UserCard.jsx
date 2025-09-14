import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
const dispatch=useDispatch();
  if(!user || user.length==0) return <div className='text-3xl text-center font-bold my-4'>No More Feed to see</div>
const{firstName,lastName,Age,Gender,Bio,_id,PhotoUrl}=user;
const handlesentreq=async(status,reqID)=>
    {
        const res=await axios.post('http://localhost:1234/send/'+status+'/'+reqID,{},{withCredentials:true});
        dispatch(removeFeed(reqID));
    }
  return (

<div className="card bg-base-300 w-80 shadow-md mx-auto my-12 rounded-lg overflow-hidden">
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
    <p className="text-sm">{Bio}</p>
    <h3 className="text-sm font-medium">{Gender}</h3>

    {/* Actions */}
    <div className="card-actions justify-center mt-3">
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





  )
}

export default UserCard
