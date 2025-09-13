import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/ConnectionSlice';

const Connections = () => {
    const dispatch=useDispatch();
    const data=useSelector((store)=>store.connections);
    console.log(data);
    const fetchconnections=async()=>
    {
        try{
            const res=await axios("http://localhost:1234/users/connections",{withCredentials:true});
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
        const {firstName,lastName,Gender,Age,_id}=data;
        return(
        <div key={_id}>
           <div className="card card-side bg-base-200 h-32 w-xl shadow-sm my-4 mx-auto">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      alt="Movie" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    <p>{Gender}</p>
    <p>{Age}</p>
  </div>
</div>
        </div>
        )})};
  </div>
)
    }
    </>
)
}

export default Connections
