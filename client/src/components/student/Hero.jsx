import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full md: pt-20 px-7 md:px-0 space-y-7 bg-gradient-to-b from-cyan-100/70">
      <h1
        className="
          font-bold text-gray-800 max-w-4xl mx-auto relative
          text-[30px] leading-[36px]       /* Mobile */
          md:text-[30px] md:leading-[36px] /* Tablet/medium, same as mobile or adjust */
          lg:text-[55px] lg:leading-[58px] /* Laptop and up */
        "
      >
        Empower your future with the courses designed to
        <span className="text-blue-600"> fit your choice.</span>
        <img
          src={assets.sketch}
          alt="sketch"
          className="md:block hidden absolute -bottom-7 right-0"
        />
      </h1>

      <p
        className="
          text-[20px] leading-[24px] text-gray-500 max-w-sm mx-auto
          md:max-w-2xl
          md:text-[15px] md:leading-[24px]
        "
      >
        We bring together world-class instructors, interactive content, and a supportive
        community to help you achieve your personal and professional goals.
      </p>
      <SearchBar />
    </div>
  )
}

export default Hero
