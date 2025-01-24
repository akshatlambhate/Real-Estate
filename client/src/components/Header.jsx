import React from 'react'
import logo from '../assets/logo.png'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const {currentUser} = useSelector(state =>state.user.user);
  return (
    <header className='flex h-32 gap-10 justify-evenly border items-center'>
        <div className=" logo h-10 w-10">
            <Link to='/'>
            <img className='w-32 h-32 absolute top-0' src={logo} alt="" />
            </Link>
        </div>
        <div className="search">
            <form action="" className='  border border-gray-700  rounded-lg ' >
                <input className=' w-24 sm:w-64 h-10 rounded-3xl placeholder: ml-5 focus:outline-none' type="text" placeholder='Search...'/>
                <SearchIcon className='mr-5'/>
            </form>

        </div>
        <div className="menu">
            <ul className='flex gap-8 font-semibold '>
                <li><Link to='/'>HOME</Link></li>
                <li><Link to='/about'>ABOUT</Link></li>
              <Link to='/profile'>
             { currentUser ?(<img className='rounded-full h-10 w-10 object-cover' src={currentUser.avatar} alt='profile'/>
             ):(
                <li>SIGN-IN</li>
             )
             }
          </Link>
 

            </ul>
        </div>
    </header>
  )
}

export default Header