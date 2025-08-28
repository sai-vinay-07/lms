import { createContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration"; 
import { nanoid } from "nanoid"; // ✅ browser-safe replacement

export const AddContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"; // ✅ env-driven API base

  const { userId, isSignedIn } = useAuth();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // ✅ Fetch all courses
  const fetchAllCourses = async () => {
    // TODO: Replace dummyCourses with API call if backend is ready
    setAllCourses(dummyCourses);
  };

  // ✅ Check if a course is enrolled
  const isEnrolled = (courseId) => {
    return enrolledCourses.some((course) => course._id === courseId);
  };

  // ✅ Calculate average rating
  const calculateRating = (course) => {
    if (!course?.courseRatings?.length) return 0;
    let totalRating = course.courseRatings.reduce(
      (sum, rating) => sum + (rating.rating || 0),
      0
    );
    return totalRating / course.courseRatings.length;
  };

  // ✅ Calculate total time for a single chapter
  const calculateChapterTime = (chapter) => {
    if (!chapter?.chapterContent?.length) return "0m";
    let time = chapter.chapterContent.reduce(
      (sum, lecture) => sum + (lecture.lectureDuration || 0),
      0
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"], round: true });
  };

  // ✅ Calculate total course duration
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

  // ✅ Calculate number of lectures in a course
  const calculateNoofLectures = (course) => {
    if (!course?.courseContent?.length) return 0;
    return course.courseContent.reduce(
      (total, chapter) => total + (chapter.chapterContent?.length || 0),
      0
    );
  };

  // ✅ Fetch user enrolled courses
  const fetchUserEnrolledCourses = async () => {
    if (!userId || !isSignedIn) {
      setEnrolledCourses([]);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/users/${userId}/enrolled-courses`);
      if (response.ok) {
        const courses = await response.json();
        setEnrolledCourses(courses);
      } else {
        console.error("❌ Failed to fetch enrolled courses");
        setEnrolledCourses(dummyCourses); // fallback
      }
    } catch (error) {
      console.error("❌ Error fetching enrolled courses:", error);
      setEnrolledCourses(dummyCourses); // fallback
    }
  };

  // ✅ Load courses on mount and when auth changes
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
    isEnrolled,
    generateId: nanoid, // ✅ safe unique id generator
  };

  return (
    <AddContext.Provider value={value}>
      {props.children}
    </AddContext.Provider>
  );
};
