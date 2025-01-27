import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({listing}) => {
    const [landlord, setLandlord] = useState();
    const [message, setMessage] = useState('');
    const handleChange=(e)=>{
        setMessage(e.target.value);
    }
    useEffect(() => {
      const fetchLandlord = async ()=>{
        try{
          const res =await fetch(`/api/user/${listing.userRef}`);
          const data =await res.json();
          setLandlord(data);
        }
        catch (error){
            console.log(error);
        }
        

      }
    
      fetchLandlord();
    }, [listing.userRef])
    
  return (
  <>
  {landlord && (
    <div className=" flex flex-col gap-3"
    >
        <p className='text-2xl '>Contact: <span className='text-gray-800 font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
   <textarea className='w-full border border-gray-700 rounded-lg ' name="message" id="message" rows="2" value={message} onChange={handleChange} placeholder='Enter Your Message Here'></textarea>
   <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-slate-700 text-white text-center p-3 uppercase hover:opacity-85'>
   
   Send Message
   
   </Link>
    </div>
    
  )}
  
  
  </>
  )
}

export default Contact