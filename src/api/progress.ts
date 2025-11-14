import { UserCourseProgressPayload } from "../models/userCoursesProgess";
import instance from "./axios";

export const fetchProgress = async (data: UserCourseProgressPayload) =>
  instance
    .get(`/progress/${data.userId}/${data.courseId}`)
    .then((res) => res.data);

export const updateProgress = async (data: any) =>
  instance.post("/progress/update", data).then((res) => res.data);

export const fetchAllUsersCoursesProgress = async () =>
  instance.get("/all-users-courses-progress").then((res) => res.data);
