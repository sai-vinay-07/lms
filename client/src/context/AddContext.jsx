import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";

export const AddContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator,setIsEducator] = useState(true)

  // Fetch all courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  const  calculateRating = (course) => {
    if(course.courseRatings.length === 0 ){
        return 0;
    }
    let totalRating = 0 
    course.courseRatings.forEach(rating => {
        totalRating += rating.rating
    })
    return totalRating / course.courseRatings.length;
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    calculateRating,
    isEducator , setIsEducator

  };

  return (
    <AddContext.Provider value={value}>
      {props.children}
    </AddContext.Provider>
  );
};
