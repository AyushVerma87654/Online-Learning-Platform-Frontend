import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import {
  isLoggedInSelector,
  userSelector,
} from "../redux/selectors/userSelector";
import Button from "./Button";
import { UserRole } from "../models/user";
import {
  fetchMeInitiatedAction,
  logoutInitiatedAction,
} from "../redux/slice/userSlice";
import { CgMenuGridO } from "react-icons/cg";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { getAllCoursesInitiatedAction } from "../redux/slice/courseSlice";

const NavBar: FC<ReduxProps> = ({
  user,
  isLoggedIn,
  fetchProfile,
  fetchCourses,
  initiateLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    fetchProfile();
    fetchCourses();
  }, []);

  return (
    <nav className="bg-linear-to-r from-teal-400 via-emerald-500 to-green-500 backdrop-blur-md shadow-md top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        {/* Left — Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition"
        >
          Online Learning Platform
        </Link>

        {/* Center — Links (Desktop) */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-orange-500 font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="text-gray-700 hover:text-orange-500 font-medium transition"
          >
            Courses
          </Link>
          {isLoggedIn && user.role === UserRole.INSTRUCTOR && (
            <Link
              to="/instructor/dashboard"
              className="text-gray-700 hover:text-orange-500 font-medium transition"
            >
              Dashboard
            </Link>
          )}
          {isLoggedIn && user.role === UserRole.ADMIN && (
            <Link
              to="/admin/dashboard"
              className="text-gray-700 hover:text-orange-500 font-medium transition"
            >
              Dashboard
            </Link>
          )}
        </div>

        <div className="hidden sm:flex items-center justify-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="rounded-full bg-blue-500 text-rose-700 w-16 h-9 flex items-center justify-center text-3xl font-semibold"
              >
                {user.name.charAt(0).toUpperCase()}
              </Link>
              <Button
                onClick={() => initiateLogout()}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm transition"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition">
                Login
              </Button>
            </Link>
          )}
        </div>

        {menuOpen ? (
          <AiOutlineCloseCircle
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden relative self-center text-3xl"
          />
        ) : (
          <CgMenuGridO
            className="sm:hidden relative self-center text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        )}
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-100">
          <div className="flex flex-col p-4 space-y-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-orange-500 font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/courses"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-orange-500 font-medium transition"
            >
              Courses
            </Link>
            {isLoggedIn && user.role === UserRole.INSTRUCTOR && (
              <Link
                to="/instructor/dashboard"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-orange-500 font-medium transition"
              >
                Dashboard
              </Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="text-left text-orange-500 font-semibold hover:underline mt-2"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-left text-orange-500 font-semibold hover:underline mt-2"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: userSelector(state),
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  fetchProfile: fetchMeInitiatedAction,
  fetchCourses: getAllCoursesInitiatedAction,
  initiateLogout: logoutInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(NavBar);
