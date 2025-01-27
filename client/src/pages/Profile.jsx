import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, logOutUserStart, logOutUserSuccess, logOUtUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload =(file)=>{
    const storage = getStorage(app);
     const fileName = new Date().getTime() + file.name;
     const storageRef = ref(storage, fileName);
     const uploadTask = uploadBytesResumable(storageRef,file);

     uploadTask.on('state_changed',(snapshot)=>{
      const progress =(snapshot.bytesTransferred /snapshot.totalBytes)*100;
       setFilePerc(Math.round(progress))
     },
     (error)=>{
      setFileUploadError(true);
     },
     ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) =>{
        setformData({...formData, avatar: downloadURL});
      });
     }
    );

  }
       const [showListingError, setshowListingError] = useState(false);
    
     const {currentUser, loading , error} = useSelector((state) =>state.user.user)

     const [formData, setformData] = useState({});
     const [updateSuccess, setUpdateSuccess] = useState(false);
     const [userListings, setUserListings] = useState([]);
     console.log(formData)
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
     const handleSignOut = async () => {
      try {
        dispatch(logOutUserStart());
        const res = await fetch('/api/auth/signout');
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(data.message));
      }
    };
    const handleShowListings = async()=>{
      try {
        setshowListingError(false);
            const res = await fetch(`/api/user/listings/${currentUser._id}`);
            const data = await res.json();
            if(data.success ===false){
              setshowListingError(true);
              return;
            }
            setUserListings(data);
      } catch (error) {
        setshowListingError(true);
        
      }

    }
    const handleListingDelete =async(listingId)=>{
      try {
        const res = await fetch(`/api/listing/delete/${listingId}`,{ 
          method:'DELETE',
        });
        const data= await res.json();
        if(data.success ===false){
           console.log(data.message)
          return;
        };
        
      } catch (error) {
         console.log(error.message)
      }
            setUserListings((prev)=>prev.filter((listing)=>listing._id!==listingId));
    }
  return (
    <div className=' p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center'>Profile</h1>
      <form  onSubmit={handleSubmit} className='flex flex-col gap-5' >
        <input type="file" onChange={(e)=>{setFile(e.target.files[0])}}  ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar|| currentUser.avatar} className='rounded-full h-24 w-24 object-cover curser-pointer self-center mt-2' alt="profile" />
        <p className='text-sm self-center'>{fileUploadError? (<span className='text-red-700'>Error Image Upload (image must be less than 2 MB)</span>) : filePerc > 0 && filePerc < 100 ? (<span className='text-slate-700'>{`Uploading ${filePerc} %`} </span>) : filePerc ===100 ?(<span className='text-green-700'>Image Uploaded Successfully</span>) : "" }</p>
        <input type="text" defaultValue={currentUser.username}  onChange={handleChange} placeholder='username' className='border p-3 rounded-lg' id='username' />
        <input type="text" defaultValue={currentUser.email} onChange={handleChange} placeholder='email' className='border p-3 rounded-lg' id='email' />
        <input type="password" onChange={handleChange} placeholder='password' className='border p-3 rounded-lg' id='password' />
        <button  disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'> {loading ?'Loading...':'UPDATE'}</button>
        <Link to='/create-listing' className='bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95 text-center'> Create Listing</Link>
      </form>
       <div className='flex justify-between mt-5 mx-2'> 
        <span className='text-red-700 cursor-pointer ' onClick={handleDeleteUser}>Delete Account</span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>sign-out </span>
       </div>
        <p>{error ? error : ''}</p>
        <p className='text-green-600 font-bold text-2xl'>{updateSuccess ? 'user is updated successfully' : ''}</p>
             <button onClick={handleShowListings} className='text-gray-700 w-full '>Show Listings</button>
             <p className='text-red-600 font-bold text-2xl'>{showListingError ? 'Error Showing Listings' : ''}</p>
                  <div  className='felx flex-col gap-4'>
                    <h1 className=" text-center text-3xl font-semibold ">Your Listings</h1>
{userListings && userListings.length >0 && userListings.map((listing)=>(

              <div key={listing._id} className=" border rounded-lg p-3 flex justify-between items-center mt-5">
                <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt="listing cover" className='h-16 w-16 object-contain rounded-lg' />  </Link>
                <Link className='text-slate-500 font-semibold flex-1 hover: underline truncate'> <p to={`/listing/${listing._id}` }>{listing.name}</p> </Link>
                <div className="flex flex-col items-center">
                  <button onClick={()=>{handleListingDelete(listing._id)}} className='text-red-700'>Delete</button>
                    <button className='text-green-700'>edit</button>
                  
                </div>

            
              </div>
             ))}

                  </div>
           
             
    </div>
  )
}

export default Profile