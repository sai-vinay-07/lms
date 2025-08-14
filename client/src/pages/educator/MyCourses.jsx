import React, { useContext, useEffect, useState } from 'react'
import { AddContext } from '../../context/AddContext'
import Loading from '../../components/student/Loading'

const MyCourses = () => {
  const { currency, allCourses } = useContext(AddContext)
  const [courses, setCourses] = useState(null)

  const fetchEducatorCourses = () => {
    if (Array.isArray(allCourses)) {
      setCourses(allCourses)
    } else {
      setCourses([]) // fallback empty array to avoid map errors
    }
  }

  useEffect(() => {
    fetchEducatorCourses()
  }, [allCourses]) // will re-run if allCourses changes

  return courses ? (
    <div className="min-h-screen flex flex-col items-start md:p-8 pt-8">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">My Courses</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-300">
          <table className="table-auto w-full text-sm">
            <thead className="text-gray-900 border-b border-gray-300 bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-left">Course</th>
                <th className="px-4 py-3 font-semibold text-left">Earnings</th>
                <th className="px-4 py-3 font-semibold text-left">Students</th>
                <th className="px-4 py-3 font-semibold text-left">Published On</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {courses.map((course, index) => {
                const priceAfterDiscount =
                  course.coursePrice - (course.discount * course.coursePrice) / 100
                const earnings =
                  course.enrolledStudents.length * priceAfterDiscount

                return (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={course.courseThumbnail}
                        alt="Course"
                        className="w-16  "
                      />
                      <span className="truncate hidden md:block">
                        {course.courseTitle}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {currency} {Math.floor(earnings)}
                    </td>
                    <td className="px-4 py-3">{course.enrolledStudents.length}</td>
                    <td className="px-4 py-3">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default MyCourses
