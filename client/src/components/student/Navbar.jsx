import React, { useContext, useState } from 'react';
import { AddContext } from '../../context/AddContext';
import { assets } from '../../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isCoursePage = location.pathname.includes('/course-list');

  const { openSignIn } = useClerk();
  const { user } = useUser();

  const navigate = useNavigate();
  const { isEducator } = useContext(AddContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const directToHome = () => {
    navigate('/');
  };

  return (
    <div
      className={`flex justify-between items-center px-4 sm:px-6 md:px-14 lg:px-36 border-b border-gray-500 py-3 relative ${
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
            <button
              onClick={() => {
                navigate('/educator');
              }}
              className="hover:text-black"
            >
              {isEducator ? 'Educator Dashboard' : 'Become Educator'}
            </button>
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
      <div className="flex md:hidden items-center gap-3">
        {user ? (
          <>
            {/* Hamburger menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md "
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <UserButton />
          </>
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

      {/* Mobile Dropdown Menu */}
      {menuOpen && user && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg w-56 p-4 z-50 md:hidden">
          <button
            onClick={() => {
              navigate('/educator');
              setMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-3 rounded-lg  text-gray-600 font-medium hover:bg-gray-100 transition"
          >
            {isEducator ? 'Educator Dashboard' : 'Become Educator'}
          </button>
          <Link
            to="/my-enrollments"
            onClick={() => setMenuOpen(false)}
            className="block w-full mt-3 px-4 py-3 rounded-lg  text-gray-600 font-medium hover:bg-gray-100 transition"
          >
            My Enrollments
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
