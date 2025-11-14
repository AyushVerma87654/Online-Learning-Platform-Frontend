import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import { getCourseByIdInitiatedAction } from "../redux/slice/courseSlice";
import { allCoursesMapSelector } from "../redux/selectors/courseSelector";
import { userSelector } from "../redux/selectors/userSelector";
import { useNavigate } from "react-router-dom";

const CoursesPage: FC<ReduxProps> = ({ fetchCourseById, courses }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-linear-to-r from-orange-50 to-yellow-50 py-12 outline">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-10">
          Explore Our Courses
        </h1>

        {courses.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No courses available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-transform hover:scale-105 duration-300 p-6 flex flex-col cursor-pointer"
                onClick={() => {
                  fetchCourseById({ id: course.id });
                  navigate(`/courses/${course.id}`);
                }}
              >
                <div className="h-40 bg-linear-to-br from-orange-200 to-yellow-200 rounded-md mb-4 flex items-center justify-center text-orange-600 font-semibold text-lg">
                  <span className="text-center">{course.title}</span>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 text-sm grow">
                  {course.description?.slice(0, 100) ||
                    "No description provided."}
                </p>

                <div className="mt-4 text-center text-orange-600 font-semibold text-lg">
                  Instructor: {course.instructorName}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  courses: allCoursesMapSelector(state),
  user: userSelector(state),
});

const mapDispatchToProps = {
  fetchCourseById: getCourseByIdInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CoursesPage);
