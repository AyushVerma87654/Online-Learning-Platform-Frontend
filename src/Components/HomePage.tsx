import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import { allCoursesMapSelector } from "../redux/selectors/courseSelector";
import CourseCarousel from "./CourseCarousel";

const Home: FC<ReduxProps> = ({ courses }) => {
  return (
    <div className="bg-linear-to-r from-orange-200 via-yellow-100 to-pink-200">
      <section className="text-center py-16 bg-linear-to-r from-orange-400 via-red-300 to-yellow-300 text-white shadow-inner">
        <h2 className="text-4xl font-extrabold mb-4">
          Learn Anything. Anytime. Anywhere.
        </h2>
        <p className="text-lg mb-6">
          Explore our wide range of courses taught by expert instructors.
        </p>
      </section>

      {/* Courses Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Featured Courses
        </h3>

        {courses?.length === 0 ? (
          <p className="text-center text-gray-600">No courses available yet.</p>
        ) : (
          <CourseCarousel />
        )}
      </section>
    </div>
  );
};

// Redux Mapping
const mapStateToProps = (state: AppState) => ({
  courses: allCoursesMapSelector(state),
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Home);
