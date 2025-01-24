import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
  const handleChange=(e)=>{
    setFormData({
        ...formData,
        [e.target.id]:e.target.value,
    });     
  }
  const handleSubmit= async(e)=>{
      e.preventDefault();

      try {
        setLoading(true);
        const res = await fetch('/api/auth/signup',
        {
          method:"POST",
          headers: {
            'Content-Type': "application/json",
          },
          body:JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
       setLoading(false);
       setError(null);
       navigate('/sign-in')
       
      } 
      catch (error) {
        setLoading(false);
        setError(error.message);
        
      }
    }
  return (
    <div className='bg-[--lightgreen] p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 '>SignUp</h1>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4 '>
<input type="text" placeholder='username'  className='border p-3 rounded-lg ' id='username'  onChange={handleChange} />
<input type="email" placeholder='email'  className='border p-3 rounded-lg ' id='email' onChange={handleChange}/>
<input type="password" placeholder='password' className='border p-3 rounded-lg ' id='password' onChange={handleChange}/>
      <button  disabled={loading} className='bg-[--yellow] p-3 rounded-lg uppercase hover:opacity-95 '>
        {loading?'LOADING...':'Sign-Up'}
       </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account? 
     <Link to={"/sign-in"}>
        <span className='text-red-800 font-bold ml-2'>Sign in</span>
        </Link>
      </p>

       {error && <p className='text-red-700 mt-5'> {error}</p>}
      </div>
    </div>
  )
}

export default SignUp