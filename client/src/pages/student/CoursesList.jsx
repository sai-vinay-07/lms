import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AddContext } from '../../context/AddContext'
import SearchBar from '../../components/student/SearchBar'
import CourseCard from '../../components/student/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../components/student/Footer'

const CoursesList = () => {
  const navigate = useNavigate()
  const { allCourses } = useContext(AddContext)
  const { input } = useParams()
  const [filterCourse, setFilterCourse] = useState([])

  useEffect(() => {
    if (Array.isArray(allCourses) && allCourses.length > 0) {
      let tempCourses = [...allCourses]

      if (input) {
        tempCourses = tempCourses.filter(item =>
          item.courseTitle?.toLowerCase().includes(input.toLowerCase()) ||
          item.courseDescription?.toLowerCase().includes(input.toLowerCase())
        )
      }

      setFilterCourse(tempCourses)
    } else {
      setFilterCourse(allCourses || [])
    }
  }, [allCourses, input])

  const handleCourseList = () => {
    navigate('/course-list')
  }

  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pt-15 gap-4 px-4">
          <div className="flex-shrink-0">
            <h1 className="text-4xl font-semibold pb-1">Course List</h1>
            <p className="text-gray-500 text-sm">
              <span
                className="text-blue-600 cursor-pointer"
                onClick={handleNavigate}
              >
                Home
              </span>
              <span> / Course List</span>
            </p>
          </div>

          <div className="w-full lg:w-[500px]">
            <SearchBar data={input} />
          </div>
        </div>

        {/* Search Filter Tag */}
        {input && (
          <div className="flex items-center gap-2 my-4 px-4 py-2 border border-gray-300 rounded bg-gray-100/10 w-fit">
            <p className="text-sm font-medium">{input}</p>
            <img
              src={assets.cross_icon}
              alt="cross-icon"
              onClick={handleCourseList}
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
            />
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 md:p-0">
          {filterCourse.length > 0 ? (
            filterCourse.map((course, index) => (
              <CourseCard key={course._id || index} course={course} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">
                No courses found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default CoursesList
