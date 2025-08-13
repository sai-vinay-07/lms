import React from 'react';
import { assets } from '../../assets/assets';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        
        {/* Left - Logo */}
        <div className="flex items-center">
          <img
            src={assets.logo}
            alt="logo"
            className="w-20 cursor-pointer"
          />
        </div>

        {/* Center - Text */}
        <div className="text-xs md:text-sm text-gray-500 text-center">
          © 2025 <span className="font-medium text-gray-700">Vinay</span>. All Rights Reserved.
        </div>

        {/* Right - Social Icons */}
        <div className="flex items-center gap-4 text-gray-500">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
            <FaFacebookF size={18} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors">
            <FaInstagram size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors">
            <FaLinkedinIn size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
