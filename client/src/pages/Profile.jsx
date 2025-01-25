import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
     const {currentUser, loading , error} = useSelector((state) =>state.user.user)
     const [formData, setformData] = useState({});
     const [updateSuccess, setUpdateSuccess] = useState(false);
     const handleChange=(e)=>{
       setformData({...formData , [e.target.id]:e.target.value});
     }
     const handleSubmit= async(e)=>{
       e.preventDefault();
       try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify(formData),
        });
           const data = await res.json();
       if (data.success===false) {
        dispatch(updateUserFailure(data.message));
        return;
       }
       dispatch(deleteUserSuccess(data));
       setUpdateSuccess(true);
       } catch (error) {
           dispatch(updateUserFailure(error.message));
       }

     }
     const handleDeleteUser =async()=>{
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`,{ 
          method:'DELETE',
        });
        const data= await res.json();
        if(data.success ===false){
          dispatch(deleteUserFailure(error.message));
          return;
        };
        dispatch(deleteUserSuccess(data));
        
      } catch (error) {
        dispatch(deleteUserFailure(error.message))
        
      }

     }
  return (
    <div className=' p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center'>Profile</h1>
      <form  onSubmit={handleSubmit} className='flex flex-col gap-5' >
        <input type="file"  ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={currentUser.avatar} className='rounded-full h-24 w-24 object-cover curser-pointer self-center mt-2' alt="profile" />
        <input type="text" defaultValue={currentUser.username}  onChange={handleChange} placeholder='username' className='border p-3 rounded-lg' id='username' />
        <input type="text" defaultValue={currentUser.email} onChange={handleChange} placeholder='email' className='border p-3 rounded-lg' id='email' />
        <input type="password" onChange={handleChange} placeholder='password' className='border p-3 rounded-lg' id='password' />
        <button  disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'> {loading ?'Loading...':'UPDATE'}</button>
      </form>
       <div className='flex justify-between mt-5 mx-2'> 
        <span className='text-red-700 cursor-pointer ' onClick={handleDeleteUser}>Delete Account</span>
        <span className='text-red-700 cursor-pointer '>sign-out </span>
       </div>
        <p>{error ? error : ''}</p>
        <p className='text-green-600 font-bold text-2xl'>{updateSuccess ? 'user is updated successfully' : ''}</p>
       
    </div>
  )
}

export default Profile