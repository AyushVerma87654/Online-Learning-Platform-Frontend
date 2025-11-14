import { Course } from "../models/course";
import instance from "./axios";

export const fetchAllCourses = async () =>
  instance.get("/courses").then((res) => res.data);

export const fetchCourseById = async (id: string) =>
  instance.get(`/courses/${id}`).then((res) => res.data);

export const uploadVideo = async (data: { id: string; file: File }) => {
  const formData = new FormData();
  formData.append("id", String(data.id));
  formData.append("video", data.file);
  return instance
    .post("/upload-video", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const addCourse = async (course: Course) =>
  instance.post("/courses/add", { course }).then((res) => res.data);

export const editCourse = async (course: Course) =>
  instance.put(`/courses/${course.id}`, { course }).then((res) => res.data);

export const deleteCourse = async (id: string) =>
  instance.delete(`/courses/${id}`).then((res) => res.data);
