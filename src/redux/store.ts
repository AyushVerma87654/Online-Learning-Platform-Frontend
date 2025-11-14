import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
import userReducer from "./slice/userSlice";
import courseReducer from "./slice/courseSlice";
import quizReducer from "./slice/quizSlice";
import userCourseProgressReducer from "./slice/userCourseProgressSlice";
import quizResultsReducer from "./slice/quizResultsSlice";
import adminReducer from "./slice/adminSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    quiz: quizReducer,
    userCourseProgress: userCourseProgressReducer,
    quizResult: quizResultsReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;

export default store;
