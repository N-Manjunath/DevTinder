import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addrequests, removeReq } from '../utils/RequestsSlice';

const Requests = () => {
    const data=useSelector(store=>store.requests);
    const dispatch=useDispatch();
    const fetchReq=async()=>
    {
        const res=await axios.get('http://localhost:1234/users/requests/received',{withCredentials:true});
        dispatch(addrequests(res.data));
    }
    const handlereq=async(status,reqId)=>
    {
        const res=await axios.post( `http://localhost:1234/review/${status}/${reqId}`,{},{withCredentials:true});
        dispatch(removeReq(res.data));
    }
    useEffect(()=>
    {
        fetchReq();
    },[])
     if(!data || data.length==0) 
    {
        return <div className='text-2xl text-center my-7 font-bold'>No Connection requests found</div>;
    }
  return (
    <>
    {data&&
    <div>
        <h1 className='text-3xl font-bold text-center my-2'>Connection Requests</h1>
        {data.map(data=>
            {
                const{_id}=data;
                const{firstName,lastName,Age,Gender,PhotoUrl}=data.fromID;
                return(
                   <div key={_id} className="card bg-base-200 w-80 my-5 mx-auto flex-1">
  <div className="flex items-center p-3">
    {/* Image on left */}
    <figure className="flex-shrink-0">
      <img src={PhotoUrl} className="w-24 h-24 rounded-full object-cover" alt="Img" />
    </figure>

    {/* Content on right */}
    <div className="ml-4 flex-1">
      <h2 className="text-lg font-semibold">{firstName + " " + lastName}</h2>

      <div className="flex items-center mt-2 text-sm text-gray-700">
        <span className='text-white'>{Gender}</span>
        <span className='text-white'>{Age}</span>
      </div>

      <div className="card-actions justify-start mt-4">
        <button className="btn btn-success btn-sm" onClick={() => handlereq("Accepted", _id)}>Accept</button>
        <button className="btn btn-error btn-sm ml-2" onClick={() => handlereq("Rejected", _id)}>Reject</button>
      </div>
    </div>
  </div>
</div>
   )})  }
    </div>
}
    </>
  )
}

export default Requests
