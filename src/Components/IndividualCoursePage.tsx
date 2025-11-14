import { FC, useState, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import Button from "./Button";
import { FaVideo } from "react-icons/fa";
import { MdPlayCircleOutline } from "react-icons/md";
import { selectedCourseSelector } from "../redux/selectors/courseSelector";
import {
  isLoggedInSelector,
  userSelector,
} from "../redux/selectors/userSelector";
import {
  FaCheckCircle,
  FaClipboardList,
  FaClipboardCheck as _,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router";
import { selectedCourseUserProgressSelector } from "../redux/selectors/userCoursesProgressSelector";
import {
  getUserCourseProgressInitiatedAction,
  updateUserCourseProgressInitiatedAction,
} from "../redux/slice/userCourseProgressSlice";
import { UserRole } from "../models/user";
import { getCourseByIdInitiatedAction } from "../redux/slice/courseSlice";
import { getQuizByIdInitiatedAction } from "../redux/slice/quizSlice";
// import VideoPlayer from "./VideoPlayer";

interface IndividualCoursePageProps extends ReduxProps {}

const IndividualCoursePage: FC<IndividualCoursePageProps> = ({
  course,
  user,
  userCourseProgress,
  updateUserCourseProgress,
  fetchUserCourseProgress,
  fetchCourseById,
  fetchQuizById,
  isLoggedIn,
}) => {
  const [currentModule, setCurrentModule] = useState(course?.modules[0]);
  const [courseStarted, setCourseStarted] = useState(false);
  const getModuleBg = (moduleId: string) => {
    if (currentModule?.id === moduleId) return "bg-green-400/90";
    if (userCourseProgress?.watchedVideos?.[moduleId])
      return "bg-orange-400/90";
    return "bg-yellow-400/70";
  };

  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userCourseProgress?.id) setCourseStarted(true);
    if (user.role !== UserRole.STUDENT) setCourseStarted(true);
  }, [userCourseProgress]);

  useEffect(() => {
    if (course && !currentModule) setCurrentModule(course.modules[0]);
  }, [course]);

  useEffect(() => {
    if (!course && courseId) fetchCourseById({ id: courseId });
    if (courseId && user?.id && userCourseProgress?.courseId !== courseId)
      isLoggedIn &&
        fetchUserCourseProgress({ userId: user.id, courseId: courseId });
  }, [user]);

  if (!course) return <p className="text-center mt-10">Course not found!</p>;

  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto p-6 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        {/* Course Header */}
        <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            {course.title}
          </h1>
          <p className="text-gray-600 mt-2">{course.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-gray-500">
              Instructor: {course.instructorName}
            </span>
          </div>
        </div>

        {/* Video Player */}
        <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg">
          {currentModule && (
            <video
              src={currentModule.videoUrl}
              controls
              className="w-full rounded-lg shadow-md max-w-5xl m-auto cursor-pointer"
              onEnded={() =>
                user.role === UserRole.STUDENT &&
                updateUserCourseProgress({
                  userId: user.id,
                  courseId: course.id,
                  moduleId: currentModule.id,
                })
              }
            />
            // <VideoPlayer
            //   videoUrl={currentModule.videoUrl}
            //   onEnded={() =>
            //     updateUserCourseProgress({
            //       userId: user.id,
            //       courseId: course.id,
            //       moduleId: currentModule.id,
            //     })
            //   }
            // />
          )}
        </div>

        {/* Video Playlist */}
        {courseStarted && (
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
            <h2 className="text-xl font-semibold mb-3">Course Videos</h2>
            <div className="h-2 w-full bg-gray-300 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-green-500 transition-all"
                style={{
                  width: `${userCourseProgress?.completionPercent || 0}%`,
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {course.modules.map((module) => {
                const isSelected = currentModule?.id === module.id;
                const isWatched = Object.keys(
                  userCourseProgress?.watchedVideos || {}
                ).some((moduleId) => moduleId === module.id);

                return (
                  <div
                    key={module.id}
                    className="flex flex-col md:flex-row gap-4"
                  >
                    {/* Module Button */}
                    <div
                      onClick={() => setCurrentModule(module)}
                      className={`flex items-center w-[65%] p-4 rounded-xl cursor-pointer transition transform shadow-lg hover:scale-105 hover:shadow-2xl ${getModuleBg(
                        module.id
                      )} ${!isWatched && !isSelected ? "opacity-70" : ""}`}
                    >
                      <div className="relative shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-orange-500 font-bold mr-4 transition-transform duration-300 group-hover:scale-110">
                        {isWatched ? (
                          <FaCheckCircle size={28} />
                        ) : isSelected ? (
                          <FaVideo size={28} />
                        ) : (
                          <MdPlayCircleOutline size={28} />
                        )}
                      </div>
                      <p className="font-semibold text-white text-lg">
                        {module.title}
                      </p>
                    </div>

                    {/* Quiz Button */}
                    {module.quizId && (
                      <Link
                        to={`/quiz/${module.quizId}`}
                        className="grow"
                        onClick={() => fetchQuizById(module.quizId)}
                      >
                        <div className="flex items-center p-4 rounded-xl cursor-pointer transition transform shadow-lg hover:scale-105 hover:shadow-2xl bg-linear-to-r from-blue-400 to-blue-600">
                          <div className="relative shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-orange-500 font-bold mr-4 transition-transform duration-300 group-hover:scale-110">
                            <FaClipboardList size={28} />
                          </div>
                          <p className="font-semibold text-white text-lg">
                            Take Quiz
                          </p>
                        </div>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Start Course Button */}
        {user.role === UserRole.STUDENT && !courseStarted && (
          <div className="p-6 flex justify-center bg-white/10 backdrop-blur-sm rounded-lg">
            <Button
              onClick={() => {
                if (!isLoggedIn) navigate("/login");
                if (!user.isPremiumUser && course.isPremiumCourse)
                  navigate("/payment");
                else {
                  setCourseStarted(true);
                  !userCourseProgress?.id &&
                    updateUserCourseProgress({
                      courseId: course.id,
                      userId: user.id,
                      moduleId: "",
                    });
                }
              }}
              className="bg-orange-500 text-white hover:bg-orange-600 p-3 disabled:cursor-not-allowed"
            >
              {!user.isPremiumUser && course.isPremiumCourse
                ? "Buy Premium Plan"
                : "Enroll Now"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Redux connection stays the same

// Redux connection
const mapStateToProps = (state: AppState) => ({
  course: selectedCourseSelector(state),
  user: userSelector(state),
  userCourseProgress: selectedCourseUserProgressSelector(state),
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  updateUserCourseProgress: updateUserCourseProgressInitiatedAction,
  fetchUserCourseProgress: getUserCourseProgressInitiatedAction,
  fetchCourseById: getCourseByIdInitiatedAction,
  fetchQuizById: getQuizByIdInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(IndividualCoursePage);
