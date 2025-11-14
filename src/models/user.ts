export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isPremiumUser: boolean;
  paidAt: string;
  planValidTill: string;
  createdAt: string;
  updatedAt: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  confirmPassword: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export enum UserRole {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  ADMIN = "admin",
}

export type AuthCompletedResponse = {
  accessToken: string;
  user: User;
};
