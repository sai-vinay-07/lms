import React, { useContext, useEffect, useState } from "react";
import { AddContext } from "../../context/AddContext";
import { useNavigate } from "react-router-dom";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, fetchUserEnrolledCourses } =
    useContext(AddContext);

  const navigate = useNavigate();

  const handlePlayer = (id) => {
    navigate("/player/" + id);
  };

  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 4, totalLectures: 14 },
    { lectureCompleted: 14, totalLectures: 14 },
    { lectureCompleted: 3, totalLectures: 10 },
    { lectureCompleted: 2, totalLectures: 15 },
    { lectureCompleted: 0, totalLectures: 15 },
    { lectureCompleted: 5, totalLectures: 12 },
    { lectureCompleted: 3, totalLectures: 7 },
    { lectureCompleted: 5, totalLectures: 14 },
    { lectureCompleted: 3, totalLectures: 7 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 1, totalLectures: 7 },
    { lectureCompleted: 0, totalLectures: 3 },
    { lectureCompleted: 7, totalLectures: 13 },
    { lectureCompleted: 9, totalLectures: 9 },
    { lectureCompleted: 5, totalLectures: 6 },
    { lectureCompleted: 10, totalLectures: 10 },
    { lectureCompleted: 6, totalLectures: 13 },
    { lectureCompleted: 0, totalLectures: 3 },
    { lectureCompleted: 8, totalLectures: 9 },
    { lectureCompleted: 3, totalLectures: 3 },
  ]);

  useEffect(() => {
    fetchUserEnrolledCourses();
  }, []);

  return (
    <>
    <div className="md:px-36 px-8 pt-10">
      <h1 className="text-2xl font-semibold">My Enrollments</h1>

      <table className="md:table-auto table-fixed w-full overflow-hidden mt-10">
        <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
          <tr>
            <td className="px-4 py-3 font-semibold truncate">Course</td>
            <td className="px-4 py-3 font-semibold truncate">Duration</td>
            <td className="px-4 py-3 font-semibold truncate">Completed</td>
            <td className="px-4 py-3 font-semibold truncate">Status</td>
          </tr>
        </thead>

        <tbody>
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course, index) => {
              const progress =
                progressArray[index] &&
                (progressArray[index].lectureCompleted /
                  progressArray[index].totalLectures) *
                  100;

              return (
                <tr key={index}>
                  <td className="flex items-center gap-3 px-4 py-3">
                    <img
                      src={course.courseThumbnail}
                      alt={course.courseTitle}
                      className="w-14 sm:w-24 md:w-28"
                    />
                    <div>
                      <p className="pb-1">{course.courseTitle}</p>
                      {progressArray[index] && (
                        <Line
                          percent={progress}
                          strokeWidth={2}
                          strokeColor="#2563eb"
                          trailColor="#e5e7eb"
                          className="rounded-full bg-gray-300"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">
                    {calculateCourseDuration(course)}
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">
                    {progressArray[index] &&
                      `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures} Lectures`}
                  </td>
                  <td className="px-4 py-3 max-sm:text-right">
                    <button
                      className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white"
                      onClick={() => handlePlayer(course._id)}
                    >
                      {progressArray[index] &&
                      progressArray[index].lectureCompleted /
                        progressArray[index].totalLectures ===
                        1
                        ? "Completed"
                        : "On Going"}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-6 text-gray-500">
                No enrolled courses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <Footer/>
    </>
  );
};

export default MyEnrollments;
