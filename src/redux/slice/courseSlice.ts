import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, CourseMap, Courses } from "../../models/course";

export type CourseState = {
  allCourses: Courses;
  selectedCourseId: string;
  moduleVideoUrlEntity: Record<string, string>;
  loading: boolean;
  message: string;
};

const initialState: CourseState = {
  allCourses: {},
  selectedCourseId: "",
  moduleVideoUrlEntity: {},
  loading: false,
  message: "",
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    getAllCoursesInitiated,
    getAllCoursesCompleted,
    getAllCoursesError,
    getCourseByIdInitiated,
    getCourseByIdCompleted,
    getCourseByIdError,
    getCoursesByUserIdInitiated,
    getCoursesByUserIdCompleted,
    getCoursesByUserIdError,
    uploadVideoInitiated,
    uploadVideoCompleted,
    uploadVideoError,
    removeUploadedVideoUrl,
    setSelectedCourseId,
    addCourseInitiated,
    addCourseCompleted,
    addCourseError,
    editCourseInitiated,
    editCourseCompleted,
    editCourseError,
    deleteCourseInitiated,
    deleteCourseCompleted,
    deleteCourseError,
  },
});

const { actions, reducer: courseReducer } = courseSlice;

export const {
  getAllCoursesInitiated: getAllCoursesInitiatedAction,
  getAllCoursesCompleted: getAllCoursesCompletedAction,
  getAllCoursesError: getAllCoursesErrorAction,
  getCourseByIdInitiated: getCourseByIdInitiatedAction,
  getCourseByIdCompleted: getCourseByIdCompletedAction,
  getCourseByIdError: getCourseByIdErrorAction,
  getCoursesByUserIdInitiated: getCoursesByUserIdInitiatedAction,
  getCoursesByUserIdCompleted: getCoursesByUserIdCompletedAction,
  getCoursesByUserIdError: getCoursesByUserIdErrorAction,
  uploadVideoInitiated: uploadVideoInitiatedAction,
  uploadVideoCompleted: uploadVideoCompletedAction,
  uploadVideoError: uploadVideoErrorAction,
  removeUploadedVideoUrl: removeUploadedVideoUrlAction,
  setSelectedCourseId: setSelectedCourseIdAction,
  addCourseInitiated: addCourseInitiatedAction,
  addCourseCompleted: addCourseCompletedAction,
  addCourseError: addCourseErrorAction,
  editCourseInitiated: editCourseInitiatedAction,
  editCourseCompleted: editCourseCompletedAction,
  editCourseError: editCourseErrorAction,
  deleteCourseInitiated: deleteCourseInitiatedAction,
  deleteCourseCompleted: deleteCourseCompletedAction,
  deleteCourseError: deleteCourseErrorAction,
} = actions;

export default courseReducer;

function getAllCoursesInitiated(state: CourseState) {
  state.loading = true;
}

function getAllCoursesCompleted(
  state: CourseState,
  action: PayloadAction<{ allCourses: CourseMap }>
) {
  state.loading = false;
  action.payload.allCourses.forEach(
    (course) =>
      (state.allCourses = { ...state.allCourses, [course.id]: course })
  );
}

function getAllCoursesError(
  state: CourseState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function getCourseByIdInitiated(
  state: CourseState,
  action: PayloadAction<{ id: string }>
) {
  state.loading = true;
  state.selectedCourseId = action.payload.id;
}

function getCourseByIdCompleted(
  state: CourseState,
  action: PayloadAction<{ course: Course }>
) {
  state.loading = false;
  state.allCourses = {
    ...state.allCourses,
    [action.payload.course.id]: action.payload.course,
  };
}

function getCourseByIdError(
  state: CourseState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function getCoursesByUserIdInitiated(
  state: CourseState,
  _action: PayloadAction<{ id: string }>
) {
  state.loading = true;
}

function getCoursesByUserIdCompleted(
  state: CourseState,
  action: PayloadAction<{ courses: Course[] }>
) {
  state.loading = false;
  action.payload.courses.forEach(
    (course) =>
      (state.allCourses = { ...state.allCourses, [course.id]: course })
  );
}

function getCoursesByUserIdError(
  state: CourseState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function uploadVideoInitiated(
  state: CourseState,
  _action: PayloadAction<{ id: string; file: File }>
) {
  state.loading = true;
}

function uploadVideoCompleted(
  state: CourseState,
  action: PayloadAction<{ id: string; videoUrl: string }>
) {
  state.loading = false;
  state.moduleVideoUrlEntity = {
    ...state.moduleVideoUrlEntity,
    [action.payload.id]: action.payload.videoUrl,
  };
}

function uploadVideoError(
  state: CourseState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function removeUploadedVideoUrl(
  state: CourseState,
  action: PayloadAction<string>
) {
  state.loading = false;
  delete state.moduleVideoUrlEntity[action.payload];
}

function setSelectedCourseId(
  state: CourseState,
  action: PayloadAction<string>
) {
  state.loading = true;
  state.selectedCourseId = action.payload;
}

function addCourseInitiated(
  state: CourseState,
  _action: PayloadAction<Course>
) {
  state.loading = true;
}

function addCourseCompleted(
  state: CourseState,
  action: PayloadAction<{ course: Course }>
) {
  state.loading = false;
  state.allCourses = {
    ...state.allCourses,
    [action.payload.course.id]: action.payload.course,
  };
}

function addCourseError(
  state: CourseState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function editCourseInitiated(
  state: CourseState,
  _action: PayloadAction<Course>
) {
  state.loading = true;
}

function editCourseCompleted(
  state: CourseState,
  action: PayloadAction<{ course: Course }>
) {
  state.loading = false;
  state.allCourses = {
    ...state.allCourses,
    [action.payload.course.id]: action.payload.course,
  };
  state.selectedCourseId = "";
}

function editCourseError(
  state: CourseState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function deleteCourseInitiated(
  state: CourseState,
  _action: PayloadAction<string>
) {
  state.loading = true;
}

function deleteCourseCompleted(
  state: CourseState,
  action: PayloadAction<{ id: string; message: string }>
) {
  state.loading = false;
  delete state.allCourses[action.payload.id];
}

function deleteCourseError(
  state: CourseState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}
