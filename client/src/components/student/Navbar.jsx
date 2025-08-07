import React, { useContext } from 'react';
import { AddContext } from '../../context/AddContext'

import { assets } from '../../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const location = useLocation();
  const isCoursePage = location.pathname.includes('/course-list');

  const { openSignIn } = useClerk();
  const { user } = useUser();

  const navigate = useNavigate()

  const {isEducator} = useContext(AddContext);

  const directToHome = ()=>{
    navigate('/')
  }

  return (
    <div
      className={`flex justify-between items-center flex-wrap px-4 sm:px-6 md:px-14 lg:px-36 border-b border-gray-500 py-3 ${
        isCoursePage ? 'bg-white' : 'bg-cyan-100/70'
      }`}
    >
      {/* Logo */}
      <img
         onClick={directToHome}
        src={assets.logo}
        alt="logo"
        className="w-24 sm:w-28 lg:w-32 cursor-pointer"
      />

      {/* Desktop View */}
      <div className="hidden md:flex items-center gap-5 text-gray-500 text-base">
        {user && (
          <>
            <button onClick={()=>{navigate('/educator')}} className="hover:text-black">{ isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
            <span>|</span>
            <Link to="/my-enrollments" className="hover:text-black">
              My Enrollments
            </Link>
          </>
        )}
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 text-sm"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden items-center gap-2 sm:gap-4 text-gray-500 text-[12px] sm:text-sm flex-wrap mt-2 sm:mt-0">
        {user && (
          <>
           <button onClick={()=>{navigate('/educator')}} className="hover:text-black">{ isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
            <span className="mx-1">|</span>
            <Link to="/my-enrollments" className="hover:text-black">
              My Enrollments
            </Link>
          </>
        )}
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img
              src={assets.user_icon}
              alt="user"
              className="w-6 h-6 sm:w-7 sm:h-7"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
