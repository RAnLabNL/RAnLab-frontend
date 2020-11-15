import { Action } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers/root';

export const SET_USER_STARTED = 'SET_USER_STARTED';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_FAILURE = 'SET_USER_FAILURE';

export interface UserProfile {
  city?: string;
  first_name?: string;
  institution?: string;
  job_title?: string;
  last_name?: string;
  phone_number?: string;
  postal_code?: string;
  province?: string;
  street_address?: string;
}

export type UserRole = 'region' | 'admin';

interface SetUserStartedAction {
  type: typeof SET_USER_STARTED;
}

interface SetUserSuccessAction {
  type: typeof SET_USER_SUCCESS;
  payload: {
    role: UserRole,
    profile: UserProfile,
  };
}

interface SetUserFailureAction {
  type: typeof SET_USER_FAILURE;
  payload: {
    error: Error,
  };
}

export type UserActionTypes =
  SetUserStartedAction
  | SetUserSuccessAction
  | SetUserFailureAction;

export type UserThunkResult = ThunkAction<void, RootState, undefined, UserActionTypes>;

export type UserThunkDispatch = ThunkDispatch<RootState, void, Action>;

export interface UserState {
  error?: Error | null;
  loading: boolean;
  role?: UserRole | null;
  profile?: UserProfile | null;
}

