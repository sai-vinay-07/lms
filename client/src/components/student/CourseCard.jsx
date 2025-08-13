import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { AddContext } from '../../context/AddContext'  // Adjust path as needed

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AddContext);

  const rating = calculateRating(course);
  
  // Handle case where course.educator might be a string ID instead of object
  const educatorName = typeof course.educator === 'object' 
    ? course.educator.name 
    : 'Educator';

  return (
    <Link
      to={'/course/' + course._id}
      onClick={() => scrollTo(0, 0)}
      className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg block hover:shadow-lg transition-shadow duration-300"
    >
      <img 
        className="w-full h-48 object-cover" 
        src={course.courseThumbnail} 
        alt={course.courseTitle} 
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x200?text=Course+Image';
        }}
      />
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold line-clamp-2">{course.courseTitle}</h3>
        <p className="text-gray-500 text-sm">{educatorName}</p>
        <div className="flex items-center space-x-2 mt-2">
          <p className="text-sm font-medium">{rating.toFixed(1)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                alt="star"
                className="w-3.5 h-3.5"
              />
            ))}
          </div>
          <p className="text-gray-500 text-sm">({course.courseRatings?.length || 0})</p>
        </div>
        <p className="text-base font-semibold text-gray-800 mt-2">
          {currency}
          {(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
