import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'

function Profile() {
  const fileRef = useRef(null);
     const {currentUser } = useSelector((state) =>state.user.user)
     const [formData, setformData] = useState({});
  return (
    <div className=' p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center'>Profile</h1>
      <form className='flex flex-col gap-5' >
        <input type="file"  ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={currentUser.avatar} className='rounded-full h-24 w-24 object-cover curser-pointer self-center mt-2' alt="profile" />
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' />
        <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' />
        <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password' />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'> Update</button>
      </form>
       <div className='flex justify-between mt-5 mx-2'> 
        <span className='text-red-700 cursor-pointer '>Delete Account</span>
        <span className='text-red-700 cursor-pointer '>sign-out </span>
       </div>
    </div>
  )
}

export default Profile