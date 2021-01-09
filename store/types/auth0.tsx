import { Action } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers/root';

export const SET_TOKEN_STARTED = 'SET_TOKEN_STARTED';
export const SET_TOKEN_SUCCESS = 'SET_TOKEN_SUCCESS';
export const SET_TOKEN_FAILURE = 'SET_TOKEN_FAILURE';

export const SET_API_TOKEN_STARTED = 'SET_API_TOKEN_STARTED';
export const SET_API_TOKEN_SUCCESS = 'SET_API_TOKEN_SUCCESS';
export const SET_API_TOKEN_FAILURE = 'SET_API_TOKEN_FAILURE';

interface SetTokenStartedAction {
  type: typeof SET_TOKEN_STARTED;
}

interface SetTokenSuccessAction {
  type: typeof SET_TOKEN_SUCCESS;
  payload: {
    token: string,
  };
}

interface SetTokenFailureAction {
  type: typeof SET_TOKEN_FAILURE;
  payload: {
    error: Error,
  };
}

interface SetApiTokenStartedAction {
  type: typeof SET_API_TOKEN_STARTED;
}

interface SetApiTokenSuccessAction {
  type: typeof SET_API_TOKEN_SUCCESS;
  payload: {
    apiToken: string,
  };
}

interface SetApiTokenFailureAction {
  type: typeof SET_API_TOKEN_FAILURE;
  payload: {
    error: Error,
  };
}

export type Auth0ActionTypes =
  SetTokenStartedAction
  | SetTokenSuccessAction
  | SetTokenFailureAction
  | SetApiTokenStartedAction
  | SetApiTokenSuccessAction
  | SetApiTokenFailureAction;

export type Auth0ThunkResult = ThunkAction<void, RootState, undefined, Auth0ActionTypes>;

export type Auth0ThunkDispatch = ThunkDispatch<RootState, void, Action>;

export interface Auth0State {
  apiToken?: string | null;
  error?: Error | null;
  loading: boolean;
  token?: string | null;
}

