import React, { useState, useMemo } from "react";
import uniqid from "uniqid";
import { assets } from "../../assets/assets";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseHeadings, setCourseHeadings] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  // Quill toolbar + formats
  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        ["clean"],
      ],
    }),
    []
  );

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "video",
  ];

  const handleAddChapter = () => {
    setChapters((prev) => [
      ...prev,
      {
        id: uniqid(),
        chapterTitle: `Chapter ${prev.length + 1}`,
        collapsed: false,
        chapterContent: [],
      },
    ]);
  };

  const toggleChapterCollapse = (id) => {
    setChapters((prev) =>
      prev.map((ch) => (ch.id === id ? { ...ch, collapsed: !ch.collapsed } : ch))
    );
  };

  const removeChapter = (id) => {
    setChapters((prev) => prev.filter((ch) => ch.id !== id));
  };

  const removeLecture = (chapterId, lectureIndex) => {
    setChapters((prev) =>
      prev.map((ch) =>
        ch.id === chapterId
          ? {
              ...ch,
              chapterContent: ch.chapterContent.filter((_, i) => i !== lectureIndex),
            }
          : ch
      )
    );
  };

  const openLecturePopup = (chapterId) => {
    setCurrentChapterId(chapterId);
    setShowPopup(true);
  };

  const handleAddLecture = () => {
    setChapters((prev) =>
      prev.map((ch) =>
        ch.id === currentChapterId
          ? { ...ch, chapterContent: [...ch.chapterContent, lectureDetails] }
          : ch
      )
    );
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
    setShowPopup(false);
  };

  return (
    <div className="h-screen overflow-auto flex flex-col items-start md:p-8 p-4">
      <form className="flex flex-col gap-5 max-w-2xl w-full text-gray-600">
        {/* Course Title */}
        <div className="flex flex-col gap-1 w-full">
          <p>Course Title</p>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder="Type here"
            className="outline-none py-2 px-3 rounded border border-gray-400"
            required
          />
        </div>

        {/* Course Description */}
        <div className="flex flex-col gap-2 w-full">
          <p>Course Description</p>
          <ReactQuill
            className="quill mb-10 h-20" // FIX: Added height & spacing
            value={courseDescription}
            onChange={setCourseDescription}
            theme="snow"
            modules={quillModules}
            formats={quillFormats}
            placeholder="Type here"
          />
        </div>

        {/* Price & Thumbnail */}
        <div className="flex items-center justify-between flex-wrap gap-4 w-full">
          <div className="flex flex-col gap-1">
            <p>Course Price</p>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              placeholder="0"
              className="outline-none py-2 w-28 px-3 rounded border border-gray-400"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className="flex items-center gap-3">
              <img
                src={assets.file_upload_icon}
                className="p-3 bg-blue-500 rounded cursor-pointer"
                alt=""
              />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="max-h-10"
                />
              )}
            </label>
          </div>
        </div>

        {/* Discount */}
        <div className="flex flex-col gap-1">
          <p>Discount %</p>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            min={0}
            max={100}
            type="number"
            placeholder="0"
            className="outline-none py-2 w-28 px-3 rounded border border-gray-400"
            required
          />
        </div>

        {/* Chapters & Lectures */}
        <div className="w-full">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="bg-white border rounded-lg mb-4">
              <div className="flex justify-between items-center p-4 border-b">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleChapterCollapse(chapter.id)}
                >
                  <img
                    className={`mr-2 transition-transform ${
                      chapter.collapsed && "-rotate-90"
                    }`}
                    src={assets.dropdown_icon}
                    width={14}
                    alt=""
                  />
                  <span className="font-semibold">{chapter.chapterTitle}</span>
                </div>
                <span className="text-gray-500">
                  {chapter.chapterContent.length} Lectures
                </span>
                <img
                  src={assets.cross_icon}
                  className="cursor-pointer"
                  alt=""
                  onClick={() => removeChapter(chapter.id)}
                />
              </div>

              {!chapter.collapsed && (
                <div className="p-3">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {lectureIndex + 1}. {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -{" "}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Preview Free" : "Paid"}
                      </span>
                      <img
                        src={assets.cross_icon}
                        className="cursor-pointer"
                        alt=""
                        onClick={() => removeLecture(chapter.id, lectureIndex)}
                      />
                    </div>
                  ))}
                  <div
                    className="inline-flex bg-blue-500 text-white p-2 rounded cursor-pointer mt-2 hover:bg-blue-600 transition"
                    onClick={() => openLecturePopup(chapter.id)}
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            className="flex justify-center items-center bg-blue-100 rounded-lg cursor-pointer p-2"
            onClick={handleAddChapter}
          >
            + Add Chapter
          </div>
        </div>
      </form>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white text-gray-700 p-4 rounded relative w-full max-w-80">
            <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>

            <div className="mb-2">
              <p>Lecture Title</p>
              <input
                type="text"
                className="mt-1 block w-full border rounded py-1 px-2"
                value={lectureDetails.lectureTitle}
                onChange={(e) =>
                  setLectureDetails({
                    ...lectureDetails,
                    lectureTitle: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-2">
              <p>Duration (in mins)</p>
              <input
                type="number"
                className="mt-1 block w-full border rounded py-1 px-2"
                value={lectureDetails.lectureDuration}
                onChange={(e) =>
                  setLectureDetails({
                    ...lectureDetails,
                    lectureDuration: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-2">
              <p>Lecture URL</p>
              <input
                type="text"
                className="mt-1 block w-full border rounded py-1 px-2"
                value={lectureDetails.lectureUrl}
                onChange={(e) =>
                  setLectureDetails({
                    ...lectureDetails,
                    lectureUrl: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-4">
              <label>
                <input
                  type="checkbox"
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      isPreviewFree: e.target.checked,
                    })
                  }
                />{" "}
                Preview Free
              </label>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleAddLecture}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
