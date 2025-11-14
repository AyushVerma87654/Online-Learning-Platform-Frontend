import { User } from "./user";
import { IndividualCourseProgress } from "./userCoursesProgess";

export type IndividualUserCourseProgressForAdmin = IndividualCourseProgress & {
  userId: string;
};

export type UsersCoursesProgressForAdmin = Record<
  string,
  IndividualUserCourseProgressForAdmin
>;

export type UsersCoursesProgressForAdminMap =
  IndividualUserCourseProgressForAdmin[];

export type UsersCoursesProgressForAdminResponse = {
  allUsersProgress: UsersCoursesProgressForAdminMap;
};

export type AllUsers = Record<string, User>;
export type AllUsersMap = User[];
export type AllUsersResponse = { allUsers: AllUsersMap };
