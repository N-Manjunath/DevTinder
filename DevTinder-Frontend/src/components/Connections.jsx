import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/ConnectionSlice';

const Connections = () => {
    const dispatch=useDispatch();
    const data=useSelector((store)=>store.connections);
    //console.log(data);
    const fetchconnections=async()=>
    {
        try{
            const res=await axios(`${import.meta.env.VITE_API_URL}/users/connections`,{withCredentials:true});
        dispatch(addConnections(res.data));
        }catch(err)
        {
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchconnections();
    },[])
    if(!data|| data.length==0)
    {
      return (<div className='text-3xl  font-bold text-center'>No Connections</div>)
    }
  return (
    <>
    {data&&( 
    <div>
   <h1 className='text-3xl font-bold text-center my-2'>Connections</h1>
    {data.map((data)=>
    {
        const {firstName,lastName,Gender,Age,_id,PhotoUrl}=data;
        return(
      <div key={_id} className="card bg-base-200 w-80 my-5 mx-auto flex-1">
  <div className="flex items-center p-3">
   <figure className="flex-shrink-0">
      <img src={PhotoUrl} className="w-24 h-24 rounded-full object-cover" alt="Img" />
    </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    <p>{Gender}</p>
    <p>{Age}</p>
  </div>
</div>
        </div>
        )})}
  </div>
)
    }
    </>
)
}

export default Connections
