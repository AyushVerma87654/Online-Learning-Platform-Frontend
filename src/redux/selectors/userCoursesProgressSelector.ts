import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { selectedCourseIdSelector } from "./courseSelector";

export const userCoursesProgressStateSelector = (state: AppState) =>
  state.userCourseProgress;

export const userCoursesProgressSelector = createSelector(
  [userCoursesProgressStateSelector],
  (state) => state.userCoursesProgress
);

export const userCoursesProgressMapSelector = createSelector(
  [userCoursesProgressSelector],
  (userCoursesProgress) => Object.values(userCoursesProgress)
);

export const selectedCourseUserProgressSelector = createSelector(
  [userCoursesProgressMapSelector, selectedCourseIdSelector],
  (userCoursesProgress, selectedCourseId) =>
    userCoursesProgress.find(
      (courseProgress) => courseProgress.courseId === selectedCourseId
    )
);

export const userCoursesProgressLoadingSelector = createSelector(
  [userCoursesProgressStateSelector],
  (state) => state.loading
);

export const userCoursesProgressMessageSelector = createSelector(
  [userCoursesProgressStateSelector],
  (state) => state.message
);
