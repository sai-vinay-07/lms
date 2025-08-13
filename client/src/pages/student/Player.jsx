import React, { useEffect, useState, useContext } from 'react';
import { AddContext } from '../../context/AddContext';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';

const Player = () => {
  const { enrolledCourses, calculateChapterTime, markLectureComplete } = useContext(AddContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState(null);

  const getCourseData = () => {
    const course = enrolledCourses.find((c) => c._id === courseId);
    if (course) {
      setCourseData(course);
    }
  };

  useEffect(() => {
    getCourseData();
  }, [courseId, enrolledCourses]);

  const toggleSection = (index) => {
    setOpenSection((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getVideoIdFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    return parts.pop();
  };

  return (
    <>
    <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
      {/* Course Structure */}
      <div className="pt-8 text-gray-800">
        <h2 className="text-xl font-semibold">Course Structure</h2>
        <div className="pt-5">
          {courseData &&
            courseData.courseContent.map((chapter, index) => (
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
                      className={`transition-transform duration-300 ${
                        openSection[index] ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                    <p className="font-medium md:text-base text-sm">
                      {chapter.chapterTitle}
                    </p>
                  </div>
                  <p className="text-sm md:text-default">
                    {chapter.chapterContent.length} Lectures -{' '}
                    {calculateChapterTime(chapter)}
                  </p>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSection[index] ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <ul className="list-disc md:pl-10 pl-4 pr-2 text-gray-600 border-t border-gray-300">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className="flex items-center gap-2 py-1">
                        <img
                          src={
                            lecture.completed
                              ? assets.blue_tick_icon
                              : assets.play_icon
                          }
                          className="w-4 h-4 mt-1"
                          alt="play-icon"
                        />
                        <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                          <p>{lecture.lectureTitle}</p>
                          <div className="flex gap-2">
                            {lecture?.lectureUrl && (
                              <p
                                className="text-blue-500 cursor-pointer"
                                onClick={() =>
                                  setPlayerData({
                                    videoId: getVideoIdFromUrl(
                                      lecture.lectureUrl
                                    ),
                                    chapter: index + 1,
                                    lecture: i + 1,
                                    lectureTitle: lecture.lectureTitle,
                                    chapterIndex: index,
                                    lectureIndex: i,
                                  })
                                }
                              >
                                Watch
                              </p>
                            )}
                            <p>
                              {humanizeDuration(
                                (lecture.lectureDuration || 0) * 60 * 1000,
                                { units: ['h', 'm'] }
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
        <Rating/>
      </div>

      {/* Right column */}
      <div>
        {playerData?.videoId ? (
          <YouTube
            videoId={playerData.videoId}
            opts={{
              playerVars: {
                autoplay: 1,
                fs: 1,
              },
            }}
            iframeClassName="w-full aspect-video"
            onReady={(event) => event.target.playVideo()}
          />
        ) : (
          courseData && (
            <img
              src={courseData.courseThumbnail}
              alt="course thumbnail"
              className="w-full h-auto object-cover"
            />
          )
        )}
      

      {/* Lecture info & complete button */}
      {playerData && (
        <div className="flex justify-between items-center mt-6">
          <p className='text-xl sm:text-base'>
            {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
          </p>
          <button
            className="text-blue-600"
            onClick={() =>
              markLectureComplete(courseId, playerData.chapterIndex, playerData.lectureIndex)
            }
          >
            {courseData?.courseContent[playerData.chapterIndex]?.chapterContent[
              playerData.lectureIndex
            ]?.completed
              ? 'Completed'
              : 'Mark Complete'}
          </button>
        </div>
      )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Player;
