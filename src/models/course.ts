export type Module = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  quizId: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  modules: Module[];
  isPremiumCourse: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Courses = Record<string, Course>;
export type CourseMap = Course[];
