import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'

const SearchBar = ({data}) => {
    const navigate = useNavigate();
    const [input, setInput] = useState(data ? data : '');
    const onSearchHandle = (e) => {
        e.preventDefault();
        navigate('/course-list/'+input);
    }
  return (
    <div className="flex justify-center w-full pt-8 pb-4 px-4">
      <form
        className="flex items-center w-full max-w-xl rounded-lg border border-gray-300 bg-white/70
                   focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500
                   transition duration-200 ease-in-out" onSubmit={onSearchHandle}
      >
        {/* Search Icon */}
        <span className="pl-3 pr-2 text-gray-400">
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-5 h-5"
          />
        </span>
        {/* Input */}
        <input
          type="text"
          onChange={(e)=> setInput(e.target.value)}
          value={input}
          placeholder="Search for courses"
          className="flex-grow bg-transparent focus:outline-none px-2 py-3 text-gray-700 text-base placeholder-gray-400"
        />
        {/* Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-medium px-6 py-2 rounded-lg m-1"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchBar
