import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import {
  getCoursesByUserIdInitiatedAction,
  setSelectedCourseIdAction,
} from "../redux/slice/courseSlice";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import {
  instructorCoursesSelector,
  userSelector,
} from "../redux/selectors/userSelector";
import CourseModal from "./CourseModal";

interface InstructorDashboardProps extends ReduxProps {}

const InstructorDashboard: FC<InstructorDashboardProps> = ({
  instructorCourses,
  fetchCoursesByInstructorId,
  setEditingCourseId,
  user,
}) => {
  const navigate = useNavigate();
  const [isModelOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCoursesByInstructorId({ id: user.id });
  }, [user.id]);

  const handleAddCourse = () => {
    navigate("/course/add");
  };

  return (
    <div className="bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-400 p-6">
      {isModelOpen && (
        <CourseModal
          isOpen={isModelOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Instructor Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add New Course Card */}
        <div
          onClick={handleAddCourse}
          className="flex flex-col items-center justify-center rounded-xl shadow-lg h-64 bg-linear-to-r from-orange-400 via-pink-400 to-yellow-300 text-white cursor-pointer hover:shadow-2xl hover:scale-105 transition"
        >
          <FaPlus className="text-4xl font-bold mb-2" />
          <div className="text-xl font-semibold">Add New Course</div>
        </div>

        {/* Existing Courses */}
        {instructorCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition cursor-pointer flex flex-col justify-between h-64"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-500 mb-2">{course.description}</p>
              <p className="text-sm text-gray-400 mb-2">
                Videos: {course.modules.length}
              </p>
            </div>
            <div className="flex justify-between gap-4 mt-auto">
              <Button
                className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
                onClick={() => {
                  setEditingCourseId(course.id);
                  setIsModalOpen(true);
                }}
              >
                Edit
              </Button>
              <Button className="bg-red-500 text-white px-4 py-2 hover:bg-red-600">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Redux connection
const mapStateToProps = (state: AppState) => ({
  user: userSelector(state),
  instructorCourses: instructorCoursesSelector(state),
});

const mapDispatchToProps = {
  fetchCoursesByInstructorId: getCoursesByUserIdInitiatedAction,
  setEditingCourseId: setSelectedCourseIdAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(InstructorDashboard);
