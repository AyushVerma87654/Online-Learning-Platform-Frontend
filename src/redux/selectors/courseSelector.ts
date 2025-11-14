import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const courseStateSelector = (state: AppState) => state.course;

export const allCoursesSelector = createSelector(
  [courseStateSelector],
  (state) => state.allCourses
);

export const allCoursesMapSelector = createSelector(
  [courseStateSelector],
  (state) => Object.values(state.allCourses)
);

export const selectedCourseIdSelector = createSelector(
  [courseStateSelector],
  (state) => state.selectedCourseId
);

export const selectedCourseSelector = createSelector(
  [allCoursesSelector, selectedCourseIdSelector],
  (allCourses, selectedCourseId) => allCourses[selectedCourseId]
);

export const moduleVideoUrlEntitySelector = createSelector(
  [courseStateSelector],
  (state) => state.moduleVideoUrlEntity
);

export const courseLoadingSelector = createSelector(
  [courseStateSelector],
  (state) => state.loading
);

export const courseMessageSelector = createSelector(
  [courseStateSelector],
  (state) => state.message
);
