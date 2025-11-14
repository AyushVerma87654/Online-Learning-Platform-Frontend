import { FC, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import {
  instructorCoursesSelector,
  studentCoursesSelector,
  userSelector,
} from "../redux/selectors/userSelector";
import { UserRole } from "../models/user";
import {
  getCoursesByUserIdInitiatedAction,
  setSelectedCourseIdAction,
} from "../redux/slice/courseSlice";
import Button from "./Button";
import { Link } from "react-router-dom";
import Input from "./Input";
import { Course } from "../models/course";

const ProfilePage: FC<ReduxProps> = ({
  user,
  userCourses,
  fetchCoursesById,
  setEditingCourseId,
}) => {
  useEffect(() => {
    if (user?.id) {
      fetchCoursesById({ id: user.id });
    }
  }, [user]);

  return (
    <div className="bg-linear-to-br from-green-500 via-blue-500 to-purple-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h1 className="text-6xl font-bold text-center text-orange-500 mb-12 tracking-tight">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-yellow-200/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-red-500 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ID */}

            <Input
              name="id"
              value={user.id}
              label="ID"
              readOnly
              className="border-red-500 py-2 bg-gray-100 shadow-sm"
            />

            {/* Name */}
            <Input
              name="name"
              value={user.name}
              label="Name"
              readOnly
              className="border-red-500 py-2 bg-gray-100 shadow-sm"
            />

            {/* Email */}
            <Input
              name="email"
              value={user.email}
              label="Email"
              readOnly
              className="border-red-500 py-2 bg-gray-100 shadow-sm"
            />

            {/* Role */}
            <Input
              name="role"
              value={user.role.toUpperCase()}
              label="Role"
              readOnly
              className="border-red-500 py-2 bg-orange-50 font-medium text-green-600 shadow-sm"
            />

            {user.role === UserRole.STUDENT && (
              <Input
                name="role"
                value={user.isPremiumUser ? "Premium" : "Free"}
                label="Plan"
                readOnly
                className="border-red-500 py-2 bg-orange-50 font-medium text-green-600 shadow-sm"
              />
            )}

            {user.role === UserRole.STUDENT && !user.isPremiumUser && (
              <Link to="/payment" className="md:mt-9 mx-auto">
                <Button className="max-w-56 px-4 py-2 flex-wrap">
                  Go For Premium Plan
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Courses Section */}
        <div className="bg-green-200/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-orange-100">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {user.role === UserRole.STUDENT
              ? "Enrolled Courses"
              : "Created Courses"}
          </h2>

          {userCourses.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No courses found for this user.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {userCourses.map((course: Course) => (
                <div
                  key={course.id}
                  className="bg-linear-to-br from-yellow-100 via-orange-100 to-red-100 border border-orange-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-orange-600 mb-2">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 text-sm mb-4 grow">
                    {course.description
                      ? course.description.slice(0, 120) + "..."
                      : "No description available."}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex justify-between gap-4 mt-auto">
                    <Link to={`/courses/${course.id}`} className="w-full">
                      <Button className="bg-red-500 text-white px-4 py-2 hover:bg-red-600">
                        View
                      </Button>
                    </Link>
                    {user.role === UserRole.INSTRUCTOR && (
                      <Link
                        to={`/instructor/course/edit/${course.id}`}
                        className="w-full"
                      >
                        <Button
                          className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
                          onClick={() => {
                            setEditingCourseId(course.id);
                          }}
                        >
                          Edit
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  const user = userSelector(state);
  const userCourses =
    user.role === UserRole.STUDENT
      ? studentCoursesSelector(state)
      : instructorCoursesSelector(state);
  return {
    user,
    userCourses,
  };
};

const mapDispatchToProps = {
  fetchCoursesById: getCoursesByUserIdInitiatedAction,
  setEditingCourseId: setSelectedCourseIdAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ProfilePage);
