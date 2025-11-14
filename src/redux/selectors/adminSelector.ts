import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const adminStateSelector = (state: AppState) => state.admin;

export const allUsersSelector = createSelector(
  [adminStateSelector],
  (state) => state.allUsers
);

export const allUsersMapSelector = createSelector(
  [allUsersSelector],
  (allUsers) => Object.values(allUsers)
);

export const allUsersProgressSelector = createSelector(
  [adminStateSelector],
  (state) => state.allUsersProgress
);

export const allUsersProgressMapSelector = createSelector(
  [allUsersProgressSelector],
  (allUsersProgress) => Object.values(allUsersProgress)
);

export const adminLoadingSelector = createSelector(
  [adminStateSelector],
  (state) => state.loading
);

export const adminMessageSelector = createSelector(
  [adminStateSelector],
  (state) => state.message
);
