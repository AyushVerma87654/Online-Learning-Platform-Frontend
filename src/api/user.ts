import { UserRole } from "../models/user";
import instance from "./axios";

export const signupUser = async (data: {
  name: string;
  email: string;
  role: UserRole;
  password: string;
}) => instance.post("/signup", data).then((res) => res.data);

export const loginUser = async (data: { email: string; password: string }) =>
  instance.post("/login", data).then((res) => res.data);

export const fetchMe = async () =>
  instance.get("/me", { withCredentials: true }).then((res) => res.data);

export const logoutUser = async () =>
  instance.get("/logout").then((res) => res.data);

export const fetchAllUsers = async () =>
  instance.get("/all-users").then((res) => res.data);

export const payment = async () =>
  instance.get("/payment").then((res) => res.data);
