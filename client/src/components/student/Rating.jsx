import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    // If first star clicked and already selected → clear rating
    if (value === 1 && rating === 1) {
      setRating(0);
    } else {
      setRating(value);
    }
  };

  return (
    <div className="flex items-center gap-3 p-6">
      <h1 className="text-lg font-semibold">Rate This Course:</h1>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={20}
            className={`cursor-pointer transition-transform duration-150 ${
              star <= rating ? 'scale-110' : 'scale-100'
            }`}
            color={star <= rating ? 'gold' : 'gray'}
            onClick={() => handleStarClick(star)}
          />
        ))}
      </div>
    </div>
  );
};

export default Rating;
