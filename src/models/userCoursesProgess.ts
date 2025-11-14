export type WatchedVideos = {
  [moduleId: string]: {
    watchedAt: string;
  };
};

export type IndividualCourseProgress = {
  id: string;
  courseId: string;
  completionPercent: number;
  watchedVideos: WatchedVideos;
  createdAt: string;
  updatedAt: string;
};

export type UserCoursesProgressMap = IndividualCourseProgress[];
export type UserCoursesProgress = Record<string, IndividualCourseProgress>;

export type UserCourseProgressPayload = {
  userId: string;
  courseId: string;
};

export type UpdateUserCourseProgressPayload = UserCourseProgressPayload & {
  moduleId: string;
};

export type UserCourseProgressResponse = {
  userCourseProgress: IndividualCourseProgress;
};
