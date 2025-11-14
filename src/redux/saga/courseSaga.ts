import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  addCourseCompletedAction,
  addCourseErrorAction,
  addCourseInitiatedAction,
  deleteCourseCompletedAction,
  deleteCourseErrorAction,
  deleteCourseInitiatedAction,
  editCourseCompletedAction,
  editCourseErrorAction,
  editCourseInitiatedAction,
  getAllCoursesCompletedAction,
  getAllCoursesErrorAction,
  getAllCoursesInitiatedAction,
  getCourseByIdCompletedAction,
  getCourseByIdErrorAction,
  getCourseByIdInitiatedAction,
  uploadVideoCompletedAction,
  uploadVideoErrorAction,
  uploadVideoInitiatedAction,
} from "../slice/courseSlice";
import {
  addCourse,
  deleteCourse,
  editCourse,
  fetchAllCourses,
  fetchCourseById,
  uploadVideo,
} from "../../api/course";
import { ResponsePayload } from "../../models/response";
import { Course, CourseMap } from "../../models/course";

function* getAllCourses(): Generator {
  try {
    const data = (yield call(fetchAllCourses)) as any as ResponsePayload<{
      allCourses: CourseMap;
    }>;
    yield put(getAllCoursesCompletedAction(data.responseDetails));
  } catch (error: any) {
    yield put(getAllCoursesErrorAction(error));
  }
}

function* getCourseById(action: PayloadAction<{ id: string }>): Generator {
  try {
    const data = (yield call(
      fetchCourseById,
      action.payload.id
    )) as any as ResponsePayload<{
      course: Course;
    }>;
    yield put(getCourseByIdCompletedAction(data.responseDetails));
  } catch (error: any) {
    yield put(getCourseByIdErrorAction(error));
  }
}

function* videoUpload(
  action: PayloadAction<{ id: string; file: File }>
): Generator {
  try {
    const data = (yield call(
      uploadVideo,
      action.payload
    )) as any as ResponsePayload<{ id: string; videoUrl: string }>;
    console.log("data", data);
    yield put(uploadVideoCompletedAction(data.responseDetails));
  } catch (error: any) {
    console.log("error", error);
    yield put(uploadVideoErrorAction(error));
  }
}

function* addingCourse(action: PayloadAction<Course>): Generator {
  try {
    const data = (yield call(
      addCourse,
      action.payload
    )) as any as ResponsePayload<{ course: Course }>;
    console.log("data", data);
    yield put(addCourseCompletedAction(data.responseDetails));
  } catch (error: any) {
    console.log("error", error);
    yield put(addCourseErrorAction(error));
  }
}

function* editingCourse(action: PayloadAction<Course>): Generator {
  try {
    const data = (yield call(
      editCourse,
      action.payload
    )) as any as ResponsePayload<{ course: Course }>;
    console.log("data", data);
    yield put(editCourseCompletedAction(data.responseDetails));
  } catch (error: any) {
    console.log("error", error);
    yield put(editCourseErrorAction(error));
  }
}

function* deletingCourse(action: PayloadAction<string>): Generator {
  try {
    const data = (yield call(
      deleteCourse,
      action.payload
    )) as any as ResponsePayload<{ id: string; message: string }>;
    yield put(deleteCourseCompletedAction(data.responseDetails));
  } catch (error: any) {
    console.log("error", error);
    yield put(deleteCourseErrorAction(error));
  }
}

function* courseSaga() {
  yield takeEvery(getAllCoursesInitiatedAction, getAllCourses);
  yield takeEvery(getCourseByIdInitiatedAction, getCourseById);
  yield takeEvery(uploadVideoInitiatedAction, videoUpload);
  yield takeEvery(addCourseInitiatedAction, addingCourse);
  yield takeEvery(editCourseInitiatedAction, editingCourse);
  yield takeEvery(deleteCourseInitiatedAction, deletingCourse);
}

export default courseSaga;
