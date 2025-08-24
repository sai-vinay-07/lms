import { createContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration"; // make sure you have this installed

export const AddContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const { userId, isSignedIn } = useAuth();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Fetch all courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  // Check if a course is enrolled
  const isEnrolled = (courseId) => {
    return enrolledCourses.some((course) => course._id === courseId);
  };

  // Calculate average rating for a course
  const calculateRating = (course) => {
    if (!course?.courseRatings?.length) return 0;
    let totalRating = course.courseRatings.reduce(
      (sum, rating) => sum + (rating.rating || 0),
      0
    );
    return totalRating / course.courseRatings.length;
  };

  // Calculate total time for a single chapter
  const calculateChapterTime = (chapter) => {
    if (!chapter?.chapterContent?.length) return "0m";
    let time = chapter.chapterContent.reduce(
      (sum, lecture) => sum + (lecture.lectureDuration || 0),
      0
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"], round: true });
  };

  // Calculate total course duration
  const calculateCourseDuration = (course) => {
    if (!course?.courseContent?.length) return "0m";
    let time = course.courseContent.reduce((sum, chapter) => {
      return (
        sum +
        chapter.chapterContent.reduce(
          (chapterSum, lecture) => chapterSum + (lecture.lectureDuration || 0),
          0
        )
      );
    }, 0);
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"], round: true });
  };

  // Calculate total number of lectures in a course
  const calculateNoofLectures = (course) => {
    if (!course?.courseContent?.length) return 0;
    return course.courseContent.reduce(
      (total, chapter) => total + (chapter.chapterContent?.length || 0),
      0
    );
  };

  // Fetch user enrolled courses
  const fetchUserEnrolledCourses = async () => {
    if (!userId || !isSignedIn) {
      setEnrolledCourses([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/enrolled-courses`);
      if (response.ok) {
        const courses = await response.json();
        setEnrolledCourses(courses);
      } else {
        console.error("Failed to fetch enrolled courses");
        setEnrolledCourses(dummyCourses);
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      setEnrolledCourses(dummyCourses);
    }
  };

  // Load all courses and enrolled courses on mount
  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, [userId, isSignedIn]);

  const value = {
    currency,
    allCourses,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoofLectures,
    enrolledCourses,
    fetchUserEnrolledCourses,
    isEnrolled, // ✅ added to context
  };

  return (
    <AddContext.Provider value={value}>
      {props.children}
    </AddContext.Provider>
  );
};
