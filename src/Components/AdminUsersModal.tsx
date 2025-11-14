import { FC, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { User } from "../models/user";
import { IndividualUserCourseProgressForAdmin } from "../models/admin";
import { CourseMap } from "../models/course";

interface AdminUsersModalProps {
  closeModal: () => void;
  type: "students" | "instructors";
  students: User[];
  studentsProgress: IndividualUserCourseProgressForAdmin[];
  instructors: User[];
  allCourses: CourseMap;
}

const AdminUsersModal: FC<AdminUsersModalProps> = ({
  closeModal,
  type,
  students,
  studentsProgress,
  instructors,
  allCourses,
}) => {
  const users = type === "students" ? students : instructors;

  const getStudentEnrollments = (userId: string) => {
    return studentsProgress.filter((p) => p.userId === userId);
  };

  const getInstructorCourses = (instructorId: string) =>
    allCourses.filter((c) => c.instructorId === instructorId);

  const getCourseById = (courseId: string) =>
    allCourses.find((course) => course.id === courseId);

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-between bg-white rounded-xl max-w-5xl p-12 shadow-lg w-[75%] h-[75%] outline overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 w-full">
          <h2 className="text-2xl font-semibold capitalize">
            {type === "students" ? "Students Overview" : "Instructors Overview"}
          </h2>
          <IoMdCloseCircleOutline
            onClick={closeModal}
            size={26}
            className="cursor-pointer text-blue-600 hover:text-rose-600"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full overflow-y-auto space-y-4">
          {users.length === 0 ? (
            <p className="text-gray-500 text-center mt-8">No {type} found.</p>
          ) : (
            users.map((user) => {
              const [isOpen, setIsOpen] = useState(false);
              const studentProgress = getStudentEnrollments(user.id);
              const instructorCourses = getInstructorCourses(user.id);

              return (
                <div
                  key={user.id}
                  className="border rounded-lg p-4 hover:shadow-md transition"
                >
                  {/* Header Row */}
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium text-lg">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    {/* Collapsible Button */}
                    <button
                      onClick={() => setIsOpen((prev) => !prev)}
                      className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      {isOpen ? (
                        <FaChevronUp className="text-blue-600" />
                      ) : (
                        <FaChevronDown className="text-blue-600" />
                      )}
                    </button>
                  </div>

                  {/* Collapsible Section */}
                  {isOpen && (
                    <div className="mt-4 space-y-3 transition-all duration-200 ease-in-out">
                      {type === "instructors" ? (
                        instructorCourses.length > 0 ? (
                          instructorCourses.map((course) => (
                            <div key={course.id} className="border rounded p-3">
                              <p className="font-medium">{course.title}</p>
                              <p className="text-sm text-gray-600">
                                {course.description || "No description"}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">
                            No courses created yet.
                          </p>
                        )
                      ) : studentProgress.length > 0 ? (
                        studentProgress.map((progress) => {
                          const course = getCourseById(progress.courseId)!;
                          return (
                            <div
                              key={progress.courseId}
                              className="border rounded p-3"
                            >
                              <p className="font-medium">{course.title}</p>
                              <p className="text-sm text-gray-600">
                                Progress: {progress.completionPercent}%
                              </p>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-gray-500 text-sm">
                          No enrolled courses yet.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsersModal;
