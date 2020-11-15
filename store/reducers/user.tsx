import {
  SET_USER_SUCCESS,
  SET_USER_STARTED,
  SET_USER_FAILURE,
  UserActionTypes,
  UserState,
} from '../types/user';

const initialState: UserState = {
  error: null,
  loading: false,
  role: null,
  profile: null,
};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case SET_USER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case SET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        role: action.payload.role,
        profile: action.payload.profile,
      };
    case SET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default userReducer;
