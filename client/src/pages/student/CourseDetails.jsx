import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddContext } from "../../context/AddContext";
import { assets } from "../../assets/assets";
import Loading from "../../components/student/Loading";
import Youtube from "react-youtube"
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";

const CourseDetails = () => {
  const { id } = useParams();
  const [openSection, setOpenSection] = useState({});
  const [courseData, setCourseData] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoofLectures,
    currency,
  } = useContext(AddContext);

  useEffect(() => {
    const findCourse = allCourses?.find((course) => course._id === id);
    setCourseData(findCourse || null);
  }, [id, allCourses]);

  if (!courseData) return <Loading />;

  const rating = calculateRating(courseData);
  const safeDescription = (courseData.courseDescription || "").replace(
    /<[^>]+>/g,
    ""
  );

  const toggleSection = (index) => {
    setOpenSection((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="relative">
      {/* Background gradient */}
      <div
        className="absolute top-0 left-0 w-full h-[300px] z-0 bg-gradient-to-b from-cyan-100/70 to-transparent"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col-reverse lg:flex-row gap-10 items-start justify-between 
                      lg:px-20 md:px-12 sm:px-6 px-4 
                      lg:pt-32 md:pt-28 pt-20 text-left">

        {/* Left Column */}
        <div className="w-full lg:max-w-2xl text-gray-700">
          <h1 className="sm:text-[38px] text-[22px] font-bold text-gray-800">
            {courseData.courseTitle}
          </h1>

          <p className="pt-2 md:text-base text-sm">
            {safeDescription.slice(0, 200)}...
          </p>

          {/* Rating */}
          <div className="flex flex-wrap items-center gap-x-3 mt-3 mb-1 text-base">
            <p className="font-medium">{rating.toFixed(1)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                  alt="star"
                  className="w-4 h-4"
                />
              ))}
            </div>
            <p className="text-blue-600">
              ( {courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length === 1 ? "rating" : "ratings"} )
            </p>
            <p className="text-gray-500">
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length === 1
                ? "student"
                : "students"}
            </p>
          </div>

          <p>
            Course by{" "}
            <span className="text-blue-600 underline">Great Stack</span>
          </p>

          {/* Course Structure */}
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div
                    onClick={() => toggleSection(index)}
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={assets.down_arrow_icon}
                        alt="arrow-icon"
                        className={`transition-transform duration-300 ${openSection[index] ? "rotate-180" : "rotate-0"
                          }`}
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-default">
                      {chapter.chapterContent.length} Lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${openSection[index] ? "max-h-96" : "max-h-0"
                      }`}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-center gap-2 py-1">
                          <img
                            src={assets.play_icon}
                            className="w-4 h-4 mt-1"
                            alt="play-icon"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p className="text-blue-500 cursor-pointer" onClick={() => setPlayerData({
                                  videoId: lecture.lectureUrl.split('/').pop()
                                })}>
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="py-20 text-sm md:text-default">
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>
            <p
              className="pt-3 rich-text"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>

        {/* Right Column */}
        <div
          className="w-full sm:max-w-[520px] md:max-w-[520px] lg:max-w-[424px] 
             bg-white overflow-hidden rounded-lg shadow-lg 
             border border-gray-100 z-10 mx-auto md:mx-0"
        >
          {playerData ? (
            <Youtube
              videoId={playerData.videoId}
              opts={{
                playerVars: {
                  autoplay: 1,
                  fs: 1, // enable fullscreen button
                },
              }}
              iframeClassName="w-full aspect-video"
              onReady={(event) => event.target.playVideo()}
            />
          ) : (<img
            src={courseData.courseThumbnail}
            alt="course thumbnail"
            className="w-full h-auto object-cover"
          />

          )}

          <div className="p-5">
            <div className="flex items-center gap-2">
              <img
                className="w-3.5"
                src={assets.time_left_clock_icon}
                alt="time_left_clock_icon"
              />
              <p>
                <span className="text-red-500">5</span> days left at this price
              </p>
            </div>

            <div className="flex gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="md:text-lg text-gray-500 line-through">
                {currency}
                {courseData.coursePrice}
              </p>
              <p className="md:text-lg text-gray-500">
                {courseData.discount} % off
              </p>
            </div>

            {/* Info Row */}
            <div className="flex flex-wrap items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star icon" />
                <p>{calculateRating(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>

              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="clock icon" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>

              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="lesson icon" />
                <p>{calculateNoofLectures(courseData)} lessons</p>
              </div>
            </div>

            {/* Enroll button */}
            <button className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            {/* What's in the course */}
            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium text-gray-800">
                What's in the course?
              </p>
              <ul className="ml-4 pt-4 text-sm md:text-default list-disc text-gray-500">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
                <li>Quizzes to test your knowledge.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetails;
