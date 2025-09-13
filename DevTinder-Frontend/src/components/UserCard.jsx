import React from 'react'

const UserCard = ({user}) => {
    if(!user || user.length==0) return null;
    //console.log(user);
    const{firstName,lastName,Age,Gender,Bio}=user[0];
  return (
    <div className="card bg-base-300 w-82 shadow-sm mx-auto  my-12">
  <figure>
    <img className='w-full h-72'
      src="https://static.vecteezy.com/system/resources/previews/046/010/545/non_2x/user-icon-simple-design-free-vector.jpg"
      alt="Shoes"/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    <h1 className='mt-1'>{Age}</h1>
    <p>{Bio}</p>
    <h3>{Gender}</h3>
    <div className="card-actions justify-center my-2 p-2">
      <button className="btn btn-secondary mx-2">Ignored</button>
      <button className="btn btn-primary mx-2">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
