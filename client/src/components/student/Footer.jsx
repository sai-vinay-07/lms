import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='w-full bg-black/90 text-gray-100 px-15 py-10'>
        <div className='flex  justify-between'>
            <div className=' w-100'>
                <img src={assets.logo_dark} alt="logo" className='w-30'/>
                <p className='text-gray-200 text-left leading-relaxed font-[200] py-7 text-[15px] '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
            </div>
            <div>
                <h4 className='text-middle text-xl'>Company</h4>
                <ul className='text-gray-200 text-middle leading-relaxed font-[200] py-7 text-[15px] '>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            <div className='text-xl'>
                <h5>Subscribe to our newsletter</h5>
                <p className='text-gray-200 text-middle leading-relaxed font-[200] py-7 text-[15px]'>The latest news, articles, and resources, sent to your inbox weekly.</p>
                  <div>
                    <input type="text" name="" id="" placeholder='Enter your email ' />
                    <button>Subscribe</button>
                  </div>
            </div>
        </div>
        <hr />
        <div>
          <p>Copyright 2024 © Edemy. All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer