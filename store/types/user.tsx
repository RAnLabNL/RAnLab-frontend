import { Action } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers/root';

export const SET_USER_STARTED = 'SET_USER_STARTED';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_FAILURE = 'SET_USER_FAILURE';

export const SET_USER_PROFILE_STARTED = 'SET_USER_PROFILE_STARTED';
export const SET_USER_PROFILE_SUCCESS = 'SET_USER_PROFILE_SUCCESS';
export const SET_USER_PROFILE_FAILURE = 'SET_USER_PROFILE_FAILURE';

export interface UserProfile {
  city?: string;
  firstName?: string;
  institution?: string;
  jobTitle?: string;
  lastName?: string;
  phone?: string;
  postalCode?: string;
  province?: string;
  streetAddress?: string;
}

export type UserRole = 'region' | 'admin';

interface SetUserStartedAction {
  type: typeof SET_USER_STARTED;
}

interface SetUserSuccessAction {
  type: typeof SET_USER_SUCCESS;
  payload: {
    id: string,
    role: UserRole,
    profile: UserProfile,
    regionIds: number[],
  };
}

interface SetUserFailureAction {
  type: typeof SET_USER_FAILURE;
  payload: {
    error: Error,
  };
}

interface SetUserProfileStartedAction {
  type: typeof SET_USER_PROFILE_STARTED;
}

interface SetUserProfileSuccessAction {
  type: typeof SET_USER_PROFILE_SUCCESS;
  payload: {
    profile: UserProfile,
  };
}

interface SetUserProfileFailureAction {
  type: typeof SET_USER_PROFILE_FAILURE;
  payload: {
    error: Error,
  };
}

export type UserActionTypes =
  SetUserStartedAction
  | SetUserSuccessAction
  | SetUserFailureAction
  | SetUserProfileStartedAction
  | SetUserProfileSuccessAction
  | SetUserProfileFailureAction;

export type UserThunkResult = ThunkAction<void, RootState, undefined, UserActionTypes>;

export type UserThunkDispatch = ThunkDispatch<RootState, void, Action>;

export interface UserState {
  error?: Error | null;
  loading: boolean;
  id?: string | null;
  role?: UserRole | null;
  profile?: UserProfile | null;
  regionIds?: number[] | null;
}

