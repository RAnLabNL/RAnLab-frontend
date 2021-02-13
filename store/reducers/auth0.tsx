import {
  SET_TOKEN_SUCCESS,
  SET_TOKEN_STARTED,
  SET_TOKEN_FAILURE,
  SET_API_TOKEN_SUCCESS,
  SET_API_TOKEN_STARTED,
  SET_API_TOKEN_FAILURE,
  Auth0ActionTypes,
  Auth0State,
} from '../types/auth0';

const initialState: Auth0State = {
  apiToken: null,
  error: null,
  loading: false,
  token: null,
};

const auth0Reducer = (state = initialState, action: Auth0ActionTypes): Auth0State => {
  switch (action.type) {
    case SET_TOKEN_STARTED:
      return {
        ...state,
        loading: true,
      };
    case SET_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload.token,
      };
    case SET_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SET_API_TOKEN_STARTED:
      return {
        ...state,
        loading: true,
      };
    case SET_API_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        apiToken: action.payload.apiToken,
      };
    case SET_API_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default auth0Reducer;
