import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addrequests } from '../utils/RequestsSlice';

const Requests = () => {
    const data=useSelector(store=>store.requests);
    const dispatch=useDispatch();
    const fetchReq=async()=>
    {
        const res=await axios("http://localhost:1234/users/requests/received",{withCredentials:true});
        console.log(res.data);
        dispatch(addrequests(res.data));
    }
    const handlereq=async(status,reqId)=>
    {
        const res=await axios.post(`http://localhost:1234/review/${status}/${reqId}`,{},{withCredentials:true});
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
                const{firstName,lastName,Age,Gender}=data.fromID;
                return(
                   <div key={_id} className="card bg-base-200 w-96 my-5 mx-auto">
                    <h2 className='text-center my-1'>{firstName+" "+lastName}</h2>
                        <div className="justify-center items-center flex mt-3">
                            <h3 className='tex'>{Gender}</h3>
                            <h2 className='mx-2'>{Age}</h2>
                            </div>
                            <div className="card-actions justify-center my-4">
                            <button className="btn btn-success" onClick={()=>handlereq('Accepted',_id)}>Accept</button>
                            <button className="btn btn-error" onClick={()=>handlereq('Rejected',_id)}>Reject</button>
                            </div>
                        
                    </div>

                )
            }
        )
    }
    </div>
}
    </>
  )
}

export default Requests
