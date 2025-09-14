import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeUser } from '../utils/userSlice';
import axios from 'axios';

const Navbar = () => {
  const user=useSelector((store)=>store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handlelogout=async()=>
  {
    await axios.post("http://localhost:1234/logout",{},
      {withCredentials:true,})
    //console.log("remove user is called !")
    dispatch(removeUser());
    return navigate("/login");
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1 mx-4">
    <Link to="/" className="btn btn-ghost text-xl"> DevTinder ❤️</Link>
  </div>
  {user&&<><p>Hi ,{user.firstName+" "+user.lastName}</p>
  <div className="flex mx-5">
    <div className="dropdown dropdown-end">

      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-3xl mx-3'">
          <img
           alt="Tailwind CSS Navbar component"
            src={user.PhotoUrl} />
            
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/requests" className="justify-between">
             Received Requests
          </Link>
        </li>
       <li> <Link to="/connections">Connections</Link></li>
        <li><Link onClick={handlelogout}>Logout</Link></li>
      </ul>
    </div>
  </div>
  </>
}
</div>
  )
}

export default Navbar
