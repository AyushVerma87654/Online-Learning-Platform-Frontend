import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import {
  isLoggedInSelector,
  userSelector,
} from "../redux/selectors/userSelector";
import { UserRole } from "../models/user";

interface BaseRouteProps {
  children: ReactNode;
  redirectTo?: string; // Optional redirect path
}

/* ------------------ Generic Auth Route ------------------ */
export const ProtectedRoute: FC<BaseRouteProps> = ({
  children,
  redirectTo = "/login",
}) => {
  const isLoggedIn = useSelector((state: AppState) =>
    isLoggedInSelector(state)
  );

  if (!isLoggedIn) return <Navigate to={redirectTo} />;

  return <>{children}</>;
};

export const GuestRoute: FC<BaseRouteProps> = ({
  children,
  redirectTo = "/",
}) => {
  const isLoggedIn = useSelector((state: AppState) =>
    isLoggedInSelector(state)
  );

  if (isLoggedIn) return <Navigate to={redirectTo} />;

  return <>{children}</>;
};

/* ------------------ Role-Based Route ------------------ */
interface RoleRouteProps extends BaseRouteProps {
  role: UserRole;
}

export const RoleRoute: FC<RoleRouteProps> = ({
  role,
  children,
  redirectTo,
}) => {
  const isLoggedIn = useSelector((state: AppState) =>
    isLoggedInSelector(state)
  );
  const userRole = useSelector((state: AppState) => userSelector(state).role);

  if (!isLoggedIn) return <Navigate to={redirectTo || "/login"} />;
  if (userRole !== role && userRole !== UserRole.ADMIN)
    return <Navigate to={redirectTo || "/unauthorized"} />;

  return <>{children}</>;
};

/* ------------------ Convenience Components ------------------ */
export const InstructorRoute: FC<BaseRouteProps> = (props) => (
  <RoleRoute role={UserRole.INSTRUCTOR} {...props} />
);

export const StudentRoute: FC<BaseRouteProps> = (props) => (
  <RoleRoute role={UserRole.STUDENT} {...props} />
);

export const AdminRoute: FC<BaseRouteProps> = (props) => (
  <RoleRoute role={UserRole.ADMIN} {...props} />
);
