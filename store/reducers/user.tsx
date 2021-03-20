import {
  SET_USER_SUCCESS,
  SET_USER_STARTED,
  SET_USER_FAILURE,
  SET_USER_PROFILE_SUCCESS,
  SET_USER_PROFILE_STARTED,
  SET_USER_PROFILE_FAILURE,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_STARTED,
  FETCH_ALL_USERS_FAILURE,
  FETCH_USER_BY_ID_SUCCESS,
  FETCH_USER_BY_ID_STARTED,
  FETCH_USER_BY_ID_FAILURE,
  UserActionTypes,
  UserState,
} from '../types/user';

const initialState: UserState = {
  error: null,
  loading: false,
  id: null,
  role: null,
  profile: null,
  regionIds: [],
  allUsers: {},
};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  const prevAllUsers = state.allUsers ? state.allUsers : {};
  switch (action.type) {
    case SET_USER_STARTED:
    case SET_USER_PROFILE_STARTED:
    case FETCH_ALL_USERS_STARTED:
    case FETCH_USER_BY_ID_STARTED:
      return {
        ...state,
        loading: true,
      };
    case SET_USER_FAILURE:
    case SET_USER_PROFILE_FAILURE:
    case FETCH_ALL_USERS_FAILURE:
    case FETCH_USER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        id: action.payload.id,
        role: action.payload.role,
        profile: action.payload.profile,
        regionIds: action.payload.regionIds,
      };
    case SET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profile: action.payload.profile,
      };
    case FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        allUsers: action.payload.users,
      };
    case FETCH_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        allUsers: {
          ...prevAllUsers,
          [action.payload.id]: action.payload.profile,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
