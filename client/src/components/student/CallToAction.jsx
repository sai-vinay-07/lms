import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div className='py-4 px-auto '>
      <h1 className='text-4xl font-semibold text-gray-800 '>Learn anything, anytime, anywhere</h1>
      <p className='text-base text-gray-700/100 py-3'>Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam <br /> aliqua proident excepteur commodo do ea.</p>
      <div className='flex  justify-center gap-10 py-7'>
       <Link to={'/course-list'}><button className='px-7 py-2 bg-blue-500 text-white  rounded '>Get Started</button></Link>
        <button className='flex  text-base gap-2 items-center justify-center'>Learn more <img className='w-3' src={assets.arrow_icon} alt="" /></button>
      </div>
    </div>
  )
}

export default CallToAction