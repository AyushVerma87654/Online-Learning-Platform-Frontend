import type { FC } from "react";
import { Route, Routes } from "react-router";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminDashboard";
import NavBar from "./Components/NavBar";
import HomePage from "./Components/HomePage";
import CoursesPage from "./Components/CoursesPage";
import IndividualCoursePage from "./Components/IndividualCoursePage";
import InstructorDashboard from "./Components/InstructorDashboard";
import CourseForm from "./Components/CourseForm";
import QuizForm from "./Components/QuizForm";
import QuizPage from "./Components/QuizPage";
import {
  AdminRoute,
  GuestRoute,
  InstructorRoute,
  ProtectedRoute,
  StudentRoute,
} from "./Components/Routes";
import UnauthorizedPage from "./Components/UnauthorizedPage";
import Footer from "./Components/Footer";
import ProfilePage from "./Components/ProfilePage";
import PaymentPage from "./Components/PaymentPage";
import PaymentSuccessPage from "./Components/PaymentSuccessPage";
import PaymentFailedPage from "./Components/PaymentFailedPage";

interface AppProps {}

const App: FC<AppProps> = () => (
  <div className="flex flex-col h-screen">
    <NavBar />
    <div className="grow">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<IndividualCoursePage />} />
        <Route
          path="/instructor/dashboard"
          element={
            <InstructorRoute>
              <InstructorDashboard />
            </InstructorRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/course/add"
          element={
            <InstructorRoute>
              <CourseForm />
            </InstructorRoute>
          }
        />
        <Route
          path="/course/edit/:courseId"
          element={
            <InstructorRoute>
              <CourseForm />
            </InstructorRoute>
          }
        />
        <Route
          path="/quiz/add"
          element={
            <InstructorRoute>
              <QuizForm />
            </InstructorRoute>
          }
        />
        <Route
          path="/quiz/edit/:courseId"
          element={
            <InstructorRoute>
              <QuizForm />
            </InstructorRoute>
          }
        />
        <Route path="/quiz/:courseId" element={<QuizPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <StudentRoute>
              <PaymentPage />
            </StudentRoute>
          }
        />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/failed" element={<PaymentFailedPage />} />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </div>
    <Footer />
  </div>
);

export default App;
