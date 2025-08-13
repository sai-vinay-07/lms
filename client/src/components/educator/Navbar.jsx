import React from 'react';
import { assets, dummyEducatorData } from '../../assets/assets';
import { UserButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const educatorData = dummyEducatorData;
  const { user } = useUser();

  const directToHome = () => {
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between px-8 sm:px-8 h-15 bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Left side - Logo */}
      <img
        onClick={directToHome}
        src={assets.logo}
        alt="logo"
        className="w-24 sm:w-28 lg:w-32 cursor-pointer "
      />

      {/* Right side - User Info */}
      <div className="flex items-center gap-4">
        <p className="text-gray-700 text-base">
          <span className="text-gray-500 font-medium ">Hi , </span>{'  '}
          <span className="text-gray-600 font-semibold">
            {user ? user.fullName : 'Guest'}
          </span>
        </p>
        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <img
            src={assets.profile_img}
            alt="profile"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 object-cover cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
