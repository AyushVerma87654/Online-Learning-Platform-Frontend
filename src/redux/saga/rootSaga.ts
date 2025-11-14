import { all, fork } from "redux-saga/effects";
import userSaga from "./userSaga";
import courseSaga from "./courseSaga";
import quizSaga from "./quizSaga";
import userCourseProgressSaga from "./userCourseProgressSaga";
import quizResultsSaga from "./quizResultsSaga";

function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(courseSaga),
    fork(userCourseProgressSaga),
    fork(quizSaga),
    fork(quizResultsSaga),
  ]);
}

export default rootSaga;
