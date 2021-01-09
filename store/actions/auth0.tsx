import {
  SET_TOKEN_SUCCESS,
  SET_TOKEN_STARTED,
  SET_TOKEN_FAILURE,
  SET_API_TOKEN_SUCCESS,
  SET_API_TOKEN_STARTED,
  SET_API_TOKEN_FAILURE,
  Auth0ThunkResult,
  Auth0ThunkDispatch,
} from '../types/auth0';

export const setToken = (token: string | Error): Auth0ThunkResult => {
  return async (dispatch: Auth0ThunkDispatch) => {
    dispatch(setTokenStarted());

    if (typeof token === 'string') {
      dispatch(setTokenSuccess(token));
    }
    else {
      dispatch(setTokenFailure(token));
    }
  };
};

const setTokenStarted = () => ({
  type: SET_TOKEN_STARTED,
});

const setTokenSuccess = (token: string) => {
  return {
    type: SET_TOKEN_SUCCESS,
    payload: {
      token,
    },
  };
};

const setTokenFailure = (error: Error) => ({
  type: SET_TOKEN_FAILURE,
  payload: {
    error,
  },
});

export const setApiToken = (token: string | Error): Auth0ThunkResult => {
  return async (dispatch: Auth0ThunkDispatch) => {
    dispatch(setApiTokenStarted());

    if (typeof token === 'string') {
      dispatch(setApiTokenSuccess(token));
    }
    else {
      dispatch(setApiTokenFailure(token));
    }
  };
};

const setApiTokenStarted = () => ({
  type: SET_API_TOKEN_STARTED,
});

const setApiTokenSuccess = (apiToken: string) => {
  return {
    type: SET_API_TOKEN_SUCCESS,
    payload: {
      apiToken,
    },
  };
};

const setApiTokenFailure = (error: Error) => ({
  type: SET_API_TOKEN_FAILURE,
  payload: {
    error,
  },
});
