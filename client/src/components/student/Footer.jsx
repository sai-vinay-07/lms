import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className="w-full bg-[#0f172a] text-gray-200 px-4 py-8 sm:px-6 md:px-12 lg:px-16 md:py-10">
      
      {/* MOBILE & TABLET ≤1024px */}
      <div className="block lg:hidden text-center">
        {/* Logo */}
        <img
          src={assets.logo_dark}
          alt="logo"
          className="w-28 mx-auto mb-4"
        />
        {/* Description */}
        <p className="text-sm leading-relaxed max-w-md mx-auto">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text.
        </p>

        {/* Company */}
        <h4 className="text-base font-semibold mt-6">Company</h4>
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm">
          <span className="cursor-pointer hover:text-blue-400">Home</span>
          <span className="cursor-pointer hover:text-blue-400">About us</span>
          <span className="cursor-pointer hover:text-blue-400">Contact us</span>
          <span className="cursor-pointer hover:text-blue-400">Privacy policy</span>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700" />

        {/* Copyright */}
        <p className="text-sm text-gray-400 font-light">
          © 2025 Edemy — All Rights Reserved.
        </p>
      </div>

      {/* DESKTOP >1024px */}
      <div className="hidden lg:flex lg:flex-col gap-8">
        <div className="flex flex-row justify-between gap-8 text-center lg:text-left">
          {/* Logo & Description */}
          <div className="lg:w-1/3">
            <img
              src={assets.logo_dark}
              alt="logo"
              className="w-28 sm:w-32 md:w-36 mx-auto lg:mx-0"
            />
            <p className="leading-relaxed font-light py-4 md:py-7 text-sm sm:text-base">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg md:text-xl font-semibold mb-2">Company</h4>
            <ul className="font-light space-y-2 text-sm sm:text-base">
              <li className="hover:text-blue-400 cursor-pointer">Home</li>
              <li className="hover:text-blue-400 cursor-pointer">About</li>
              <li className="hover:text-blue-400 cursor-pointer">Contact Us</li>
              <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:w-1/3">
            <h5 className="text-base md:text-lg font-semibold">
              Subscribe to our newsletter
            </h5>
            <p className="leading-relaxed font-light py-2 md:py-4 text-sm sm:text-base">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
              <input
                className="bg-blue-400/10 text-sm sm:text-base py-2 px-3 rounded border border-blue-400/50 w-full sm:flex-1"
                type="text"
                placeholder="Enter your email"
              />
              <button className="w-full sm:w-auto px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider & Copyright for Desktop */}
        <hr className="border-gray-700" />
        <p className="text-base text-gray-400 font-light text-center">
          © 2025 Edemy — All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
