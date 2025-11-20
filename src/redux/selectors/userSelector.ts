import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { allCoursesMapSelector, allCoursesSelector } from "./courseSelector";
import { userCoursesProgressMapSelector } from "./userCoursesProgressSelector";

export const userStateSelector = (state: AppState) => state.user;

export const userSelector = createSelector(
  [userStateSelector],
  (state) => state.user
);

export const isPremiumUserSelector = createSelector(
  [userSelector],
  (user) => user.isPremiumUser
);

export const instructorCoursesSelector = createSelector(
  [allCoursesMapSelector, userSelector],
  (allCourses, user) =>
    allCourses.filter((course) => course.instructorId === user.id) || []
);

export const isLoggedInSelector = createSelector(
  [userStateSelector],
  (state) => state.isLoggedIn
);

export const studentCoursesSelector = createSelector(
  [allCoursesSelector, userCoursesProgressMapSelector],
  (allCourses, userCoursesProgress) =>
    (userCoursesProgress &&
      userCoursesProgress.map(
        (courseProgress) => allCourses[courseProgress.courseId]
      )) ||
    []
);

export const userLoadingSelector = createSelector(
  [userStateSelector],
  (state) => state.loading
);

export const userMessageSelector = createSelector(
  [userStateSelector],
  (state) => state.message
);
