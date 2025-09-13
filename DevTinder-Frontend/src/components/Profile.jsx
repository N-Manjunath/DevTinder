import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user=useSelector((store=>store.user));
  return (
//     <div className='flex mx-80'>
// <div className="card bg-base-300 w-82 shadow-sm mx-2 my-12">
//   <figure>
//     <img className='w-full h-72'
//       src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/The_White_House_-_54409525537_%28cropped%29.jpg/250px-The_White_House_-_54409525537_%28cropped%29.jpg"
//       alt="Shoes"/>
//   </figure>
//   <div className="card-body">
//     <h2 className="card-title">N Manjunath</h2>
//     <h1 className='mt-1'>22</h1>
//     <p>This is Manjunath Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
//     <h3>Male</h3>
//     <div className="card-actions justify-center my-2 p-2">
//       <button className="btn btn-secondary mx-2">Ignored</button>
//       <button className="btn btn-primary mx-2">Interested</button>
//     </div>
//   </div>
// </div>
//</div>
<EditProfile user={user}/>
  )
}

export default Profile
